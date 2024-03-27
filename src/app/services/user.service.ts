import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/usuarios';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl);
  }

  findById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`);
  }

  insert(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl, user);
  }

  update(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}/${user.id}`, user);
  }

  delete(user: User): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${user.id}`);
  }

  findByNome(nome: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/search/nome/${nome}`);
  }
}
