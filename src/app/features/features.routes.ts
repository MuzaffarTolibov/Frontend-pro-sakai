import { Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { UsersComponent } from './users/users.component';

export default [
    { path: 'first-page', component: FirstPageComponent },
    { path: 'user-list', component: UsersComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
