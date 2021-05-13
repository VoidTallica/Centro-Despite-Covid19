import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _authService : AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn()
  }

  isLoggedIn(){
    return this._authService.getIsLoggedIn()
  }
  logout(){
    this._authService.logout()
  }

  getRole(){
    return this._authService.getRole();
  }

}
