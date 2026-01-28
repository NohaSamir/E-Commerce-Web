import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginRequest, RegisterRequest, AuthResponse } from '../../models/user';
import { UserRole } from '../../models/user-role';
import { BASE_API_URL } from '../api-config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${BASE_API_URL}/auth`;
  private readonly loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // ---------------------------
  // Authentication Requests
  // ---------------------------

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.saveCurrentUserInfo(response);
        this.loggedInSubject.next(true);
      }),
      catchError((error) => {
        console.error('Error during login:', error);
        return throwError(() => error);
      })
    );
  }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerRequest);
  }

  registerAdmin(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-admin`, registerRequest);
  }

  // ---------------------------
  // Token & Login Management
  // ---------------------------

  logout(): void {
    if (!this.isBrowser()) return;

    localStorage.removeItem('token');
    localStorage.removeItem('user-id');
    localStorage.removeItem('username');
    localStorage.removeItem('user-role');

    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('token') : null;
  }

  setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
  }

  // ---------------------------
  // Current User Info
  // ---------------------------

  private saveCurrentUserInfo(response: AuthResponse): void {
    if (!this.isBrowser()) return;

    const { id, username, role } = response.user;
    localStorage.setItem('user-id', id);
    localStorage.setItem('username', username);
    localStorage.setItem('user-role', role); // store enum string directly
  }

  getCurrentUsername(): string | null {
    return this.isBrowser() ? localStorage.getItem('username') : null;
  }

  getCurrentUserId(): string | null {
    return this.isBrowser() ? localStorage.getItem('user-id') : null;
  }

  getCurrentUserRole(): UserRole | null {
    if (!this.isBrowser()) return null;

    const role = localStorage.getItem('user-role');
    return this.isValidRole(role) ? (role as UserRole) : null;
  }

  // ---------------------------
  // Helpers
  // ---------------------------

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private isValidRole(role: string | null): role is UserRole {
    return role !== null && Object.values(UserRole).includes(role as UserRole);
  }
}
