import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import para confirmar se as passwords são iguais e consequentemente validar
import { MustMatch } from '../must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isSubmitted = false;
  errorMsg = '';

  constructor(private _auth: AuthService,private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      morada: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      nTelemovel: ['', Validators.required],
      idade: ['', Validators.required],
      genero: ['', Validators.required],
      historico: ['', Validators.required],
    }, 
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  registerUser(){
    this.isSubmitted = true;
    
    if(this.registerForm.invalid){
      return;
    }
    this._auth.registerUser(this.registerForm.value)
      .subscribe(
        res =>
        {
          this.router.navigate(['/home'])
        },
        err => this.errorMsg = err.statusText
      )

  }

  onReset() {
    this.isSubmitted = false;
    this.registerForm.reset();
  }
}
