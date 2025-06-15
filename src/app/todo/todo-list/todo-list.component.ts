import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';

import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';
import { TodoService } from '../../core/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'startDate',
    'endDate',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>([]);
  data: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  search: string = '';
  limit: number = 5;
  offset: number = 0;
  totalRows: number = 0;

  constructor(private dialog: MatDialog, private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getTodos() {
    this.todoService
      .getTodos(this.search, this.limit, this.offset)
      .subscribe((res: any) => {
        this.data = res.data;
        this.totalRows = res.total;
        this.dataSource.data = this.data;
      });
  }

  applyFilter(event: Event) {
    this.search = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.offset = 0;
    this.getTodos();
  }

  onPaginateChange(event: PageEvent) {
    this.limit = event.pageSize;
    this.offset = event.pageIndex * event.pageSize;
    this.getTodos();
  }

  addTodo() {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, { data: null });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.todoService.addTodo(result).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Added successfully!',
            confirmButtonText: 'OK',
          }).then(() => {
            this.getTodos();
          });
        });
      }
    });
  }

  editTodo(todo: any) {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      data: { todo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.todoService.updateTodo(todo.id, result).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Updated successfully!',
            confirmButtonText: 'OK',
          }).then(() => {
            this.getTodos();
          });
        });
      }
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => this.getTodos());
  }
}
