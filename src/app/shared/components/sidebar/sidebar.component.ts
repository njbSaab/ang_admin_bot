import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isSidebarOpen = false; // Состояние боковой панели
  currentSidebarTab: string | null = null; // Текущая вкладка

  toggleSidebar(tab: string) {
    if (this.isSidebarOpen && this.currentSidebarTab === tab) {
      this.isSidebarOpen = false;
      this.currentSidebarTab = null;
    } else {
      this.isSidebarOpen = true;
      this.currentSidebarTab = tab;
    }
  }
}
