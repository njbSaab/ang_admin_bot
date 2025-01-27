import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MenuPost } from '../../interfaces/menu-post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostBotService {
  private apiUrl = environment.auth.apiUrl;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<MenuPost[]> {
    return this.http.get<MenuPost[]>(`${this.apiUrl}menu/posts`);
  }
}