import { Routes } from '@angular/router';
import { ListComponent } from './feature/list/list.component';

import { getProductResolver } from './shared/resolvers/get-products.resolver';
import { getProductByIdResolver } from './shared/resolvers/get-product.resolver';

export const routes: Routes = [
    {
        path: '',
        component: ListComponent,
        resolve: {
            products: getProductResolver
        }
    },
    {
        path: 'create-product',
        loadComponent: () => import('./feature/create/create.component').then(m => m.CreateComponent)
    },
    {
        path: 'edit-product/:id',
        resolve: {
            product: getProductByIdResolver
        },
        loadComponent: () => import('./feature/edit/edit.component').then(m => m.EditComponent)
    }
];
