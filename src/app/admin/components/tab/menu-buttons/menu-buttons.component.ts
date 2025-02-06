import { Component, OnInit } from '@angular/core';
import { MainButtonsMenuService } from '../../../../shared/services/main-buttons-menu.service';
import { MenuTable } from '../../../../interfaces/menu-table.interface';

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

  constructor(private menuService: MainButtonsMenuService) {}

  ngOnInit(): void {
    this.loadMenuTables();
  }

  loadMenuTables(): void {
    this.menuService.getMenuTables().subscribe({
      next: (data) => {
        this.menuTables = data.map((table) => ({ ...table, isEditing: false }));
        console.log('Загружено успешно menuTables', this.menuTables);

      },
      
      error: () => {
        this.errorMessage = 'Ошибка при загрузке данных';
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


}