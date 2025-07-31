import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/models/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `<h2 mat-dialog-title>Deletar produto</h2>
          <mat-dialog-content>
          Tem certeza que deseja deletar este produto?
        </mat-dialog-content>
          <mat-dialog-actions align="end">
            <button mat-button (click)="onNot()">Não</button>
            <button mat-button cdkFocusInitial (click)="onYes()">Sim</button>
          </mat-dialog-actions>`,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogComponent {

  matDialogRef = inject(MatDialogRef);

  onNot(){
    this.matDialogRef.close(false);
  }

  onYes() {
    this.matDialogRef.close(true);
  }
}


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, CommonModule, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  products:Product[] = [];
  service = inject(ProductsService);
  route = inject(Router);
  matDialog = inject(MatDialog);
  
  ngOnInit() {
    this.service.getAll().subscribe((data:Product[]) => {
      this.products = data;
    });
  }

  onEdit(product: Product) {
    this.route.navigate(['/edit-product', product.id] );
  }

  onDelete(product: Product) {
    this.matDialog.open(ConfirmationDialogComponent, {})
      .afterClosed()
      .subscribe((resposta:boolean) => {
        console.log('deletar', resposta);
      });
  }
}
