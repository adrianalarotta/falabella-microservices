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
  products: { id: number, name: string, description: string, price: string, stock: number, image: string, user_id: number }[] = [];
  showForm: boolean = false;
  selectedProduct: any = null;
  private apiUrl = 'http://localhost:8000/api/products';
  isEditMode: boolean = false;

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
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.products = this.products.filter(product => product.id !== productId);
          console.log(`Producto con ID ${productId} eliminado`);
        },
        (error) => {
          console.error('Error al eliminar producto', error);
        }
      );
    }
  }

  openForm(product: any = null) {
    this.selectedProduct = product 
      ? { ...product } 
      : { id: null, name: '', description: '', price: null, stock: null, image: '', user_id: 1 }; // Inicialización más clara
    this.isEditMode = product ? true : false;  // Solo se activa el modo de edición si 'product' no es null
    this.showForm = true;
  }
  
  

  closeForm(): void {
    this.showForm = false;
    this.selectedProduct = null;
  }

  // Método para agregar o actualizar el producto
  addOrUpdateProduct(product: any) {
    if (!product.id) {
      // Si el producto no tiene ID, es nuevo (POST)
      this.productService.addProduct(product).subscribe(response => {
        this.products.push(response);  // Agregamos el nuevo producto a la lista
        this.showForm = false;  // Cerramos el formulario
      });
    } else {
      // Si el producto tiene ID, es una actualización (PUT)
      this.productService.updateProduct(product).subscribe(response => {
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products[index] = response;  // Actualizamos el producto en la lista
        }
        this.showForm = false;  // Cerramos el formulario
      });
    }
  }

}
