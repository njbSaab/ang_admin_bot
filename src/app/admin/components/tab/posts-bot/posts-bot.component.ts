import { Component, OnInit } from '@angular/core';
import { MenuPost } from '../../../../interfaces/menu-post.interface';
import { PostBotService } from '../../../../shared/services/post-bot.service';

// Тип для редактируемых постов
type EditableMenuPost = MenuPost & { isEditing?: boolean };

@Component({
  selector: 'app-posts-bot',
  templateUrl: './posts-bot.component.html',
  styleUrls: ['./posts-bot.component.scss'],
})
export class PostsBotComponent implements OnInit {
  posts: EditableMenuPost[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  loading: boolean = true;

  constructor(private postService: PostBotService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  // Загрузка постов
  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.map((post) => ({ ...post, isEditing: false }));
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Ошибка при загрузке постов';
        this.loading = false;
      },
    });
  }

  // Переключение режима редактирования
  toggleEdit(post: EditableMenuPost): void {
    post.isEditing = !post.isEditing;
    this.clearMessages(); // Очистка сообщений при редактировании
  }

  // Сохранение изменений
  saveChanges(post: EditableMenuPost): void {
    this.postService
      .updatePost(post.id, {
        post_title: post.post_title,
        post_content: post.post_content,
        post_image_url: post.post_image_url,
      })
      .subscribe({
        next: () => {
          this.successMessage = 'Пост успешно обновлен!';
          post.isEditing = false;
        },
        error: () => {
          this.errorMessage = 'Ошибка при обновлении поста';
        },
      });
  }

  // Обновление изображения при изменении URL
  refreshImage(post: EditableMenuPost): void {
    console.log('URL изображения обновлено:', post.post_image_url);
    this.clearMessages();
  }

  // Закрытие сообщений об успехе и ошибках
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