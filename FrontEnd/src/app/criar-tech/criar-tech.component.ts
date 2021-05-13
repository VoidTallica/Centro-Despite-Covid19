import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-tech',
  templateUrl: './criar-tech.component.html',
  styleUrls: ['./criar-tech.component.css']
})

/**
 * Classe que contém todos as funções que permitem criar um técnico
 * @author Paulo Gonçalves
 * @author Ruben Freitas
*/
 
export class CriarTechComponent implements OnInit {

  createTechForm: FormGroup;
  isSubmitted  =  false;
  errorMsg = '';

  constructor(private _auth: AuthService,private route: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createTechForm  =  this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      nome: ['', Validators.required],
  });
  }
  
  /*
  * Getter para ter fácil acesso aos form fields
  */
  get f() { return this.createTechForm.controls; }

  /**
   * Permite registar técnicos, utilizando o authService e caso 
   * os form fields sejam válidos
   * @see this._auth.registerTech() utiliza o auth-service para os métodos HTTP
  */
  registerTech(){
    this.isSubmitted = true;
    
    if(this.createTechForm.invalid){
      return;
    }
    this._auth.registerTech(this.createTechForm.value)
    .subscribe(
      res => {console.log(res),
      this.route.navigate(['/home'])
    },
      err => console.log(err)
    )
  }

  /**
   * Permite dar reset aos form fields 
  */
  onReset() {
    this.isSubmitted = false;
    this.createTechForm.reset();
  }

}
