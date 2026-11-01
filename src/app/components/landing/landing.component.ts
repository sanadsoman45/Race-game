import { Component, computed, inject, signal } from '@angular/core';
import { HeroScene } from '../hero-scene/hero-scene.component';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CarSelection } from '../../core/services/carselectionservice/car-selection.service';
import { PlayerRegistrationComponent } from '../player-registration.component/player-registration.component';
import { PlayerService } from '../../core/services/player/player.service';

@Component({
  imports: [HeroScene, RouterLink, PlayerRegistrationComponent],
  selector: 'app-landing',
  styleUrl: './landing.component.scss',
  templateUrl: './landing.component.html',
})
export class Landing {

  protected readonly playerService = inject(PlayerService)
  readonly controls = [
    { keys: ['W', '↑'], action: 'Throttle' },
    { keys: ['S', '↓'], action: 'Brake' },
    { keys: ['A', 'D', '←', '→'], action: 'Steer' },
    { keys: ['R'], action: 'Reset to track' },
  ];

  private readonly dialog = inject(MatDialog);
  private readonly carsSelectionService = inject(CarSelection);

  readonly canPlay = computed(() => {
  const hasPlayerName = !!this.playerService.player()?.name.trim();
  const hasSelectedCar = !!this.selected()?.id;

  return hasPlayerName && hasSelectedCar;
});

  async openCredits() {
    const { Credits } = await import('../credits/credits.component');
    this.dialog.open(Credits, { panelClass: 'credits-dialog', width: '480px', maxWidth: '90vw' });
  }

  readonly cars = this.carsSelectionService.CARS();
  readonly selectedIndex = signal(0);
  readonly selected = computed(() => this.cars[this.selectedIndex()]);

  step(delta: number) {
    this.selectedIndex.update((i) => (i + delta + this.cars.length) % this.cars.length);
  }
}
