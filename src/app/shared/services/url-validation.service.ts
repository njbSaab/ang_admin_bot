import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlValidationService {
  isValidImageUrl(url: string | undefined): boolean {
    // Если строка пустая или не задана — считаем, что проверка пройдена
    if (!url || url.trim() === '') {
      return true;
    }
    return url.startsWith('https://top4winners.top/') || url.startsWith('https://1xjet.netlify.app/');
  }
}
