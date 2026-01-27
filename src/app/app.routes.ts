import { Routes } from '@angular/router';
import { ProductComponent } from './components/product-component/product-component';
import { ProductFormPage } from './pages/admin/product-form-page/product-form-page';
import { AdminHomePage } from './pages/admin/admin-home-page/admin-home-page';
import { LoginFormComponent } from './components/login-form-component/login-form-component';
import { RegisterationFormComponent } from './components/registeration-form-component/registeration-form-component';

export const routes: Routes = [
  //   Admin Routes
   { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'admin', component: AdminHomePage },
  { path: 'admin/login', component: LoginFormComponent },
  { path: 'admin/register', component: RegisterationFormComponent },
  { path: 'edit-product/:id', component: ProductFormPage },
  { path: 'add-product', component: ProductFormPage },

];
