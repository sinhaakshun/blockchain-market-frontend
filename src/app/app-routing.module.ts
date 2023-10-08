import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { ListComponent } from './list/list.component';
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path : 'list', component : ListComponent},
  {path : 'orders', component : OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
