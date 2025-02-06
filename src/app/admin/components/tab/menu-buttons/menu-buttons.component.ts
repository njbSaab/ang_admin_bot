import { Component, OnInit } from '@angular/core';
import { MainButtonsMenuService } from '../../../../shared/services/main-buttons-menu.service';
import { MenuTable } from '../../../../interfaces/menu-table.interface';
import { InlineButtonsMenuIndexService } from '../../../../shared/services/inline-buttons-menu-index.service';
import {MenuButtonService} from '../../../../shared/services/menu-button.service';
import { MenuButton } from '../../../../interfaces/menu-button.interface';
// Расширенный тип с полем isEditing
type EditableMenuTable = MenuTable & { isEditing?: boolean };

@Component({
  selector: 'app-menu-buttons',
  templateUrl: './menu-buttons.component.html',
  styleUrls: ['./menu-buttons.component.scss'],
})
export class MenuButtonsComponent implements OnInit {
  menuTables: EditableMenuTable[] = []; // Используем расширенный тип
  successMessage: string | null = null;
  errorMessage: string | null = null;
  activeIndex: number | null = null;
  isEditing: boolean = false
  constructor(
    private menuService: MainButtonsMenuService,
    private inlineButtonsService: InlineButtonsMenuIndexService,
    private menuButtonService: MenuButtonService
  ) {}

  ngOnInit(): void {
    this.loadMenuTables();
    // this.loadPostButtons()
  }

  loadMenuTables(): void {
    this.menuService.getMenuTables().subscribe({
      next: (data) => {
        this.menuTables = data.map((table) => ({ ...table, isEditing: false, buttons: [] }));
        console.log('✅ Загружено успешно menuTables', this.menuTables);
  
        // Загружаем кнопки после получения таблиц
        this.loadPostButtons();
      },
      error: () => {
        this.errorMessage = 'Ошибка при загрузке данных';
      },
    });
  }

  loadPostButtons(): void {
    this.inlineButtonsService.getPostButtons().subscribe({
      next: (postButtons) => {
        console.log('🔹 Загружены связи постов и кнопок:', postButtons);
        
        postButtons.forEach(btn => {
          console.log(`Кнопка с ID: ${btn.button?.id} привязана к посту с ID: ${btn.post?.id}`);
        });
  
        const buttonIds = postButtons.map(btn => btn.button?.id);
        console.log('📌 ID кнопок:', buttonIds);
  
        this.menuButtonService.getButtons().subscribe({
          next: (allButtons) => {
            console.log('✅ Загружены полные данные кнопок:', allButtons);
  
            this.menuTables.forEach((table) => {
              if (table.linked_post) {
                console.log(`Пост с ID ${table.linked_post.id} связан с кнопками:`);
                table.buttons = postButtons
                  .filter((btn) => btn.post?.id === table.linked_post?.id)
                  .map((btn) => {
                    const foundButton = allButtons.find((b) => b.id === btn.button?.id);
                    console.log(`Для поста ${btn.post?.id} нашли кнопку:`, foundButton);
                    return foundButton;
                  })
                  .filter((btn): btn is MenuButton => btn !== undefined);
  
                console.log('Кнопки для таблицы:', table.buttons);
              }
            });
  
            console.log('🔄 Обновленные таблицы с кнопками:', this.menuTables);
          },
          error: () => {
            console.error('❌ Ошибка при загрузке данных кнопок');
          },
        });
      },
      error: () => {
        console.error('❌ Ошибка при загрузке связей кнопок');
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
  // Закрытие сообщений об успехе и ошибках
  closeMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }
  toggleClick(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
  toggleClickBtn(index: number):void{
    this.activeIndex = this.activeIndex === index ? null : index;
    this.isEditing = !this.isEditing
  }
}