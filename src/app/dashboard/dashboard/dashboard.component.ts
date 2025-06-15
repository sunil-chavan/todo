import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  todoCount = 0;
  lastLogin = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.todoCount = 12;
    this.lastLogin =
      localStorage.getItem('loginTime') || new Date().toLocaleString();
  }

  goToTodoList(): void {
    this.router.navigate(['/todo-list']);
  }
}
