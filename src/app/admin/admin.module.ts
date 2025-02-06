import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { AddButtonComponent } from './pages/add-button/add-button.component';
import { GreetingBotComponent } from './components/tab/greeting-bot/greeting-bot.component';
import { PopupEditComponent } from './components/ui/popup-edit/popup-edit.component';
import { PostsBotComponent } from './components/tab/posts-bot/posts-bot.component';
import { MenuButtonsComponent } from './components/tab/menu-buttons/menu-buttons.component';
import { InlineButtonsComponent } from './components/ui/inline-buttons/inline-buttons.component';
import { EditBtnMainComponent } from './components/ui/edit-btn-main/edit-btn-main.component';
import { EditBtnIconComponent } from './components/ui/edit-btn-icon/edit-btn-icon.component';

@NgModule({
  declarations: [AdminPageComponent, AddButtonComponent, GreetingBotComponent, PopupEditComponent, PostsBotComponent, MenuButtonsComponent, InlineButtonsComponent, EditBtnMainComponent, EditBtnIconComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule
  ],
  exports: [
    AdminPageComponent
  ]
})
export class AdminModule {}
