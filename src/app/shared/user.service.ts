import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:4000/api/users'

  constructor(private http: HttpClient) { }
  signUp(user: IUser) {
   return this.http.post(`${this.baseUrl}/signup`, user);
  }
  login(user: IUser) {
    return this.http.post(`${this.baseUrl}/login`, user);
   }
}
