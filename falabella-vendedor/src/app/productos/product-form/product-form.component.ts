import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product: any = null;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  isEditMode = false;

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (!this.product) {
      // Si product es null, inicializarlo con valores por defecto
      this.product = {
        id: null,
        name: '',
        description: '',
        price: '',
        stock: 0
      };
    }
    this.isEditMode = this.product.id !== null; // Si tiene ID, es edición
  }

  submitForm(): void {
    if (this.productForm.valid) {
      console.log('Datos enviados:', this.productForm.value);
      this.close.emit();
    }
  }

 

  saveProduct() {
    console.log('Nuevo producto agregado:', this.product);
    this.save.emit(this.product);
  }

  closeForm(): void {
    this.close.emit();
  }
}
