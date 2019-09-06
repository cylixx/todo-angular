import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';
// import { AppComponent } from '../app.component';   //podemos importar clases de otros componentes

@Component({   //Este es un Decorator similar a las anotaciones en Java
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {   //export(para usar afuera de este modulo) es el equivalente al public en Java

  message = 'Some message from welcome module'
  welcomeMessageFromService: string
  name = ''

  //Inyectamos ActivatedRoute
  constructor(
    private route:ActivatedRoute,
    private service: WelcomeDataService
    ) { }

  ngOnInit() {
    //COMPILATION ERROR  this.message = 5
    //console.log(this.message);
    // console.log(this.route.snapshot.params['name'])
    this.name = this.route.snapshot.params['name']  //obtiene parametro de la URL
  }

  getWelcomeMessage() {
    // console.log(this.service.executeHelloWorldBeanService());
    /*
    llamdo Asincrono, realizas la invocacion pero continuas con la ejecucion, la invocacion continua y por lo general se define un callback 
    (o sea algun metodo o funcion) que recibira la respuesta o el error para toamr alguna accion pero en este ultimo la ejecucion 
    no se queda esperando la respuesta continua sin bloquear la ejecucion del hilo actual.
    */
    this.service.executeHelloWorldBeanService().subscribe(    //Asyncronus call,  subscribe: nevesario para que se pueda ejecutar el request
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
      // response => console.log(response.message)
    ); 
    console.log("last line of getWelcomeMessage"); 
    // console.log("get welcome message");
  }

  getWelcomeMessageWithParameter() {

    this.service.executeHelloWorldBeanServiceWithPathVariable(this.name).subscribe(    //Asyncronus call,  subscribe: nevesario para que se pueda ejecutar el request
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
      // response => console.log(response.message)
    ); 
    console.log("last line of getWelcomeMessage"); 
    // console.log("get welcome message");
  }

  handleSuccessfulResponse(response) {
    this.welcomeMessageFromService = response.message
    // console.log(response);
    // console.log(response.message);
  }

  handleErrorResponse(error) {
    // console.log(error);
    // console.log(error.error);
    // console.log(error.error.message);
    this.welcomeMessageFromService = error.error.message
  }


}
