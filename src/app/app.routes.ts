import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'home',
    loadChildren: () => import('@shipy/home').then((m) => m.homeRoutes),
  },
  {
    path: 'search',
    loadChildren: () => import('@shipy/search').then((m) => m.searchRoutes),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
