import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { HeaderComponent } from './header/header.component';
import { TechsComponent } from './techs/techs.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './auth.service';
import { UsersService } from './users.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { RegPedidoComponent } from './reg-pedido/reg-pedido.component';
import { PedidosService } from './pedidos.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { TechComponent } from './tech/tech.component';
import { EditTechComponent } from './edit-tech/edit-tech.component';
import { UserRequestsComponent } from './user-requests/user-requests.component';
import { CriarTechComponent } from './criar-tech/criar-tech.component';
import { TesteComponent } from './teste/teste.component';
import { EstatisticaComponent } from './estatistica/estatistica.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HeaderComponent,
    PedidosComponent,
    TechsComponent,
    RegisterComponent,
    LoginComponent,
    EditUserComponent,
    RegPedidoComponent,
    UserDetailComponent,
    PasswordChangeComponent,
    TechComponent,
    EditTechComponent,
    UserRequestsComponent,
    CriarTechComponent,
    TesteComponent,
    EstatisticaComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [AuthService, UsersService, PedidosService, {
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
