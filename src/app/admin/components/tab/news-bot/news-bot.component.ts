import { Component, OnInit } from '@angular/core';
import { NewsBotService } from '../../../../shared/services/news-bot.service';
import { NewsBot } from '../../../../interfaces/news-bot.interface';

@Component({
  selector: 'app-news-bot',
  templateUrl: './news-bot.component.html',
  styleUrls: ['./news-bot.component.scss']
})
export class NewsBotComponent implements OnInit {
  newsItems: (NewsBot & { isEditing?: boolean })[] = [];
  loading: boolean = true;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private newsBotService: NewsBotService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.newsBotService.getNews().subscribe({
      next: (data) => {
        // Добавляем флаг isEditing для каждого элемента (для режима редактирования)
        this.newsItems = data.map(news => ({ ...news, isEditing: false }));
        console.log("NEWS",this.newsItems);
        
        this.loading = false;
      },
      error: (err) => {
        console.error('Ошибка при загрузке новостей:', err);
        this.errorMessage = 'Ошибка при загрузке новостей';
        this.loading = false;
      }
    });
  }

  // Переключение режима редактирования для новости
  toggleEdit(news: NewsBot & { isEditing?: boolean }): void {
    news.isEditing = !news.isEditing;
    this.clearMessages();
  }

  // Сохранение изменений новости
  saveChanges(news: NewsBot & { isEditing?: boolean }): void {
    const updateData: Partial<NewsBot> = {
      post_title: news.post_title,
      post_content: news.post_content,
      post_image_url: news.post_image_url,
      category: news.category,
      isActive: news.isActive,
      news_url: news.news_url,
    };

    this.newsBotService.updateNews(news.id, updateData).subscribe({
      next: (updatedNews) => {
        news.isEditing = false;
        this.successMessage = 'Изменения сохранены успешно!';
        setTimeout(() => this.closeSuccessMessage(), 3000);
      },
      error: (err) => {
        console.error('Ошибка при сохранении новости:', err);
        this.errorMessage = 'Ошибка при сохранении изменений';
        setTimeout(() => this.closeErrorMessage(), 3000);
      }
    });
  }

  // Методы для управления сообщениями об успехе/ошибке
  closeSuccessMessage(): void {
    this.successMessage = null;
  }

  closeErrorMessage(): void {
    this.errorMessage = null;
  }

  clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }
}