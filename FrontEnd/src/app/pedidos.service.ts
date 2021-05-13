import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

/**
 * Classe que contém todos as funções para efetuar 
 * métodos HTTP para pedidos
 * @author Paulo Gonçalves
 * @author Ruben Freitas
*/
export class PedidosService {

  private _pedidosUrl = "http://localhost:3000/requests"

  constructor(private http: HttpClient) { }

  /**
   * Método HTTP POST para criar um pedido para um utilizador
   * É dado os dados do pedido como parámetro
   * @param pedido 
   */
  createPedido(pedido) {
    return this.http.post<any>(this._pedidosUrl, pedido)
  }

  /**
   * Método HTTP GET para retornar o array de pedidos de todos os utilizadores
   */
  getRequests() {
    return this.http.get<any>(this._pedidosUrl)
  }

  /**
   * Método HTTP GET para retornar o array de pedidos de um utilizador
   * É dado como parámetro o id do Utilizador
   * @param userId 
   */
  getUserRequests(userId) {
    const _userReqUrl = `${this._pedidosUrl}/user/${userId}`;
    return this.http.get<any>(_userReqUrl)
  }

  /**
   * Método HTTP DELETE para eliminar um pedido de um utilizador
   * É dado como parámetro o id do Utilizador
   * @param id 
   */
  deleteRequest(id){
    const _deleteUrl = `${this._pedidosUrl}/${id}`;
    return this.http.delete<any>(_deleteUrl);
  }

  /**
   * Método HTTP PATCH para dar upload de um ficheiro pdf num dado utilizador
   * É dado como parámetro o ficheiro pdf e o id do utilizador
   * @param pdf 
   * @param id 
   */
  upload(pdf: File , id: string){
    const _uploadUrl = `${this._pedidosUrl}/upload/${id}`;
    const formData: FormData = new FormData();
    formData.append('relatorioClinico', pdf, pdf.name);
    return this.http.patch<any>(_uploadUrl,formData);
  }
}
