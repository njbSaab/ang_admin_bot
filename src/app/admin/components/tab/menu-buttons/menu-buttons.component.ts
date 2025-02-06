import { Component, OnInit } from '@angular/core';
import { MainButtonsMenuService } from '../../../../shared/services/main-buttons-menu.service';
import { MenuTable } from '../../../../interfaces/menu-table.interface';
import { InlineButtonsMenuIndexService } from '../../../../shared/services/inline-buttons-menu-index.service';
import { MenuButtonService } from '../../../../shared/services/menu-button.service';
import { PostBotService } from '../../../../shared/services/post-bot.service';
import { MenuPost } from '../../../../interfaces/menu-post.interface';
import { MenuPostButton } from '../../../../interfaces/menu-post-button.interface';

type EditableMenuTable = MenuTable & { isEditing?: boolean };
type EditableMenuButton = MenuPostButton & { isEditing?: boolean };
@Component({
  selector: 'app-menu-buttons',
  templateUrl: './menu-buttons.component.html',
  styleUrls: ['./menu-buttons.component.scss'],
})
export class MenuButtonsComponent implements OnInit {
  menuTables: EditableMenuTable[] = [];
  menuPosts: MenuPost[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  activeIndex: number | null = null;
  isEditing: boolean = false;

  constructor(
    private menuService: MainButtonsMenuService,
    private inlineButtonsService: InlineButtonsMenuIndexService,
    private menuButtonService: MenuButtonService,
    private postBotService: PostBotService
  ) {}

  ngOnInit(): void {
    this.loadMenuTables();
    this.loadPosts();
  }

  loadMenuTables(): void {
    this.menuService.getMenuTables().subscribe({
      next: (tables) => {
        this.menuTables = tables.map((table) => ({
          ...table,
          isEditing: false,
          buttons: [] // Инициализируем массив кнопок
        }));
        console.log('✅ Загружено menuTables:', this.menuTables);
  
        // Загружаем посты сразу после таблиц
        this.loadPosts();
      },
      error: () => {
        this.errorMessage = 'Ошибка при загрузке данных';
      },
    });
  }

  loadPosts(): void {
    this.postBotService.getPosts().subscribe({
      next: (posts) => {
        this.menuPosts = posts;
        console.log('✅ Загружено menuPosts:', this.menuPosts);
  
        // Связываем кнопки с menuTables
        this.linkButtonsToTables();
      },
      error: () => {
        this.errorMessage = 'Ошибка при загрузке постов';
      },
    });
  }
  linkButtonsToTables(): void {
    this.menuTables.forEach((table) => {
      if (table.linked_post) {
        const linkedPost = this.menuPosts.find(post => post.id === table.linked_post!.id);
        
        if (linkedPost) {
          table.buttons = linkedPost.buttons?.map(btn => btn.button) || []; // ✅ Берем кнопки из поста
        }
      }
    });
  
    console.log('✅ Обновлено menuTables с кнопками:', this.menuTables);
  }
  
  loadPostButtons(): void {
    this.inlineButtonsService.getPostButtons().subscribe({
      next: (data) => {
        console.log('🔹 Загружены связи постов и кнопок:', data);
  
        this.menuTables.forEach((table) => {
          if (table.linked_post) {
            table.buttons = data
              .filter((btn) => btn.post.id === table.linked_post!.id)
              .map((btn) => btn.button); // ✅ Теперь массив состоит только из кнопок
          }
        });
  
        console.log('✅ Связанные кнопки добавлены:', this.menuTables);
      },
      error: () => {
        this.errorMessage = 'Ошибка при загрузке кнопок постов';
      },
    });
  }
  toggleEdit(table: EditableMenuTable): void {
    table.isEditing = !table.isEditing;
    this.clearMessages();
  }

  saveChanges(table: EditableMenuTable): void {
    this.menuService.updateMenuTable(table.id, table).subscribe({
      next: () => {
        this.successMessage = 'Изменения успешно сохранены!';
        table.isEditing = false;
        setTimeout(() => {
          this.closeMessages();
        }, 3000);
      },
      error: () => {
        this.errorMessage = 'Ошибка при сохранении данных';
      },
    });
  }

  clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }

  closeMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }

  toggleClick(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  toggleClickBtn(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
    this.isEditing = !this.isEditing;
  }
    // Отмена редактирования
    cancelEdit(button: EditableMenuButton): void {
      button.isEditing = false;
      this.clearMessages();
    }
}