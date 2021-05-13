import { Component, OnInit } from '@angular/core';
import { PedidosService} from '../pedidos.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reg-pedido',
  templateUrl: './reg-pedido.component.html',
  styleUrls: ['./reg-pedido.component.css']
})
export class RegPedidoComponent implements OnInit {

  createPedidoForm: FormGroup;
  isSubmitted = false;
  errorMsg = '';

  constructor(private _pedidosService: PedidosService,private formBuilder: FormBuilder, private _authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.createPedidoForm = this.formBuilder.group({
      userId:[''],
      sns: [false],
      presente: [false],
    });
  }

  createPedido(){
    this.createPedidoForm.value.userID = this._authService.getUserId();
    this._pedidosService.createPedido(this.createPedidoForm.value)
      .subscribe(
        res => {
          console.log(res),
          this.router.navigate(['/home'])
        },
        err => console.log(err)
      )
  }
  onReset() {
    this.isSubmitted = false;
    this.createPedidoForm.reset();
  }
}
