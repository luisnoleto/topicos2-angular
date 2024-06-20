import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { EnderecoDTO, EnderecoResponseDTO } from '../models/enderecoDTO.model';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  private apiUrl = 'http://localhost:8080/endereco';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getEnderecos(): Observable<EnderecoResponseDTO[]> {
    return this.authService.getUsuarioLogado().pipe(
      switchMap((usuarioLogado) =>
        this.http
          .get<EnderecoResponseDTO[]>(
            `${this.apiUrl}/usuario/${usuarioLogado?.id}`
          )
          .pipe(
            map((enderecos) =>
              enderecos.map((endereco) => ({
                id: endereco.id,
                logradouro: endereco.logradouro,
                numero: endereco.numero,
                bairro: endereco.bairro,
                cep: endereco.cep,
                complemento: endereco.complemento,
                idCidade: endereco.idCidade,
                idEstado: endereco.idEstado,
                nomeEstado: endereco.nomeEstado,
                nomeCidade: endereco.nomeCidade,
              }))
            )
          )
      )
    );
  }

  getEnderecoById(id: number): Observable<EnderecoDTO> {
    return this.http.get<EnderecoDTO>(`${this.apiUrl}/${id}`);
  }

  insertEndereco(endereco: EnderecoDTO): Observable<EnderecoDTO> {
    return this.authService
      .getUsuarioLogado()
      .pipe(
        switchMap((usuarioLogado) =>
          this.http.post<EnderecoDTO>(
            `${this.apiUrl}/insere-endereco`,
            endereco
          )
        )
      );
  }
}
