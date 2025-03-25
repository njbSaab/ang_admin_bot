// push.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PushService {
  // Адрес, куда отправляем push-запрос
  private defaultUrl = 'https://top4winners.top/push';

  constructor(private http: HttpClient) {}

  /**
   * Принимаем объект payload, в котором могут быть
   * imageUrl, text, buttonName, buttonUrl и т.д.
   */
  sendPush(payload: {
    imageUrl?: string;
    text?: string;
    buttonName?: string;
    buttonUrl?: string;
    categoryIds?: number[];
  }): Observable<any> {
    // Просто шлём POST-запрос по умолчанию на defaultUrl
    return this.http.post(this.defaultUrl, payload);
  }
}