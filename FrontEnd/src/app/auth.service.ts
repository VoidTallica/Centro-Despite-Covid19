import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Classe que contém todos as funções para serviços que
 * necessitem de autenticação
 * @author Paulo Gonçalves
 * @author Ruben Freitas
*/
export class AuthService {
  private isLoggedIn = false;
  private response;

/**
 * Verifica se o token existente é valido
 * e retorna se este é valido
 * @returns this.isLoggedIn
*/
  getIsLoggedIn() {
    if("token" in localStorage){
      this.isLoggedIn=true
    }
    return this.isLoggedIn;
  }

  private _registerUrl = "http://localhost:3000/users/signup";
  private _registerTechUrl = "http://localhost:3000/techs/signup";
  private _loginUrlUser = "http://localhost:3000/users/login";
  private _loginUrlTech = "http://localhost:3000/techs/login";
  private _loginUrlAdmin = "http://localhost:3000/admins/login";

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

/**
 * Método HTTP POST para registar um utilizador
 * @param user 
*/
  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
    .pipe(catchError(this.errorHandler))
  }

/**
 * Método HTTP POST para registar um técnico
 * @param tech
*/
  registerTech(tech) {
    return this.http.post<any>(this._registerTechUrl, tech)
    .pipe(catchError(this.errorHandler))
  }

/**
 * Método HTTP POST para efetuar o login de um utilizador,
 * técnico ou admin consoante o seu role (user.role)
 * @param user 
*/
  loginUser(user) {
    if(user.role == "User"){
      this.response = this.http.post<any>(this._loginUrlUser, user)
        return this.response
        .pipe(catchError(this.errorHandler))
    }
    else if(user.role == "Tech"){
      this.response = this.http.post<any>(this._loginUrlTech, user)
      if(this.response){
        return this.response
        .pipe(catchError(this.errorHandler))
      }
    }
    else if(user.role == "Admin"){
      this.response = this.http.post<any>(this._loginUrlAdmin, user)
      if(this.response){
        return this.response
        .pipe(catchError(this.errorHandler))
      }
    }
  }

/**
  * Define a variavel isLoggedIn como true quando
  * é feito um login 
*/
  setIsLoggedIn(){
    this.isLoggedIn = true;
  }

/**
  * Retorna o token guardado na localstorage
  * @returns localStorage.getItem('token')
*/
  getToken() {
    return localStorage.getItem('token')
  }

/**  
  * Retorna o id guardado na localstorage
  * @returns localStorage.getItem('id')
*/
  getUserId() {
    return localStorage.getItem('id')
  }

/**  
  * Retorna o role guardado na localstorage
  * @returns localStorage.getItem('role')
*/
  getRole() {
    return localStorage.getItem('role')
  }
/**  
  * Efetua o logout do sistema,apagando os dados
  * guardados na local storage e define como falso
  * a variavel isLoggedIn
*/
  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
/**
 * Dá catch de um erro e processa-o
 * @param error 
 */
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}

