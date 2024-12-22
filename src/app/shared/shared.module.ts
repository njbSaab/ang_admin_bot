import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PanelComponent } from './components/panel/panel.component';
import { UsersMenuComponent } from './components/users-menu/users-menu.component';



@NgModule({
  declarations: [SidebarComponent, PanelComponent, UsersMenuComponent],
  imports: [
    CommonModule
  ],
  exports: [SidebarComponent]
})
export class SharedModule { }
