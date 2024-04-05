import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais.model';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private baseUrl = 'http://localhost:8080/pais';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Pais[]> {
    return this.httpClient.get<Pais[]>(this.baseUrl);
  }

  findById(id: string): Observable<Pais> {
    return this.httpClient.get<Pais>(`${this.baseUrl}/${id}`);
  }

  insert(pais: Pais): Observable<Pais> {
    return this.httpClient.post<Pais>(`${this.baseUrl}/cadastro`, pais);
  }

  update(pais: Pais): Observable<Pais> {
    return this.httpClient.put<Pais>(`${this.baseUrl}/${pais.id}`, pais);
  }

  delete(pais: Pais): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${pais.id}`);
  }
}
