import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/models/product.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CardComponent } from './components/card/card.component';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

    products:Product[] = []

  service = inject(ProductsService);


  ngOnInit() {
    this.service.getAll().subscribe((data:any[]) => {
      this.products = data;
    });
  }
}
