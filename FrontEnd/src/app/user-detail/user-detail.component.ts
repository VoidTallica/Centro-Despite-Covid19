import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { AuthService} from '../auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user = {
    nome : "",
    morada : "",
    codigoPostal : "",
    nTelemovel: "",
    idade: "",
    genero: "",
    email: ""

  };
  constructor(
    private _userService : UsersService,
    private _authService : AuthService
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
  this._userService.getUser(this._authService.getUserId())
    .subscribe(
    res => {
      this.user = res.user;
      console.log(this.user);
    },
    err => console.log(err)
  )
  }
  deleteUser(){
    this._userService.deleteUser(this._authService.getUserId())
  }


}
