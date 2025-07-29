import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/models/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';
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
  
  ngOnInit() {
    this.service.getAll().subscribe((data:Product[]) => {
      this.products = data;
    });
  }

  onEdit(product: Product) {
    this.route.navigate(['/edit-product', product.id] );
  }
}
