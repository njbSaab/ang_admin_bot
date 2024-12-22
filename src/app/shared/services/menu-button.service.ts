import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MenuButton {
  id: number;
  name: string;
  action: string;
  parent_id?: number;
  content?: string;
  row_order?: number;
  column_order?: number;
  is_inline?: boolean;
  group_key?: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root', // Глобальная доступность сервиса
})
export class MenuButtonService {
  private apiUrl = 'http://localhost:3000/api/buttons'; // URL вашего API

  constructor(private http: HttpClient) {}

  // Получить все кнопки
  getButtons(): Observable<MenuButton[]> {
    return this.http.get<MenuButton[]>(this.apiUrl);
  }

  // Получить кнопку по ID
  getButton(id: number): Observable<MenuButton> {
    return this.http.get<MenuButton>(`${this.apiUrl}/${id}`);
  }

  // Создать новую кнопку
  createButton(button: Partial<MenuButton>): Observable<MenuButton> {
    return this.http.post<MenuButton>(this.apiUrl, button);
  }

  // Обновить кнопку
  updateButton(id: number, button: Partial<MenuButton>): Observable<MenuButton> {
    return this.http.put<MenuButton>(`${this.apiUrl}/${id}`, button);
  }

  // Удалить кнопку
  deleteButton(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
