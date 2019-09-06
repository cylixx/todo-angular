import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number
  todo: Todo

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,  //para poder acceder a los parametros del request
    private router: Router   //para poder acceder a las rutas de los componentes que hemos creado
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];   //obtiene parametro de la URL
    this.todo =  new Todo(this.id, '', false, new Date());  //inicializamos la variable 'todo' para que no de error al render ya que es null al inicio.

    if(this.id != -1) {  //si ID diferente de -1, entonces recupera informacion con ese ID
      this.todoService.retrieveTodo('cylixx', this.id).subscribe(
        data => this.todo = data
      )
    }  
  }

  saveTodo() {
    if (this.id == -1) {
        //Create Todo
        this.todoService.createTodo('cylixx', this.todo).subscribe(
          data => { 
            console.log(data);
            this.router.navigate(['todos'])
          }
        )
    } else {
        //Update Todo
        this.todoService.updateTodo('cylixx', this.id, this.todo).subscribe(
          data => { 
            console.log(data);
            this.router.navigate(['todos'])
          }
        )
    }
  }

}
