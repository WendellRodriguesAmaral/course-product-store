import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ListComponent } from './feature/list/list.component';
import { CreateComponent } from './feature/create/create.component';
import { inject } from '@angular/core';
import { ProductsService } from './shared/services/products.service';

export const routes: Routes = [
    {
        path: '',
        component:ListComponent, 
        resolve:{
            products: ()=>{
                const productService = inject(ProductsService);
                return productService.getAll();
            }
        }
    },
    {
        path: 'create-product',
        loadComponent: ()=> import('./feature/create/create.component').then(m => m.CreateComponent)        
    },
    {
        path: 'edit-product/:id',
        resolve: {
            product:  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>{
                const productService = inject(ProductsService);                
                return productService.getById(route.params['id']);
            }
        },
        loadComponent: () => import('./feature/edit/edit.component').then(m => m.EditComponent)
    }
];
