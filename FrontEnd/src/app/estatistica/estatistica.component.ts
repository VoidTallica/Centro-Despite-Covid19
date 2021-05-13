import { Component, OnInit } from '@angular/core';
import { EstatisticaService } from '../estatistica.service';

@Component({
  selector: 'app-estatistica',
  templateUrl: './estatistica.component.html',
  styleUrls: ['./estatistica.component.css']
})
export class EstatisticaComponent implements OnInit {

  constructor(private _estatisticaService :  EstatisticaService) { }

  positivos : string
  testes : string
  id: string
  data: string
  testes_data: string

  ngOnInit(): void {
    this.casosPositivos()
  }

  userTestes(){
    this._estatisticaService.userTestes(this.id)
    .subscribe(
      res=> this.testes = res.message
    )
  }

  casosDia(){
    this._estatisticaService.casosDia(this.data)
    .subscribe(
      res=> this.testes_data=res.message,
      err=> console.log(err)
    )
  }
  casosPositivos(){
    this._estatisticaService.casosPositivos()
    .subscribe(
      res=> {this.positivos = res.message
      console.log(this.positivos)}
    )
  }

}
