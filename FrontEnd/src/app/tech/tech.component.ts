import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.css']
})
export class TechComponent implements OnInit {

  tech = {
    nome : "",
    email: ""
  }

  constructor(
    private _userService : UsersService,
    private _authService : AuthService
    ) { }

  ngOnInit(): void {
    this.getTech();
  }

  getTech(){
    this._userService.getTech(this._authService.getUserId())
    .subscribe(
    res => {
      this.tech = res.tech;
      console.log(this.tech);
    },
    err => console.log(err)
  )
  }
  deleteTech(){
    this._userService.deleteTech(this._authService.getUserId())
  }

}
