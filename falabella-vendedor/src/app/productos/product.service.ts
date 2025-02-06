import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}


  saveProduct(product: any): Observable<any> {
    const productData = {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image || 'imagen.jpg',
      user_id: 1 
    };
    return this.http.post(this.apiUrl, productData);
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post(this.apiUrl, productData);
  }

  

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Método para agregar un nuevo producto
  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  // Método para actualizar un producto existente
  updateProduct(product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${product.id}`, product);
  }

  // Método para eliminar un producto
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }

}