import { inject } from "@angular/core";
import { ProductsService } from "../services/products.service";

export const getProductResolver = () => {
    const productService = inject(ProductsService);
    return productService.getAll();
}