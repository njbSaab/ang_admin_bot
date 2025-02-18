import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PushService {
  // URL контроллера на сервере.
  private defaultUrl = 'http://localhost:3101/push';


  constructor(private http: HttpClient) {}

  // Обновленный метод: принимает сообщение и опционально URL
  sendPush(message: string, url?: string): Observable<any> {
    const pushUrl = url || this.defaultUrl;
    return this.http.post(pushUrl, { message });
  }
}