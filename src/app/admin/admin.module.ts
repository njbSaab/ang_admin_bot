import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { AddButtonComponent } from './components/add-button/add-button.component';

@NgModule({
  declarations: [AdminPageComponent, AddButtonComponent],
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
