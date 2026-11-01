import { Service, Signal, signal } from '@angular/core';
import { CarOption } from '../../models/caroption';

@Service()
export class CarSelection {
  readonly CARS: Signal<CarOption[]> = signal([
    {
      id: '1',
      name: 'Lotus 49c',
      era: 'Classic',
      file: 'models/cars/lotus-49c.glb',
      rotationY: Math.PI,
      credit: {
        title: 'Formula 1 || Lotus 49c',
        author: 'dark_igorek',
        sourceUrl: 'https://skfb.ly/oQJxT',
        license: 'Creative Commons Attribution',
        licenseUrl: 'http://creativecommons.org/licenses/by/4.0/',
        changes: 'Compressed and optimised for web.',
      },
    },
    {
      id: '2',
      name: 'McLaren MP4/5',
      era: 'Classic',
      file: 'models/cars/mclaren-mp4-5.glb',
      rotationY: 0,
      credit: {
        title: 'McLaren MP4/5 || Formula 1',
        author: 'dark_igorek',
        sourceUrl: 'https://skfb.ly/p8s7A',
        license: 'Creative Commons Attribution',
        licenseUrl: 'http://creativecommons.org/licenses/by/4.0/',
        changes: 'Compressed and optimised for web.',
      },
    },
    {
      id: '3',
      name: '2006 Mclaren MP4/21',
      era: 'Modern',
      file: 'models/cars/mclaren-mp4-21.glb',
      rotationY: 0,
      credit: {
        title: '2006 Mclaren MP4/21 || Formula 1',
        author: 'Dave Love SketchFab',
        sourceUrl: 'https://skfb.ly/pPxMx',
        license: 'Creative Commons Attribution',
        licenseUrl: 'http://creativecommons.org/licenses/by/4.0/',
        changes: 'Compressed and optimised for web.',
      },
    },
    {
      id: '4',
      name: 'Mclaren MP4/25 Tooned',
      era: 'Modern',
      file: 'models/cars/mclaren-mp4-25.glb',
      rotationY: 0,
      credit: {
        title: 'Mclaren MP4/25 Tooned || Formula 1',
        author: 'Dave Love SketchFab',
        sourceUrl: 'https://skfb.ly/pMDqF',
        license: 'Creative Commons Attribution',
        licenseUrl: 'http://creativecommons.org/licenses/by/4.0/',
        changes: 'Compressed and optimised for web.',
      },
    },
  ]);
}
