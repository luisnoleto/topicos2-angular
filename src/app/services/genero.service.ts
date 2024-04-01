import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genero } from '../models/genero.model';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  private baseUrl = 'http://localhost:8080/Generos';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<Genero[]> {
    return this.httpClient.get<Genero[]>(this.baseUrl);
  }

  findById(id: string): Observable<Genero> {
    return this.httpClient.get<Genero>(`${this.baseUrl}/${id}`);
  }

  insert(Genero: Genero): Observable<Genero> {
    return this.httpClient.post<Genero>(this.baseUrl, Genero);
  }
  
  update(Genero: Genero): Observable<Genero> {
    return this.httpClient.put<Genero>(`${this.baseUrl}/${Genero.id}`, Genero);
  }

  delete(Genero: Genero): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${Genero.id}`);
  }

}
