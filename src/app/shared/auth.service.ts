import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = true;
  constructor() { }
  logout() {
    localStorage.clear();
  }
  login() {
    this.isLoggedIn = true;
  }
  isAuthenticated() {
    JSON.parse(localStorage.getItem('token')) ? this.isLoggedIn = true : this.isLoggedIn = false;
    return this.isLoggedIn;
  }
}
