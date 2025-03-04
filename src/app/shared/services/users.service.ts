import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/users.interface'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // private apiUrl = 'http://localhost:3101/users';
  private apiUrl = 'https://top4winners.top/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}