import { Component, OnInit } from '@angular/core';
import { NewsCategoryService, NewsCategory } from '../../../shared/services/news-category.service';
import { PushService } from '../../../shared/services/push.service';
import { UrlValidationService } from '../../../shared/services/url-validation.service';

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.scss']
})
export class PushComponent implements OnInit {
  message: string = '';
  isSending: boolean = false;
  resultMessage: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  categories: NewsCategory[] = [];
  selectedCategoryIds: number[] = [];

  constructor(
    private pushService: PushService,
    private newsCategoryService: NewsCategoryService,
    public urlValidationService: UrlValidationService 
    
  ) {}

  ngOnInit(): void {
    this.newsCategoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Получены категории:', this.categories);
      },
      error: (err) => {
        console.error('Ошибка при получении категорий:', err);
      },
    });
  }

  onCategoryChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const categoryId = parseInt(checkbox.value, 10);
    if (checkbox.checked) {
      // Если значение ещё не добавлено, добавляем его
      if (!this.selectedCategoryIds.includes(categoryId)) {
        this.selectedCategoryIds.push(categoryId);
      }
    } else {
      // Удаляем значение из массива
      this.selectedCategoryIds = this.selectedCategoryIds.filter(id => id !== categoryId);
    }
    console.log('Выбранные категории:', this.selectedCategoryIds);
  }
  // Обновление изображения при изменении URL
  refreshImage(): void {
    this.clearMessages();
  }

  sendPush(): void {
    if (!this.message.trim()) {
      this.resultMessage = 'Введите сообщение!';
      return;
    }
    this.isSending = true;
    this.resultMessage = '';

    // Пример: если выбрана хотя бы одна категория, отправляем пуш для первой выбранной
    let url = 'https://top4winners.top/push';
    if (this.selectedCategoryIds.length > 0) {
      url += `?categoryId=${this.selectedCategoryIds[0]}`;
    }
    
    this.pushService.sendPush(this.message, url).subscribe({
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

  cancelMessage(): void {
    this.resultMessage = '';
  }
  closeMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }
  // Очистка сообщений
  clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }
}