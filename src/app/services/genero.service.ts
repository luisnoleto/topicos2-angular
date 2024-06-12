import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genero } from '../models/genero.model';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  private baseUrl = 'http://localhost:8080/generos';

  constructor(private httpClient: HttpClient) {  }

  findAll(page?: number, pageSize?: number): Observable<Genero[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Genero[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
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

  alterarSituacao(genero: Genero): Observable<Genero> {
    return this.httpClient.patch<Genero>(`${this.baseUrl}/alterarSituacao/${genero.id}`,
      genero
    );
  }

}
