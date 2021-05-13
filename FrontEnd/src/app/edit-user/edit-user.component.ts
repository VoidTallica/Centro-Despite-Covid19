import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  _id : number;

  editUserForm: FormGroup;
  isSubmitted = false;
  errorMsg = '';

  constructor(private _usersService: UsersService,private formBuilder: FormBuilder,private _authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group({
      email: ['', Validators.email],
      nome: [''],
      morada: [''],
      nTelemovel: [''],
      codigoPostal: [''],
      idade: [''],
      genero: [''],
    });
  }

  get f() { return this.editUserForm.controls; }

  userComponentFunction(){
    this.isSubmitted = true;
    
    if(this.editUserForm.invalid){
      return;
    }
    let newData = []
    if( this.editUserForm.value.email != ""){
        newData.push({ 'propName': "email" , 'value': this.editUserForm.value.email});
      }
    if( this.editUserForm.value.nome != ""){
        newData.push({ 'propName': "nome" , 'value': this.editUserForm.value.nome });
      }
    if( this.editUserForm.value.morada != ""){
        newData.push({ 'propName': "morada" , 'value': this.editUserForm.value.morada });
      }
    if( this.editUserForm.value.nTelemovel != ""){
        newData.push({ 'propName': "nTelemovel" , 'value': this.editUserForm.value.nTelemovel });
      }
    if( this.editUserForm.value.codigoPostal != ""){
        newData.push({ 'propName': "codigoPostal" , 'value': this.editUserForm.value.codigoPostal});
      }
    if( this.editUserForm.value.idade != ""){
        newData.push({ 'propName': "idade" , 'value': this.editUserForm.value.idade });
    }
    if( this.editUserForm.value.genero != ""){
        newData.push({ 'propName': "genero" , 'value': this.editUserForm.value.genero });
    }
    this._usersService.updateUser(this._authService.getUserId() , newData)
        .subscribe(
          res => {
            console.log(res)
            this.router.navigate(['/user'])
          },
          err => {
           console.log(err)
          }
        )
  }

  onReset() {
    this.isSubmitted = false;
    this.editUserForm.reset();
  }
}
