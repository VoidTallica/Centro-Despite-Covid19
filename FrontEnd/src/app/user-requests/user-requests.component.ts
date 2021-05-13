import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { PedidosService} from '../pedidos.service'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css']
})
export class UserRequestsComponent implements OnInit {

  private _requestsUrl = "http://localhost:3000/requests";

  requests = [];
  userID;

  constructor(private _pedidosService: PedidosService, private _authService: AuthService) { }

  ngOnInit(): void {
    this.getuserRequests();
  }
  getuserRequests(){
    this._pedidosService.getUserRequests(this._authService.getUserId())
    .subscribe(
      res=>{
        console.log(res);
          this.requests= res.pedidos;
          console.log(this.requests);
        
        for (let index = 0; index < this.requests.length; index++) {
          this.requests[index] = this.requests[index].pedido;
        }
      },
      err => console.log(err)
    )

  }
}
