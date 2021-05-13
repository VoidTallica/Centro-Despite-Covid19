import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {

  createTesteForm: FormGroup;
  isSubmitted = false;
  a = '';

  constructor(private _userService : UsersService,private formBuilder: FormBuilder, private route : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('idTeste')){
      this.a =localStorage.getItem('idTeste');
      console.log(this.a);
    }

    this.createTesteForm = this.formBuilder.group({
      userID: [this.a,Validators.required],
      resultado: ['',Validators.required],
      data: ['',Validators.required]
    });
  }

  get f() { return this.createTesteForm.controls; }

  testUpdate(){
    this.isSubmitted = true;
    
    if(this.createTesteForm.invalid){
      return;
    }
    this._userService.editTeste(this.createTesteForm.value.userID, this.createTesteForm.value)
    .subscribe(
      res=> {
        console.log(res),
        localStorage.removeItem('idTeste'),
        this.route.navigate(['/users'])
      },
      err=> console.log(err)
    )
  }

  onReset() {
    this.isSubmitted = false;
    this.createTesteForm.reset();
  }

}
