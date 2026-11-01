import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'race', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Client },
];