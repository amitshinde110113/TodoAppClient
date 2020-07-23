import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  baseUrl = 'http://localhost:4000/api/notes'

  constructor(private http: HttpClient) { }
  create(note) {
    return this.http.post(`${this.baseUrl}/`, note);
  }
  update(note, id) {
    return this.http.patch(`${this.baseUrl}/${id}`, note);
  }
  delete(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getById(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getAll() {
    return this.http.get(`${this.baseUrl}/`);
  }
}
