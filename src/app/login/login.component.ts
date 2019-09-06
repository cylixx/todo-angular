import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'cylixx'   //component property
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidLogin = false

  //Get instance of Router
  //Angular.giveMeRouter
  //Dependency Injection
  constructor(private router: Router,   //inyectamos Router para poder utilizarlo en este modulo
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService) {   //inyectamos el servicio para Autenticar que creamos

    }   

  ngOnInit() {
  }

  // Component event
  handleLogin() {
    // console.log(this.username);
    // if(this.username==='cylixx' && this.password==='dummy') {
    if(this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
      this.router.navigate(['welcome', this.username]);  //Redirect to Welcome Page
      this.invalidLogin = false
    } else{
      this.invalidLogin = true
    }

  }

  handleBasicAuthLogin() {
    // if(this.username==='cylixx' && this.password==='dummy') {
      this.basicAuthenticationService.executeBasicAuthenticationService(this.username, this.password).subscribe(
        data => {
          console.log(data)
          this.router.navigate(['welcome', this.username])
          this.invalidLogin = false;
        },
        error => {
          console.log(error)
          this.invalidLogin = true
        }
      )

  }

  handleJWTAuthLogin() {
      this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password).subscribe(
        data => {
          console.log(data)
          this.router.navigate(['welcome', this.username])
          this.invalidLogin = false;
        },
        error => {
          console.log(error)
          this.invalidLogin = true
        }
      )

  }


}
