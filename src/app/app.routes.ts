import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'search',
    loadChildren: () => import('@shipy/search').then((m) => m.searchRoutes),
  },
];
