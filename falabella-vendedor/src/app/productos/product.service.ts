import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  saveProduct(product: any): Observable<any> {
    const productData = {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image || 'imagen.jpg',
      user_id: 1 // Ajusta según sea necesario
    };
    return this.http.post(this.apiUrl, productData);
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post(this.apiUrl, productData);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${product.id}`, product);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }

}