import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = 'http://localhost/projects/api/todo.php?request=';

  constructor(private http: HttpClient) {}

  getTodos(search: string = '', limit = 5, offset = 0): Observable<any> {
    const params = new HttpParams()
      .set('search', search)
      .set('limit', limit)
      .set('offset', offset);

    return this.http.get(this.baseUrl, { params });
  }

  getTodoById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  addTodo(todo: any): Observable<any> {
    return this.http.post(this.baseUrl, todo);
  }

  updateTodo(id: number, todo: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}`, todo);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}`);
  }
}
