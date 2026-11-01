import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerRegistrationComponent } from './player-registration.component';

describe('PlayerRegistrationComponent', () => {
  let component: PlayerRegistrationComponent;
  let fixture: ComponentFixture<PlayerRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerRegistrationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerRegistrationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
