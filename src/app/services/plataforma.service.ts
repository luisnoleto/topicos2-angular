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

  findAll(page?: number, pageSize?: number): Observable<Plataforma[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Plataforma[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
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

  alterarSituacao(plataforma: Plataforma): Observable<Plataforma> {
    return this.httpClient.patch<Plataforma>(`${this.baseUrl}/alterarSituacao/${plataforma.id}`,
      plataforma
    );
  }

  findByAtivo(ativo: boolean): Observable<Plataforma[]> {
    return this.httpClient.get<Plataforma[]>(`${this.baseUrl}/search/ativo/${ativo}`);
  }
}
