import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginCredentials, AuthResponse, User, RegisterCredentials } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'podcast_auth_token';
  private readonly USER_KEY = 'podcast_user';
  readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  
   register(data: RegisterCredentials): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        if (res.status === 'success') {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          console.log('Bearer Token:', res.data.token);
        }
      })
    );;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserFromStorage(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  storeAuthData(token: string, user: User): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  hasValidToken(): boolean {
    const token = this.getToken();
    return !!token;
  }
}