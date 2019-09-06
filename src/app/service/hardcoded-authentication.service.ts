import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username, password){
    // console.log('before login: ' + this.isUserLoggedIn());
    if(username==='cylixx' && password==='dummy') {
      sessionStorage.setItem('authenticaterUser', username);
      // console.log('after login: ' + this.isUserLoggedIn());
      return true;
    }
    return false;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticaterUser');
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem('authenticaterUser');
  }

}
