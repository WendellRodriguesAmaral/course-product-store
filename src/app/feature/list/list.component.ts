import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

    products:any[] = []

  http = inject(HttpClient);


  ngOnInit() {
    this.http.get('/api/products').subscribe({
      next: (data) => {
        this.products = data as any[];
      },
      error: (error) => {
        console.error('Erro ao buscar produtos:', error);
      }
    });
  }
}
