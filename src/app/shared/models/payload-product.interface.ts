import { Product } from "./product.interface";

export type PayloadProduct =  Omit<Product, 'id'>;