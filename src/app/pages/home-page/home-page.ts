import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsTableComponent } from '../../components/products-table-component/products-table-component';
import { LoginFormComponent } from '../../components/login-form-component/login-form-component';
import { AuthService } from '../../services/auth/auth-service';
import { RouterLink } from '@angular/router';
import { AdminHomePage } from '../admin/admin-home-page/admin-home-page';
import { UserRole } from '../../models/user-role';

@Component({
  selector: 'app-home-page',
  imports: [LoginFormComponent, CommonModule, AdminHomePage],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  private authService = inject(AuthService);

  isLoggedIn = signal(false);
  userRole = signal<UserRole>(UserRole.GUEST);

  showAdmin = computed(() => this.isLoggedIn() && this.userRole() === UserRole.ADMIN);
  showHome = computed(() => this.isLoggedIn() && this.userRole() !== UserRole.ADMIN);
  showLogin = computed(() => !this.isLoggedIn());

  constructor() {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn.set(loggedIn);
      if (loggedIn) {
        const role = this.authService.getCurrentUserRole();
        this.userRole.set(role ?? UserRole.GUEST);
      } else {
        this.userRole.set(UserRole.GUEST);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.userRole.set(UserRole.GUEST);
  }
}
