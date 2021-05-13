import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service'

@Component({
  selector: 'app-techs',
  templateUrl: './techs.component.html',
  styleUrls: ['./techs.component.css']
})
export class TechsComponent implements OnInit {

  techs = [];

  constructor(private _usersService: UsersService) { }

  ngOnInit(): void {
    this.getTechs();

  }
  getTechs(){
    this._usersService.getTechs()
    .subscribe(
      res => {
        this.techs = res.techs;
        for (let index = 0; index < this.techs.length; index++) {
          this.techs[index] = this.techs[index].tech;

        }
        console.log(this.techs);
      },
      err => console.log(err)
    )
  }
  deleteTech(id : number){
    this._usersService.deleteTech(id)
      .subscribe();
    this.getTechs()

  }

  setIdUpdate(id){
    this._usersService.setIdTechUpdate(id)
  }

}
