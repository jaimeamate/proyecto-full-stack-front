import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserName(): string | null {
    return localStorage.getItem('email');
  }

  getUserData(): any {
    const token = localStorage.getItem('token');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }
}
