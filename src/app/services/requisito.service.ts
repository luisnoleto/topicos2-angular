import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requisito } from '../models/requisitos.model';

import { DesempenhoDTO } from '../models/desempenhoDTO.model';

@Injectable({
  providedIn: 'root'
})
export class RequisitoService {
  private baseUrl = 'http://localhost:8080/requisitos';

  constructor(private httpClient: HttpClient) {  }

  findAll(page?: number, pageSize?: number): Observable<Requisito[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Requisito[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
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

  findAllPerfis(): Observable<DesempenhoDTO[]> {
    return this.httpClient.get<DesempenhoDTO[]>(`${this.baseUrl}/desempenhos`);
  }
}
