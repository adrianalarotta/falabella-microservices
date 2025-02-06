import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProductListComponent } from './productos/product-list/product-list.component';
import { OrderListComponent } from './ordenes/order-list/order-list.component';
import { ProductFormComponent } from './productos/product-form/product-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login por defecto
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductListComponent },
  { path: 'product-form', component: ProductFormComponent }, 
  { path: 'edit-product/:id', component: ProductFormComponent },
  { path: 'product-form/:id', component: ProductFormComponent },
  { path: 'ordenes', component: OrderListComponent },
  { path: '**', redirectTo: '/login' } // Manejo de rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
  
})
export class AppRoutingModule { }
