import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  productService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  form = new FormGroup({
    title: new FormControl<string>('',
      {
        nonNullable: true,
        validators: Validators.required
      }
    ),
  });

  onSubmit() {



    this.productService.post({ title: this.form.controls.title.value })
      .subscribe(() => {
        this.matSnackBar.open('Produto criado com sucesso', 'OK'); // os parametros para a exibição da mensagem estão no app.config.ts

        this.router.navigateByUrl('/');

      })
  }

}
