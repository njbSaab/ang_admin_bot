import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  public url = environment.auth.baseUrl;
  // Задайте URL для загрузки, например, используя переменную окружения.
  private uploadUrl = `${this.url}upload`; // например, http://localhost:3101/api/upload

  constructor(private http: HttpClient) {}

  /**
   * Загружает изображение на сервер.
   * @param file Файл, выбранный пользователем.
   * @returns Observable, который возвращает ответ сервера.
   */
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(this.uploadUrl, formData);
  }
}