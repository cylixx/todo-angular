import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

export class HelloWorldBean {
  constructor(public message: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient   //necesario para hacer peticiones a servicio restful
  ) { }

  executeHelloWorldBeanService() {
    // console.log("Execute Hello World Bean Service");
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world-bean`);
  }

  
  executeHelloWorldBeanServiceWithPathVariable(name) {
    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    // let headers = new HttpHeaders({
    //   Authorization : basicAuthHeaderString
    // })

    // console.log("Execute Hello World Bean Service");
    return this.http.get<HelloWorldBean>(
      `${API_URL}/hello-world/path-variable/${name}`
      // , {headers}
    );  //ojo es con el caracter tick `
  }

  // createBasicAuthenticationHttpHeader() {
  //   let username = 'cylixx'
  //   let password = 'dummy'
  //   let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
  //   return basicAuthHeaderString;
  // }

  //XMLHttpRequest cannot load 
  //http://localhost:8080/hello-world/path-variable/cylixx. 
  //Redirect from 'http://localhost:8080/hello-world/path-variable/cylixx' to 'http://localhost:8080/login' 
  //has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. 
  //Origin 'http://localhost:4200' is therefore not allowed access.

  //XMLHttpRequest cannot load http://localhost:8080/hello-world/path-variable/cylixx. 
  //Response for preflight has invalid HTTP status code 401

}
