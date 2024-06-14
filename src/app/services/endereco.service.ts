import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { EnderecoDTO } from '../models/enderecoDTO.model';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  private apiUrl = 'http://localhost:8080/endereco';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getEnderecos(): Observable<{ id: number; endereco: string }[]> {
    return this.authService.getUsuarioLogado().pipe(
      switchMap((usuarioLogado) =>
        this.http
          .get<EnderecoDTO[]>(`${this.apiUrl}/usuario/${usuarioLogado?.id}`)
          .pipe(
            map((enderecos) =>
              enderecos.map((endereco) => ({
                id: endereco.id,
                endereco: `${endereco.logradouro}, ${endereco.numero}, ${
                  endereco.bairro
                }, Cidade: ${(endereco.idCidade as any).nomeCidade}, CEP: ${
                  endereco.cep
                }`,
              }))
            )
          )
      )
    );
  }
}
