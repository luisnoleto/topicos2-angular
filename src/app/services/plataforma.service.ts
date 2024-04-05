import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plataforma } from '../models/plataforma.model';

@Injectable({
  providedIn: 'root',
})
export class PlataformaService {
  private baseUrl = 'http://localhost:8080/plataforma';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Plataforma[]> {
    return this.httpClient.get<Plataforma[]>(this.baseUrl);
  }

  findById(id: string): Observable<Plataforma> {
    return this.httpClient.get<Plataforma>(`${this.baseUrl}/${id}`);
  }

  insert(plataforma: Plataforma): Observable<Plataforma> {
    return this.httpClient.post<Plataforma>(
      `${this.baseUrl}/cadastro`,
      plataforma
    );
  }

  update(plataforma: Plataforma): Observable<Plataforma> {
    return this.httpClient.put<Plataforma>(
      `${this.baseUrl}/${plataforma.id}`,
      plataforma
    );
  }

  delete(plataforma: Plataforma): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${plataforma.id}`);
  }
}
