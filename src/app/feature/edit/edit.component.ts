import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/models/product.interface';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  productService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  product:Product = inject(ActivatedRoute).snapshot.data['product'];

  onSubmit(product: Product) {  
    console.log('EditComponent.onSubmit', product);  
    this.productService.put(this.product.id, { title: product.title })
      .subscribe(() => {
        // os parametros para a exibição da mensagem estão no app.config.ts
        this.matSnackBar.open('Produto editado com sucesso', 'OK'); 
        this.router.navigateByUrl('/');
      })
  }
}
