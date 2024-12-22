import { Component, OnInit } from '@angular/core';
import { MenuButtonService, MenuButton } from '../../../shared/services/menu-button.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  buttons: MenuButton[] = [];
  groupedButtons: Record<number, { group_key: string | null; buttons: MenuButton[] }> = {};
  successMessage: string = '';
  errorMessage: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  searchText: string = '';

  constructor(private menuButtonService: MenuButtonService) {}

  ngOnInit(): void {
    this.loadButtons();
  }

  loadButtons(): void {
    this.menuButtonService.getButtons().subscribe({
      next: (buttons) => {
        this.buttons = buttons;
        this.groupAndSortButtons();
      },
      error: (error) => {
        console.error('Ошибка при загрузке кнопок:', error);
        this.errorMessage = 'Ошибка при загрузке кнопок.';
      },
    });
  }

  groupAndSortButtons(): void {
    const filteredButtons = this.buttons.filter(button =>
      button.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      (button.content && button.content.toLowerCase().includes(this.searchText.toLowerCase()))
    );

    const sortedButtons = [...filteredButtons].sort((a, b) => {
      const parentA = a.parent_id || 0;
      const parentB = b.parent_id || 0;
      return this.sortOrder === 'asc' ? parentA - parentB : parentB - parentA;
    });

    this.groupedButtons = sortedButtons.reduce(
      (acc: Record<number, { group_key: string | null; buttons: MenuButton[] }>, button) => {
        const parentId = button.parent_id || 0;
        if (!acc[parentId]) {
          acc[parentId] = { group_key: button.group_key || 'No Group Key', buttons: [] };
        }
        acc[parentId].buttons.push(button);
        return acc;
      },
      {}
    );

    console.log('Группировка и сортировка завершены:', this.groupedButtons);
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.groupAndSortButtons();
  }

  getGroupedKeys(): number[] {
    return Object.keys(this.groupedButtons)
      .map(key => Number(key))
      .sort((a, b) => (this.sortOrder === 'asc' ? a - b : b - a));
  }

  saveButton(button: MenuButton): void {
    this.menuButtonService.updateButton(button.id, {
      name: button.name,
      content: button.content,
    }).subscribe({
      next: (updatedButton) => {
        const index = this.buttons.findIndex((b) => b.id === button.id);
        if (index > -1) {
          this.buttons[index] = updatedButton;
        }
        this.groupAndSortButtons();
        this.successMessage = `Кнопка "${button.name}" успешно обновлена.`;
      },
      error: (error) => {
        console.error(`Ошибка при обновлении кнопки с ID ${button.id}:`, error);
        this.errorMessage = `Ошибка при обновлении кнопки "${button.name}".`;
      },
    });
  }
}
