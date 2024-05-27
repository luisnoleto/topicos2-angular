import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Desenvolvedora } from '../models/desenvolvedora.model';

@Injectable({
  providedIn: 'root',
})
export class DesenvolvedoraService {
  private baseUrl = 'http://localhost:8080/desenvolvedora';

  constructor(private httpClient: HttpClient) {}

  findAll(page?: number, pageSize?: number): Observable<Desenvolvedora[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Desenvolvedora[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Desenvolvedora> {
    return this.httpClient.get<Desenvolvedora>(`${this.baseUrl}/${id}`);
  }

  insert(desenvolvedora: Desenvolvedora): Observable<Desenvolvedora> {
    return this.httpClient.post<Desenvolvedora>(
      `${this.baseUrl}/cadastro`,
      desenvolvedora
    );
  }

  update(desenvolvedora: Desenvolvedora): Observable<Desenvolvedora> {
    return this.httpClient.put<Desenvolvedora>(
      `${this.baseUrl}/${desenvolvedora.id}`,
      desenvolvedora
    );
  }

  delete(desenvolvedora: Desenvolvedora): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${desenvolvedora.id}`);
  }
}
