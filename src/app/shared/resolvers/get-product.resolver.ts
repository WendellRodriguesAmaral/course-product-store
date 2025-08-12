import { inject } from "@angular/core";
import { ProductsService } from "../services/products.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export const getProductByIdResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const productService = inject(ProductsService);
    return productService.getById(route.params['id']);
}