import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  imports: [
    ReactiveFormsModule, 
  ],
})
export class ProductFormComponent implements OnInit {
  @Input() product: any = null;  // Recibe el producto si se está editando
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  productForm: FormGroup;
  isEditMode: boolean = false;
  apiUrl: string = 'http://localhost:8000/api/products';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      description: [''] // Puedes agregar más campos según necesites
    });
  }

  ngOnInit() {
    if (this.product) {
      this.productForm.patchValue(this.product);  // Rellenamos el formulario con los valores del producto
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
  
      if (this.isEditMode) {
        // Si estamos en modo edición, hacemos un `PUT`
        this.http.put(`${this.apiUrl}/${this.product.id}`, productData).subscribe(response => {
          console.log('Producto actualizado:', response);
          this.save.emit(response);
          this.close.emit();
        });
      } else {
        // Si es un nuevo producto, usamos `POST`
        this.http.post(this.apiUrl, productData).subscribe(response => {
          console.log('Producto creado:', response);
          this.save.emit(response);
          this.close.emit();
        });
      }
    }
  }
  
}
