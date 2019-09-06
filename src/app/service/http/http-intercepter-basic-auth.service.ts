import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{  //1. implementamos HttpInterceptor

  constructor(
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  // 2. creamos un interceptor para setear los headers en todos los request
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // let username = 'cylixx'
    // let password = 'dummy'
    // let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    let username = this.basicAuthenticationService.getAuthenticatedUser();

    if (basicAuthHeaderString && username) {
      request = request.clone({   //clonamos y sobreescribimos el Headers
        setHeaders: {
          Authorization : basicAuthHeaderString
        }
      })
    }

    return next.handle(request);
  }

}
