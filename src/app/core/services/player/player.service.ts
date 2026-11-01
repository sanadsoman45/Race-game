import { Injectable, computed, signal } from '@angular/core';
import { Player } from '../../models/player';


@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly _player = signal<Player | null>(null);

  readonly player = this._player.asReadonly();
  readonly playerName = computed(
    () => this._player()?.name ?? 'Guest Racer'
  );

  setPlayer(name: string): void {
    this._player.set({
      id: crypto.randomUUID(),
      name,
      createdAt: Date.now(),
    });
  }

  clearPlayer(): void {
    this._player.set(null);
  }
}