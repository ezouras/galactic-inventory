import { Routes } from '@angular/router';
import { PostersComponent } from './posters/posters.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
  { path: 'posters', component: PostersComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/posters' },
];
