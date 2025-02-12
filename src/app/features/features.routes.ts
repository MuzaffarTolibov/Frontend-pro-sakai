import { Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';

export default [
    { path: 'first-page', component: FirstPageComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
