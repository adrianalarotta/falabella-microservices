import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../product-form/product-form.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [CommonModule, ProductFormComponent], 
})
export class ProductListComponent implements OnInit {
  products: { id: number, name: string, description: string, price: string, stock: number, image: string, user_id: number}[] = [];
  showForm: boolean = false;
  selectedProduct: any = null;
  private apiUrl = 'http://localhost:8000/api/products';


  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => { 
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }


  deleteProduct(productId: number): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
      this.products = this.products.filter(product => product.id !== productId);
      console.log(`Producto con ID ${productId} eliminado`);
    }
  }

  openForm(product: any = null) {
    this.selectedProduct = product ? { ...product } : { id: null, name: '', description: '', price: 0, stock: 0, image: '' };
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.selectedProduct = null;
  }

  addProduct(product: any) {
    if (!product.id) {
      product.id = this.products.length + 1; // Asigna un ID si es nuevo
      this.products.push(product);
    } else {
      // Si el producto ya tiene ID, se está editando
      const index = this.products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.products[index] = product;
      }
    }
    this.showForm = false;
  }

  addOrUpdateProduct(product: any) {
    if (!product.id) {
      product.id = this.products.length + 1;
      this.products.push(product);
    } else {
      const index = this.products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.products[index] = product;
      }
    }
    this.showForm = false;
  }

}
