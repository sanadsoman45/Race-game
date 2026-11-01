import {
  afterNextRender,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { UpperCasePipe } from '@angular/common';
import { CarOption } from '../../core/models/caroption';

type CameraView = 'default' | 'front' | 'rear' | 'left' | 'right' | 'top';

interface Stage {
  show(car: CarOption): Promise<void>;
  setCameraView(view: CameraView): void;
  resetCamera(): void;
}

@Component({
  selector: 'app-hero-scene',
  styleUrl: './hero-scene.component.scss',
  templateUrl: './hero-scene.component.html',
  imports: [UpperCasePipe],
})
export class HeroScene {
  readonly car = input.required<CarOption>();

  readonly cameraPanelOpen = signal(false);
  readonly activeCamera = signal<CameraView>('default');

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private readonly stage = signal<Stage | undefined>(undefined);

  readonly cameraViews: CameraView[] = ['front', 'rear', 'left', 'right', 'top'];

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      let stop: (() => void) | undefined;
      let destroyed = false;

      destroyRef.onDestroy(() => {
        destroyed = true;
        stop?.();
      });

      void this.start()
        .then(({ stage, cleanup }) => {
          if (destroyed) {
            cleanup();
            return;
          }

          stop = cleanup;
          this.stage.set(stage);
        })
        .catch((error) => {
          console.error('Failed to initialize Three.js scene', error);
        });
    });

    effect(() => {
      const stage = this.stage();
      const car = this.car();

      if (stage) {
        stage.show(car).catch(console.error);
      }
    });
  }

  setCamera(view: CameraView): void {
    this.activeCamera.set(view);
    this.stage()?.setCameraView(view);
  }

  resetCamera(): void {
    this.activeCamera.set('default');
    this.stage()?.resetCamera();
  }

  toggleCameraPanel(): void {
    this.cameraPanelOpen.update((open) => !open);
  }

  private async start(): Promise<{
    stage: Stage;
    cleanup: () => void;
  }> {
    const THREE = await import('three');

    const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');

    const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');

    const { MeshoptDecoder } = await import('three/addons/libs/meshopt_decoder.module.js');

    const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);

    const el = this.canvas().nativeElement;

    const renderer = new THREE.WebGLRenderer({
      canvas: el,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

    const cameraTarget = new THREE.Vector3(0, 0.3, 0);

    camera.position.set(5, 2, 7);

    // Interactive camera controls
    const controls = new OrbitControls(camera, el);

    controls.enableDamping = true;
    controls.dampingFactor = 0.06;

    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.enablePan = false;

    controls.minDistance = 5;
    controls.maxDistance = 14;

    controls.minPolarAngle = 0.1;
    controls.maxPolarAngle = Math.PI - 0.1;

    controls.target.copy(cameraTarget);
    controls.update();

    // Lighting
    scene.add(new THREE.HemisphereLight(0xffffff, 0x1a1c22, 1.5));

    const sun = new THREE.DirectionalLight(0xffffff, 3);

    sun.position.set(4, 6, 3);
    scene.add(sun);

    const pivot = new THREE.Group();
    scene.add(pivot);

    // Model cache
    const cache = new Map<string, InstanceType<typeof THREE.Group>>();

    let current: InstanceType<typeof THREE.Group> | undefined;

    let latest = 0;

    // Camera presets
    // Standard orientation: car front faces +Z.
    const cameraPositions: Record<CameraView, [number, number, number]> = {
      default: [5, 2, 7],
      front: [0, 1.5, 9],
      rear: [0, 1.5, -9],
      left: [-9, 1.5, 0],
      right: [9, 1.5, 0],
      top: [0, 10, 0.01],
    };

    let targetPosition = new THREE.Vector3(5, 2, 7);

    let transitioning = false;

    const setCameraView = (view: CameraView): void => {
      const position = cameraPositions[view];

      targetPosition.set(...position);
      transitioning = true;
    };

    const resetCamera = (): void => {
      setCameraView('default');
    };

    // Load and switch cars
    const show = async (car: CarOption): Promise<void> => {
      const request = ++latest;
      const file = car.file;

      let holder = cache.get(file);

      if (!holder) {
        const model = (await loader.loadAsync(file)).scene;

        model.rotation.y = car.rotationY ?? 0;

        holder = new THREE.Group();
        holder.add(model);

        const box = new THREE.Box3().setFromObject(holder);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        model.position.sub(center);

        holder.scale.setScalar(4.5 / Math.max(size.x, size.y, size.z));

        cache.set(file, holder);
      }

      if (request !== latest) return;

      if (current) {
        pivot.remove(current);
      }

      pivot.add(holder);
      current = holder;

      pivot.rotation.set(0, 0, 0);
      setCameraView('default');
    };

    // Cancel preset transition when user manually interacts.
    const onControlStart = (): void => {
      transitioning = false;
    };

    controls.addEventListener('start', onControlStart);

    // Responsive canvas
    const resize = (): void => {
      const { clientWidth: width, clientHeight: height } = el;

      if (!width || !height) return;

      renderer.setSize(width, height, false);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(resize);

    ro.observe(el);
    resize();

    // Smooth camera animation
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    renderer.setAnimationLoop(() => {
      if (transitioning) {
        if (reducedMotion) {
          camera.position.copy(targetPosition);
          transitioning = false;
        } else {
          camera.position.lerp(targetPosition, 0.08);

          if (camera.position.distanceTo(targetPosition) < 0.01) {
            camera.position.copy(targetPosition);
            transitioning = false;
          }
        }
      }

      controls.update();
      renderer.render(scene, camera);
    });

    // Dispose model resources
    const disposeTree = (root: InstanceType<typeof THREE.Object3D>): void => {
      root.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();

          const materials = Array.isArray(object.material) ? object.material : [object.material];

          materials.forEach((material) => {
            material.dispose();
          });
        }
      });
    };

    return {
      stage: {
        show,
        setCameraView,
        resetCamera,
      },

      cleanup: () => {
        renderer.setAnimationLoop(null);

        controls.removeEventListener('start', onControlStart);

        controls.dispose();
        ro.disconnect();

        cache.forEach(disposeTree);
        cache.clear();

        renderer.dispose();
      },
    };
  }
}
