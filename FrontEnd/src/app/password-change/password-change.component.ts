import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';
import {AuthService} from '../auth.service';
import { PwChange } from '../pw-change';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  pwModel = new PwChange("","")

  constructor(
    private _usersService : UsersService,
    private _authService : AuthService
    ) { }

  ngOnInit(): void {
  }

  changePw(){
    if (this.pwModel._password == this.pwModel.password){
      const id = this._authService.getUserId()
      this._usersService.changePw(id , this.pwModel)
        .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
    }
  }

}
