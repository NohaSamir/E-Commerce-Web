import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent() {
            return import('./components/home/home')
            .then(m => m.Home);
        },
    },

    {
        path: 'products',
        pathMatch: 'full',
        loadComponent() {
            return import('./components/product-component/product-component')
            .then(m => m.ProductComponent);
        }
    }
];
