import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogo } from '../models/jogo.model';

@Injectable({
  providedIn: 'root',
})
export class JogoService {
  private baseUrl = 'http://localhost:8080/jogos';

  constructor(private httpClient: HttpClient) {}

  findAll(page?: number, pageSize?: number): Observable<Jogo[]> {
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        size: pageSize.toString(),
        }
    }

    return this.httpClient.get<Jogo[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Jogo> {
    return this.httpClient.get<Jogo>(`${this.baseUrl}/${id}`);
  }

  insert(jogo: Jogo): Observable<Jogo> {
    return this.httpClient.post<Jogo>(this.baseUrl, jogo);
  }

  update(jogo: Jogo): Observable<Jogo> {
    return this.httpClient.put<Jogo>(`${this.baseUrl}/${jogo.id}`, jogo);
  }

  delete(jogo: Jogo): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${jogo.id}`);
  }
}
