import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fabricante } from '../models/fabricante.model';

@Injectable({
  providedIn: 'root'
})
export class FabricanteService {
  private baseUrl = 'http://localhost:8080/fabricantes';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<Fabricante[]> {
    return this.httpClient.get<Fabricante[]>(this.baseUrl);
  }

  findById(id: string): Observable<Fabricante> {
    return this.httpClient.get<Fabricante>(`${this.baseUrl}/${id}`);
  }

  insert(Fabricante: Fabricante): Observable<Fabricante> {
    return this.httpClient.post<Fabricante>(this.baseUrl, Fabricante);
  }
  
  update(Fabricante: Fabricante): Observable<Fabricante> {
    return this.httpClient.put<Fabricante>(`${this.baseUrl}/${Fabricante.id}`, Fabricante);
  }

  delete(Fabricante: Fabricante): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${Fabricante.id}`);
  }

}
