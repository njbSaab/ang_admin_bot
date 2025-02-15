import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component'; // Компонент админки
import { AddButtonComponent } from './pages/add-button/add-button.component';
import { PushComponent } from './pages/push/push.component';

const routes: Routes = [
  { path: '', component: AdminPageComponent },
  { path: 'add-button', component: AddButtonComponent },
  { path: 'push', component: PushComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
