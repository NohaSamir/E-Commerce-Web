import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth-service';
import { AdminHomePage } from '../admin/admin-home-page/admin-home-page';
import { UserRole } from '../../models/user-role';
import { CustomerHomePage } from '../customer/customer-home-page/customer-home-page';
import { GuestHomePage } from '../guest/guest-home-page/guest-home-page';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, AdminHomePage, CustomerHomePage, GuestHomePage],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  private authService = inject(AuthService);

  isLoggedIn = signal(false);
  userRole = signal<UserRole>(UserRole.GUEST);

  showAdminHomePage = computed(() => this.isLoggedIn() && this.userRole() === UserRole.ADMIN);
  showCustomerHomePage = computed(() => this.isLoggedIn() && this.userRole() !== UserRole.ADMIN);
  showGuestHomePage = computed(() => !this.isLoggedIn());

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
