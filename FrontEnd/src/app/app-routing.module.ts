import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { TechsComponent } from './techs/techs.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {RegPedidoComponent} from './reg-pedido/reg-pedido.component';
import {UserDetailComponent} from './user-detail/user-detail.component'
import { PasswordChangeComponent } from './password-change/password-change.component';
import { TechComponent } from './tech/tech.component';
import { EditTechComponent } from './edit-tech/edit-tech.component';
import { UserRequestsComponent } from './user-requests/user-requests.component';
import { CriarTechComponent } from './criar-tech/criar-tech.component';
import { TesteComponent } from './teste/teste.component';
import { EstatisticaComponent } from './estatistica/estatistica.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
  path: 'home',
  component: HomeComponent
},
{
  path: 'user',
  component: UserDetailComponent
},
{
  path: 'tech',
  component: TechComponent
},
{
  path: 'users',
  component: UsersComponent
},
{
  path: 'techs',
  component: TechsComponent
},
{
  path: 'requests',
  component: PedidosComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'user/update' ,
  component: EditUserComponent
},
{
  path: 'tech/update' ,
  component: EditTechComponent
},
{
  path: "requests/create" ,
  component: RegPedidoComponent
},
{
  path: "user/changepw",
  component: PasswordChangeComponent
},
{
  path: "user/requests",
  component: UserRequestsComponent
},
{
  path: "admin/createTech",
  component: CriarTechComponent
},
{
  path: "tech/edit/teste",
  component: TesteComponent
},
{
  path: "admin/estatistica",
  component: EstatisticaComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
