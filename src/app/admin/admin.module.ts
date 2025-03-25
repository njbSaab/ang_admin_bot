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
import { MainButtonsMenuComponent } from './components/tab/main-buttons-menu/main-buttons-menu.component';
import { NewsBotComponent } from './components/tab/news-bot/news-bot.component';
import { PushComponent } from './pages/push/push.component';
import { UsersComponent } from './pages/users/users.component';
import { NewsCategoryComponent } from './components/tab/news-category/news-category.component';
import { ImagesComponent } from './pages/images/images.component';
import { ImageUploadComponent } from './pages/images/image-upload/image-upload.component';
import { ImagesTableComponent } from './pages/images/images-table/images-table.component';
@NgModule({
  declarations: [AdminPageComponent, AddButtonComponent, GreetingBotComponent, PopupEditComponent, PostsBotComponent, MenuButtonsComponent, InlineButtonsComponent, EditBtnMainComponent, EditBtnIconComponent, MainButtonsMenuComponent, NewsBotComponent, PushComponent, UsersComponent, NewsCategoryComponent, ImagesComponent, ImageUploadComponent, ImagesTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
  ],
  exports: [
    AdminPageComponent
  ]
})
export class AdminModule {}
