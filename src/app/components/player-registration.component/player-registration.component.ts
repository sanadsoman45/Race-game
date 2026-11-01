import { Component, output, signal, inject } from '@angular/core';
import {
  form,
  FormField,
  FormRoot,
  required,
  minLength,
  maxLength,
  pattern,
  type TreeValidationResult,
} from '@angular/forms/signals';

import { PlayerService } from '../../core/services/player/player.service';

@Component({
  selector: 'app-player-registration',
  standalone: true,
  imports: [FormField, FormRoot],
  templateUrl: './player-registration.component.html',
  styleUrl: './player-registration.component.scss',
})
export class PlayerRegistrationComponent {
  private readonly playerService = inject(PlayerService);

  readonly playerCreated = output<void>();

  readonly playerModel = signal({
    name: '',
  });

  readonly form = form(
    this.playerModel,
    (path) => {
      required(path.name, {
        message: 'Driver name is required.',
      });

      minLength(path.name, 3, {
        message: 'Minimum 3 characters required.',
      });

      maxLength(path.name, 16, {
        message: 'Maximum 16 characters allowed.',
      });

      pattern(path.name, /^[a-zA-Z0-9](?:[a-zA-Z0-9_-]| [a-zA-Z0-9_-])*$/, {
        message: 'Use letters, numbers, spaces, hyphens or underscores.',
      });
    },
    {
      submission: {
        action: async (field) => {
          const name = field().value().name.trim();

          this.playerService.setPlayer(name);
          this.playerCreated.emit();
        },
      },
    },
  );
  limitNameLength(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.value.length > 16) {
      input.value = input.value.slice(0, 16);
      this.playerModel.update((player) => ({
        ...player,
        name: input.value,
      }));
    }
  }
}
