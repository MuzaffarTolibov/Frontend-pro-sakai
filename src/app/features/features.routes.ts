import { Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';

export default [
    { path: 'first-page', component: FirstPageComponent },
    { path: 'user-list', component: UsersComponent },
    { path: 'product-list', component: ProductsComponent},
    { path: '**', redirectTo: '/notfound' }
] as Routes;
