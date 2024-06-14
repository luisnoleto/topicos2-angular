import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipio } from '../models/municipio.model';

@Injectable({
  providedIn: 'root',
})
export class MunicipioService {
  private baseUrl = 'http://localhost:8080/cidades';

  constructor(private httpClient: HttpClient) {}

  findAll(page?: number, pageSize?: number): Observable<Municipio[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString(),
      };
    }

    return this.httpClient.get<Municipio[]>(`${this.baseUrl}`, { params });
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Municipio> {
    return this.httpClient.get<Municipio>(`${this.baseUrl}/${id}`);
  }

  insert(municipio: Municipio): Observable<Municipio> {
    const data = {
      nome: municipio.nome,
      idEstado: municipio.estado.id,
    };
    return this.httpClient.post<Municipio>(this.baseUrl, data);
  }

  update(municipio: Municipio): Observable<Municipio> {
    const data = {
      nome: municipio.nome,
      idEstado: municipio.estado.id,
    };
    return this.httpClient.put<Municipio>(
      `${this.baseUrl}/${municipio.id}`,
      data
    );
  }

  delete(municipio: Municipio): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${municipio.id}`);
  }
}
