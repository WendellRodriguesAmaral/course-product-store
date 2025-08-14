import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/models/product.interface';
import { CardComponent } from './components/card/card.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { NoItemsComponent } from './components/no-items/no-items.component';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, CommonModule, RouterLink, MatButtonModule, NoItemsComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  products = signal<Product[]>(
    inject(ActivatedRoute).snapshot.data['products']
  )
  service = inject(ProductsService);
  route = inject(Router);
  matDialog = inject(MatDialog);
  confirmationDialog = inject(ConfirmationDialogService);

  ngOnInit() {

  }

  onEdit(product: Product) {
    this.route.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {
    this.confirmationDialog.openDialog()
      .pipe(filter((resposta: boolean) => resposta === true))
      .subscribe(() => {
        this.service.delete(product.id)
          .subscribe(() => {
            this.service.getAll().subscribe((data: Product[]) => {
              this.products.set(data);
            });
          });

      });
  }
}
