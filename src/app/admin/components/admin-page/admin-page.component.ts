import { Component, OnInit } from '@angular/core';
import { MenuButtonService, MenuButton } from '../../../shared/services/menu-button.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  buttons: MenuButton[] = [];

  constructor(private menuButtonService: MenuButtonService) {}

  ngOnInit(): void {
    this.loadButtons();
  }

  // Загрузка кнопок
  loadButtons(): void {
    this.menuButtonService.getButtons().subscribe({
      next: (buttons) => {
        this.buttons = buttons;
      },
      error: (error) => {
        console.error('Ошибка при загрузке кнопок:', error);
      }
    });
  }

  // Сохранение изменений для кнопки
  saveButton(button: MenuButton): void {
    this.menuButtonService.updateButton(button.id, {
      name: button.name,
      content: button.content
    }).subscribe({
      next: (updatedButton) => {
        console.log(`Кнопка с ID ${button.id} обновлена`, updatedButton);
      },
      error: (error) => {
        console.error(`Ошибка при обновлении кнопки с ID ${button.id}:`, error);
      }
    });
  }
}
