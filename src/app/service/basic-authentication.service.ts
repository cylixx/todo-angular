import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { API_URL } from '../app.constants';

// definimos constantes
export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticaterUser';


@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  // authenticate(username, password){
  //   // console.log('before login: ' + this.isUserLoggedIn());
  //   if(username==='cylixx' && password==='dummy') {
  //     sessionStorage.setItem(AUTHENTICATED_USER, username);
  //     // console.log('after login: ' + this.isUserLoggedIn());
  //     return true;
  //   }
  //   return false;
  // }


  executeJWTAuthenticationService(username, password) {

    // console.log("Execute Hello World Bean Service");
    return this.http.post<any>(
      `${API_URL}/authenticate`, { // Body del post es: username and password
        username,
        password
      }).pipe( //pipe - para hacer algo en caso de exito o de error
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    )
    ;  //ojo es con el caracter tick `
  }

  executeBasicAuthenticationService(username, password) {
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    let headers = new HttpHeaders({
      Authorization : basicAuthHeaderString
    })

    // console.log("Execute Hello World Bean Service");
    return this.http.get<AuthenticationBean>(
      `${API_URL}/basicauth`, 
      {headers}
    ).pipe( //pipe - para hacer algo en caso de exito o de error
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        }
      )
    )
    ;  //ojo es con el caracter tick `
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

}

export class AuthenticationBean {
  constructor(public message: string) {}
}
