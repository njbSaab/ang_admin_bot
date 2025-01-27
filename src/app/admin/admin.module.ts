import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { AddButtonComponent } from './pages/add-button/add-button.component';
import { GreetingBotComponent } from './components/tab/greeting-bot/greeting-bot.component';
import { PopupEditComponent } from './components/ui/popup-edit/popup-edit.component';

@NgModule({
  declarations: [AdminPageComponent, AddButtonComponent, GreetingBotComponent, PopupEditComponent],
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
