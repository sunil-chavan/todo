import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';

export const TODO_ROUTES: Routes = [
  {
    path: '',
    component: TodoListComponent,
  },
];
