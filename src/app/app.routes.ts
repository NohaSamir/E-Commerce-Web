import { Routes } from '@angular/router';
import { ProductComponent } from './components/product-component/product-component';
import { Home } from './components/home/home';
import { ProductFormPage } from './pages/admin/product-form-page/product-form-page';
import { AdminHomePage } from './pages/admin/admin-home-page/admin-home-page';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ProductComponent },
  { path: 'tests', component: Home },
  { path: 'product-form', component: ProductFormPage },

  //   Admin Routes
  { path: 'admin', component: AdminHomePage },
  { path: 'edit-product/:id', component: ProductFormPage },
  { path: 'add-product', component: ProductFormPage },
];
