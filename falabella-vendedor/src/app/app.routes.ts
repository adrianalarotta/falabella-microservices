import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProductListComponent } from './productos/product-list/product-list.component';
import { OrderListComponent } from './ordenes/order-list/order-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login por defecto
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductListComponent },
  { path: 'ordenes', component: OrderListComponent },
  { path: '**', redirectTo: '/login' } // Manejo de rutas no encontradas
];
