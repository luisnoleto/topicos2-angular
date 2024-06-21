import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { EnderecoDTO, EnderecoResponseDTO } from '../models/enderecoDTO.model';
import { AuthService } from '../services/auth.service';
import { Endereco } from '../models/endereco.model';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  private apiUrl = 'http://localhost:8080/endereco';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getEnderecos(): Observable<EnderecoResponseDTO[]> {
    return this.authService.getUsuarioLogado().pipe(
      switchMap((usuarioLogado) =>
        this.httpClient
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
    return this.httpClient.get<EnderecoDTO>(`${this.apiUrl}/${id}`);
  }

  save(endereco: Endereco): Observable<Endereco> {
    const obj = {
      cep: endereco.cep,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      idCidade: endereco.municipio,
    };
    return this.httpClient.post<Endereco>(
      `${this.apiUrl}/insere-endereco`,
      obj
    );
  }

  update(endereco: EnderecoDTO): Observable<Endereco> {
    const obj = {
      id: endereco.id,
      cep: endereco.cep,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      idCidade: endereco.municipio,
    };
    return this.httpClient.put<Endereco>(
      `${this.apiUrl}/endereco/atualiza-endereco/${this.authService.getUsuarioLogado}/${endereco.id}`,
      obj
    );
  }

  deletar(idEndereco: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/deleta-endereco/${this.authService.getUsuarioLogado}/${idEndereco}`
    );
  }
}
