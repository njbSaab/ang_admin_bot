import { Component } from '@angular/core';
import { PushService } from '../../../shared/services/push.service';

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.scss']
})
export class PushComponent {
  // Переменная для хранения текста сообщения
  message: string = '';

  // Флаг для отображения статуса отправки (опционально)
  isSending: boolean = false;
  resultMessage: string = '';

  constructor(private pushService: PushService) {}

  sendPush(): void {
    if (!this.message.trim()) {
      this.resultMessage = 'Введите сообщение!';
      return;
    }
    this.isSending = true;
    this.resultMessage = '';
    this.pushService.sendPush(this.message).subscribe({
      next: (res) => {
        this.resultMessage = 'Push уведомление успешно отправлено!';
        this.isSending = false;
        this.message = '';
        console.log(res);
        
      },
      error: (err) => {
        console.error('Ошибка при отправке push уведомления', err);
        this.resultMessage = 'Ошибка при отправке уведомления';
        this.isSending = false;
      },
    });
  }
  cancelMessage(){
    this.resultMessage = ""
  }
}