import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PanelComponent } from './components/panel/panel.component';
import { UsersMenuComponent } from './components/users-menu/users-menu.component';
import { RouterModule } from '@angular/router';
import { EditIconComponent } from './components/ui/edit-icon/edit-icon.component';
import { FilterByParentIdPipe } from './pipes/filter-by-parent-id.pipe';
import { FilterByParentMenuIdPipe } from './pipes/filter-by-parent-menu-id.pipe';



@NgModule({
  declarations: [SidebarComponent, PanelComponent, UsersMenuComponent, EditIconComponent, FilterByParentIdPipe, FilterByParentMenuIdPipe],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [SidebarComponent, EditIconComponent, FilterByParentIdPipe, FilterByParentMenuIdPipe]
})
export class SharedModule { }
