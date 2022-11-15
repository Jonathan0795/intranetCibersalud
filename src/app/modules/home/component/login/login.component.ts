import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/core/authentication/auth-model/auth.model';
import { AuthService } from 'src/app/core/authentication/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: Credentials = {
    username: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private router:Router,
    private titulo: Title,
  ) { }

  ngOnInit(): void {
    this.titulo.setTitle('Iniciar sesión');
  }
  login(formulario:NgForm){
    if(formulario.invalid){
      return;
    }
    this.authService.login(this.credentials)
    .subscribe(()=>{
      console.log('login')
      this.router.navigate(['/']);
    })
  }
}
 