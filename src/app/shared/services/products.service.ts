import { Product } from './../models/product.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PayloadProduct } from '../models/payload-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  http = inject(HttpClient);

  getAll(){
    return this.http.get<Product[]>('/api/products')
  }

  post(payload:PayloadProduct){
    return this.http.post('/api/products', payload)

  }
  

}
