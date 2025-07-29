import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../models/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit { 

  product = input<Product | null>(null)
  @Output() save = new EventEmitter<Product>();
  form!: FormGroup;

  ngOnInit() {
   this.form = new FormGroup({
      title: new FormControl<string>(this.product()?.title || '',
        {
          nonNullable: true,
          validators: Validators.required
        }
      ),
    });
  }

  onSubmit() {
      const product: Product = this.form.value as Product;    
      this.save.emit(product);
  }
}
