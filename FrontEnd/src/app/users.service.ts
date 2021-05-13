import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from './auth.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Injectable({
  providedIn: 'root'
})

/**
 * Classe que contém todos as funções para efetuar 
 * métodos HTTP para utilizadores e técnicos
 * @author Paulo Gonçalves
 * @author Ruben Freitas
*/
export class UsersService {

  private idTechUpdate;

  private _usersUrl = "http://localhost:3000/users";
  private _techsUrl = "http://localhost:3000/techs";
  private _adminsUrl = "http://localhost:3000/admins";

  constructor (private http: HttpClient, private _authService: AuthService)  {}

  /**
   * Retorna o id do técnico
   * @returns this.idTechUpdate
   */
  getIdTechUpdate(){
    return this.idTechUpdate
  }

  /**
   * Define o id do Técnico através de um id dado como parámetro
   * @param id 
   */
  setIdTechUpdate(id){
    this.idTechUpdate = id;
  }

  /**
   * Método HTTP GET para returnar o array de utilizadores
   */
  getUsers() {
    return this.http.get<any>(this._usersUrl)
  }

  /**
   * 
   */
  getTechs() {
    return this.http.get<any>(this._techsUrl)
  }

  /**
   * Método HTTP GET para retornar o array de técnicos
   */
  getAdmins() {
    return this.http.get<any>(this._adminsUrl)
  }

  /**
   * Método HTTP DELETE para eliminar um utilizador.
   * É dado o id deste como parametro
   * @param id 
   */
  deleteUser(id)  {
    const _userDeleteUrl = `${this._usersUrl}/${id}`;
    return this.http.delete<any>(_userDeleteUrl)
  }

  /**
   * Método HTTP DELETE para eliminar um técnico.
   * É dado o id deste como parametro
   * @param id 
   */
  deleteTech(id)  {
    const _techDeleteUrl = `${this._techsUrl}/${id}`;
    return this.http.delete<any>(_techDeleteUrl)
  }

  /**
   * Método HTTP PATCH para atualizar os dados de um utilizador.
   * É dado os dados do utilizador e o id deste como parametro
   * @param id 
   * @param param 
   */
  updateUser(id, param:any) {
    const _userUpdateUrl = `${this._usersUrl}/${id}`;
    return this.http.patch<any>(_userUpdateUrl, param)
  }

  /**
   * Método HTTP PATCH para atualizar os dados de um Técnico.
   * É dado os dados do técnico e o id deste como parametro
   * @param id 
   * @param param 
   */
  updateTech(id, param:any) {
    const _techUpdateUrl = `${this._techsUrl}/${id}`;
    return this.http.patch<any>(_techUpdateUrl, param)
  }

  /**
   * Método HTTP GET para retornar um utilizador dado
   * como parametro o seu respetivo id
   * @param id 
   */
  getUser(id){
    const _userGetUrl = `${this._usersUrl}/${id}`;
    return this.http.get<any>(_userGetUrl)

  }

  /**
   * Método HTTP GET para retornar um técnico dado
   * como parametro o seu respetivo id
   * @param id 
   */
  getTech(id){
    const _techGetUrl = `${this._techsUrl}/${id}`;
    return this.http.get<any>(_techGetUrl)

  }

  /**
   * Método para alterar a palavra passe de um Utilizador,Técnico ou Admin,
   * dependo da sua role.
   * É dado o id deste e a palavra-passe pretendida como parámetros.
   * @param id 
   * @param pw 
   */
  changePw(id,pw : any) {
    if(this._authService.getRole()=="User"){const _userPWchange = `${this._usersUrl}/pwchange/${id}`; return this.http.patch<any>(_userPWchange, pw)}
    else if(this._authService.getRole()=="Tech"){const _userPWchange = `${this._techsUrl}/pwchange/${id}`; return this.http.patch<any>(_userPWchange, pw)}
    else if(this._authService.getRole()=="Admin"){const _userPWchange = `${this._adminsUrl}/pwchange/${id}`; return this.http.patch<any>(_userPWchange, pw)}
  }

  /**
   * Método para criar um teste para um utilizador
   * É dado o id do utilizador e os dados do teste como parámetros
   * @param id 
   * @param teste 
   */
  editTeste(id , teste){
    const _testeUrl = `${this._usersUrl}/tests/${id}`;
    return this.http.patch<any>(_testeUrl, teste)
  }

}
