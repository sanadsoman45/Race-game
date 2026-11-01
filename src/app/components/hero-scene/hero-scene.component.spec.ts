import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroScene } from './hero-scene.component';

describe('HeroScene', () => {
  let component: HeroScene;
  let fixture: ComponentFixture<HeroScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroScene],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroScene);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
