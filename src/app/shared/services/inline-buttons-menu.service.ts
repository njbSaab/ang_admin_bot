import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MenuButton } from '../../interfaces/menu-button.interface';

@Injectable({
  providedIn: 'root'
})
export class InlineButtonsMenuService {
  private apiUrl = environment.auth.apiUrl;

  constructor(private http: HttpClient) {}

  getButtons(): Observable<MenuButton[]> {
    return this.http.get<MenuButton[]>(`${this.apiUrl}menu/buttons`);
  }
}