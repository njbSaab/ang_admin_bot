import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PushService {
  // URL контроллера на сервере.
  // Если у вас контроллер зарегистрирован без глобального префикса, URL будет таким:
  private pushUrl = 'http://localhost:3101/push';
  // Если же установлен глобальный префикс, например, 'api', скорректируйте URL: 
//   private pushUrl = 'http://localhost:3101/api/push';

  constructor(private http: HttpClient) {}

  sendPush(message: string): Observable<any> {
    return this.http.post(this.pushUrl, { message });
  }
}