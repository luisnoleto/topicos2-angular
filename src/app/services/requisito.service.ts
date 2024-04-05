import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requisito } from '../models/requisitos.model';
import { Desempenho } from '../models/desempenho.model';

@Injectable({
  providedIn: 'root'
})
export class RequisitoService {
  private baseUrl = 'http://localhost:8080/requisitos';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<Requisito[]> {
    return this.httpClient.get<Requisito[]>(this.baseUrl);
  }

  findByDesempenho(): Observable<Requisito[]> {
    return this.httpClient.get<Requisito[]>(`${this.baseUrl}/desempenho/${Desempenho}`);
  }

  findById(id: string): Observable<Requisito> {
    return this.httpClient.get<Requisito>(`${this.baseUrl}/${id}`);
  }

  insert(Requisito: Requisito): Observable<Requisito> {
    return this.httpClient.post<Requisito>(this.baseUrl, Requisito);
  }
  
  update(Requisito: Requisito): Observable<Requisito> {
    return this.httpClient.put<Requisito>(`${this.baseUrl}/${Requisito.id}`, Requisito);
  }

  delete(Requisito: Requisito): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${Requisito.id}`);
  }

}
