import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/admin-page/admin-page.component'; // Компонент админки
import { AddButtonComponent } from './components/add-button/add-button.component';

const routes: Routes = [
  { path: '', component: AdminPageComponent },
  { path: 'add-button', component: AddButtonComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
