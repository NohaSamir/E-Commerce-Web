import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginRequest, RegisterRequest, AuthResponse } from '../../models/user';
import { BASE_API_URL } from '../api-config';
import { Console } from 'console';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${BASE_API_URL}/auth`;

  private loggedInSubject = new BehaviorSubject<boolean>(!!this.getToken());
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap((response: AuthResponse) => {
        this.loggedInSubject.next(true);
        this.saveCurrentUserInfo(response);
      }),
      catchError((error) => {
        console.error('Error during login:', error);
        throw error;
      }),
    );
  }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerRequest);
  }

  registerAdmin(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-admin`, registerRequest);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.loggedInSubject.next(false);
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  saveCurrentUserInfo(response: AuthResponse) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('username', response.user.username);
      localStorage.setItem('user-id', response.user.id);
    }
    this.setToken(response.token);
  }

  getCurrentUsername(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem('username');
  }
}
