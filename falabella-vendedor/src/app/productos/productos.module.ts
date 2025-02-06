import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';

import { ProductService } from './product.service';
@NgModule({
  declarations: [ProductListComponent,
    ProductFormComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [ProductService]
})
export class ProductsModule { }