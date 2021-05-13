import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _PorCoronaAPIUrl =  "https://api.covid19api.com/country/portugal/status/confirmed/live";
  data_cases= [];
  data_days= [];
  dataP= [];
  
  dataDiff_cases=[];
  dataDiffP=[];
  
  from="";
  to="";
  todayString ="";
  priorDateString ="";

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(){
    this.updateDate();
    this.getCasesDate(); 
  }

  getCasesDate(){
    this.getCasesMonth().subscribe(res => {
      for (let index = 0; index < res.length; index++) {
        this.data_cases.push(res[index].Cases);
        this.data_days.push(res[index].Date.replace("T00:00:00Z", ""));
      }

      for (var i = this.dataP.length; i < this.data_days.length; i++){
        this.dataP.push({
        x: new Date(this.data_days[i]),
        y: this.data_cases[i]
        });
      }
      //Criar o grafico dos casos totais
      this.graphMonth(); 

      //Buscar os dados da API e criar o grafico dos casos diarios 
      this.getDiffCasesDate();
      this.graphDiffMonth();
    },
    err => console.log(err)
    )
  }

  getDiffCasesDate(){
    this.getDiffCasesMonth();
    this.graphDiffMonth();
  }

  getDiffCasesMonth() {
    for (var i = 1; i < this.data_cases.length; i++){
      this.dataDiff_cases.push(this.data_cases[i] - this.data_cases[i - 1])
    }

    for (var i = this.dataDiffP.length; i < this.data_days.length; i++){
      this.dataDiffP.push({
      x: new Date(this.data_days[i]),
      y: this.dataDiff_cases[i]
      });
    }  
  }

  getCasesMonth() {
    this.from="?from="+this.priorDateString+"T00:00:00Z";
    this.to="&to="+this.todayString+"T00:00:00Z";
    return this.http.get<any>(this._PorCoronaAPIUrl+this.from+this.to)
  }

  updateDate(){
    const today = new Date();
    const priorDate = new Date();
    priorDate.setDate(today.getDate()-30);
    this.todayString = today.toISOString().split('T')[0];
    this.priorDateString = priorDate.toISOString().split('T')[0];
  }
  
  graphMonth(){
    const chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: "Numero de Casos positivos de Covid-19 em Portugal"
      },
      axisX: {
        title: "Dia"
      },
      axisY: {
        title: "Nº casos"
      },
      data: [{
        type: "line",
        dataPoints: this.dataP
      }]

    });
    chart.render();
  }

  graphDiffMonth(){
    const chart = new CanvasJS.Chart("chartContainer_2", {
      title: {
        text: "Numero de Casos diários de Covid-19 em Portugal"
      },
      axisX: {
        title: "Dia"
      },
      axisY: {
        title: "Nº casos"
      },
      data: [{
        type: "line",
        dataPoints: this.dataDiffP
      }]

    });
    chart.render();
  }
}
