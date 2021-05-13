import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted  =  false;
  errorMsg = '';
  data : Object[]

  constructor(private _auth: AuthService, private route: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm  =  this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
  });
  }

  get f() { return this.loginForm.controls; }

  loginUser(){
    this.isSubmitted = true;
    
    if(this.loginForm.invalid){
      return;
    }

    this._auth.loginUser(this.loginForm.value)
    //this._auth.loginUser(this.loginModel)
    .subscribe(
        res => {
          localStorage.setItem('token', res.token),
          localStorage.setItem('id', res.userId)
          localStorage.setItem('role', this.loginForm.value.role)
          this._auth.setIsLoggedIn();
          this.route.navigate(['/home'])
        },
        err => this.errorMsg = err.statusText
      )
    }
    onReset() {
      this.isSubmitted = false;
      this.loginForm.reset();
    }
    
}


