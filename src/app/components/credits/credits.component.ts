import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CarSelection } from '../../core/services/carselectionservice/car-selection.service';

export interface Credit {
  title: string;
  author: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  changes?: string;
}

@Component({
  selector: 'app-credits',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButton],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.scss',
})
export class Credits {
  private readonly carsSelectionService = inject(CarSelection);
  readonly credits: Signal<Credit[]> = computed(() =>
    this.carsSelectionService
      .CARS()
      .map((car) => car.credit)
      .filter((credit): credit is Credit => credit !== undefined),
  );
}
