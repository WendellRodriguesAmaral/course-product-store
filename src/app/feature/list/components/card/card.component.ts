import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, input, output, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../../shared/models/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  product =  input.required<Product>();  //Signal input
  
  @Output() edit =  new EventEmitter();
  @Output() delete =  new EventEmitter();

  productTitle = computed(() => this.product().title);

}
