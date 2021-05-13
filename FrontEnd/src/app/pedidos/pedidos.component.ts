import { Component, OnInit } from '@angular/core';
import { PedidosService} from '../pedidos.service'

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  private _requestsUrl = "http://localhost:3000/requests";

  requests = [];
  userId;
  relatorioClinico: File = null;

  constructor(private _pedidosService: PedidosService) { }

  ngOnInit(): void {
    this.getrequests();
  }
  getrequests(){
    this._pedidosService.getRequests()
    .subscribe(
      res=>{
        this.requests = res.requests;
        for (let index = 0; index < this.requests.length; index++) {
          this.requests[index] = this.requests[index].req;
        }
      },
      err => console.log(err)
    )
  }

  deletePedido(id: string){
    this._pedidosService.deleteRequest(id)
    .subscribe(
      res=> {
        console.log(res),
        this.getrequests()
      },
      err=> console.log(err)
    )

  }

  uploadFile(id : string, event){
    console.log(event.target.files)
    this.relatorioClinico = event.target.files[0];
    this._pedidosService.upload(this.relatorioClinico , id)
    .subscribe()
  }
}
