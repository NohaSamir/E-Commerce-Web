import { Routes } from '@angular/router';
import { ProductComponent } from './components/product-component/product-component';
import { ProductFormPage } from './pages/admin/product-form-page/product-form-page';
import { HomePage } from './pages/home-page/home-page';
import { LoginFormComponent } from './components/login-form-component/login-form-component';
import { RegisterationFormComponent } from './components/registeration-form-component/registeration-form-component';

export const routes: Routes = [
  //   Admin Routes
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterationFormComponent, data: { type: 'user' } },
  { path: 'register/admin', component: RegisterationFormComponent, data: { type: 'admin' } },
  { path: 'edit-product/:id', component: ProductFormPage },
  { path: 'add-product', component: ProductFormPage },
];
