import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

/**
 * Classe que contém todos as funções para efetuar 
 * métodos HTTP para estatisticas
 * @author Paulo Gonçalves
 * @author Ruben Freitas
*/
export class EstatisticaService {

  private _UrlAdmin = "http://localhost:3000/admins"

  constructor(private http: HttpClient) { }

  /**
   * Método HTTP GET para retornar o número de teste de um dado utilizador
   * É dado como parámetro o id do utilizador
   * @param id 
   */
  userTestes(id){
    const _url = `${this._UrlAdmin}/dataInfo_tests/${id}`
    return this.http.get<any>(_url)
  }

  /**
   * Método HTTP POST para retornar o número de casos de uma dada data
   * É dado como parámetro a data
   * @param data
   */
  casosDia(data){
    const _url = `${this._UrlAdmin}/dataInfo_cases_day`
    return this.http.post<any>(_url, { data: data})
  }

  /**
   * Método HTTP GET para retornar o número de casos postivos 
   * presentes da base de dados
   */
  casosPositivos(){
    const _url = `${this._UrlAdmin}/dataInfo_infected`
    return this.http.get<any>(_url)
  }
}
