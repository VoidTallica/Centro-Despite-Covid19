import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-tech',
  templateUrl: './edit-tech.component.html',
  styleUrls: ['./edit-tech.component.css']
})
export class EditTechComponent implements OnInit {
  
  editTechForm: FormGroup;
  isSubmitted = false;
  errorMsg = '';

  constructor(private _userService : UsersService,private formBuilder: FormBuilder, private _authService : AuthService, private router: Router) { }

  ngOnInit(): void {
    this.editTechForm = this.formBuilder.group({
      email: ['', Validators.email],
      nome: ['']
    });
  }

  get f() { return this.editTechForm.controls; }

  updateTech(){

    let newData = []
    if( this.editTechForm.value.email != ""){
        newData.push({ 'propName': "email" , 'value': this.editTechForm.value.email});
      }
    if( this.editTechForm.value.nome != ""){
        newData.push({ 'propName': "nome" , 'value': this.editTechForm.value.nome });
      }

    if(this._authService.getRole() == "Tech" ){
      this._userService.updateTech(this._authService.getUserId() , newData)
        .subscribe(
          res => {
            console.log(res)
            this.router.navigate(['/tech'])
          },
          err => {
           console.log(err)
          }
        )
    }
    else if (this._authService.getRole() == "Admin"){
      this._userService.updateTech(this._userService.getIdTechUpdate() , newData)
        .subscribe(
          res => {
          console.log(res)
          this.router.navigate(['/techs'])
          },
          err => {
            console.log(err)
          }
    )
    }
  }

  onReset() {
    this.isSubmitted = false;
    this.editTechForm.reset();
  }
}
