import { Component, OnInit } from '@angular/core';
import { MenuButtonService, MenuButton } from '../../../shared/services/menu-button.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  buttons: MenuButton[] = []; // Массив для хранения кнопок

  constructor(private menuButtonService: MenuButtonService) {}

  ngOnInit(): void {
    this.loadButtons(); // Загружаем кнопки при инициализации компонента
  }

  loadButtons(): void {
    this.menuButtonService.getButtons().subscribe(
      (data) => {
        console.log('Полученные кнопки:', data);
        this.buttons = data;
      },
      (error) => {
        console.error('Ошибка при загрузке кнопок:', error);
      }
    );
  }
}
