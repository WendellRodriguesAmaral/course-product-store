import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import { Product } from '../../shared/models/product.interface';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent, RouterLink, MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  productService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  onSubmit(product: Product) {
    this.productService.post({ title: product.title })
      .subscribe(() => {
        // os parametros para a exibição da mensagem estão no app.config.ts
        this.matSnackBar.open('Produto criado com sucesso', 'OK');
        this.router.navigateByUrl('/');
      })
  }
}
