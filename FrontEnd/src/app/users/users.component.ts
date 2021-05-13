import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [];
  userId : string;

  constructor(private _usersService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this._usersService.getUsers()
    .subscribe(
      res => {
        this.users = res.users;
        for (let index = 0; index < this.users.length; index++) {
          this.users[index] = this.users[index].user;
        }
        console.log(this.users);
      },
      err => console.log(err)
    )
  }

  deleteUser(id : string){
    this._usersService.deleteUser(id)
      .subscribe();
    this.getUsers()

  }
  getIdForUpdate(id: string){
    this.userId = id;
  }


  updateUser(updateUserData : Object){
      this._usersService.updateUser(this.userId, updateUserData)
        .subscribe(
          res => console.log(res),
          err => console.log(err)
        )
      };

  setIdTeste(id:string){
    localStorage.setItem('idTeste', id)
  }
}


