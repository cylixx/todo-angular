import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo {
  constructor(
    public id: number,
    public description: String,
    public done: boolean,
    public targetDate: Date
  ){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  // todo = {
  //   id : 1,
  //   description: 'Learn to dance'
  // }

  // todos = [
  //   {id : 1, description : 'Lear to dance'},
  //   {id : 2, description : 'Beome an expert at Angular'},
  //   {id : 3, description : 'Go to work to USA'}
  // ]

  // todos = [
  //   new Todo(1, 'Lear to dance', false, new Date()),
  //   new Todo(2, 'Beome an expert at Angular', false, new Date()),
  //   new Todo(3, 'Go to work to USA', false, new Date())
  // ]

  todos: Todo[]
  message: String
  

  constructor(
    private todoService: TodoDataService,  //inyectamos servicio a utilizar
    private router: Router   //inyectamos para poder invocar otro componente
  ) { }

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retriveAllTodos('cylixx').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id) {
    console.log(`Delete todo ${id}`); 
    this.todoService.deleteTodo('cylixx', id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} Successful!`;
        this.refreshTodos();
      }
    )
  }

  updateTodo(id) {
    console.log(`update todo ${id}`); 
    this.router.navigate(['todos', id]);
  } 

  addTodo() {
    this.router.navigate(['todos', -1]);
  }

}
