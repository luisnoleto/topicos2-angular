import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fabricante } from '../models/fabricante.model';

@Injectable({
  providedIn: 'root',
})
export class FabricanteService {
  private baseUrl = 'http://localhost:8080/fabricantes';

  constructor(private httpClient: HttpClient) {}

  findAll(page?: number, pageSize?: number): Observable<Fabricante[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Fabricante[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Fabricante> {
    return this.httpClient.get<Fabricante>(`${this.baseUrl}/${id}`);
  }

  insert(fabricante: Fabricante): Observable<Fabricante> {
    return this.httpClient.post<Fabricante>(
      `${this.baseUrl}`,
      fabricante
    );
  }

  update(Fabricante: Fabricante): Observable<Fabricante> {
    return this.httpClient.put<Fabricante>(
      `${this.baseUrl}/${Fabricante.id}`,
      Fabricante
    );
  }

  delete(Fabricante: Fabricante): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${Fabricante.id}`);
  }
}
