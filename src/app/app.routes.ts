import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Grand Prix',
    loadComponent: () => import('./components/landing/landing.component').then((m) => m.Landing),
  },
  {
    path: 'race',
    title: 'Race',
    loadComponent: () => import('./components/race/race').then((m) => m.Race),
  },
  { path: '**', redirectTo: '' },
];
