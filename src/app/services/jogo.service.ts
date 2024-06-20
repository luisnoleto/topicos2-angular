import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Jogo } from '../models/jogo.model';
import { Classificacao } from '../models/classificacao.model';

@Injectable({
  providedIn: 'root',
})
export class JogoService {
  private baseUrl = 'http://localhost:8080/jogos';

  constructor(private httpClient: HttpClient) {}

  findAll(page?: number, pageSize?: number): Observable<Jogo[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString(),
      };
    }

    return this.httpClient.get<Jogo[]>(`${this.baseUrl}`, { params });
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }
  countByNome(nome: string): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/search/${nome}/count`);
  }

  getUrlImagem(nomeImagem: string): string {
    if (!nomeImagem) {
      return './assets/padraosemImagem.jpg';
    }
    return `${this.baseUrl}/image/download/${nomeImagem}`;
  }

  uploadImagem(id: number, nomeImagem: string, imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('nomeImagem', imagem.name);
    formData.append('imagem', imagem, imagem.name);

    return this.httpClient.patch<Jogo>(
      `${this.baseUrl}/image/upload`,
      formData
    );
  }

  save(jogo: Jogo): Observable<Jogo> {
    const obj = {
      nome: jogo.nome,
      preco: jogo.preco,
      descricao: jogo.descricao,
      idDesenvolvedora: jogo.desenvolvedora,
      listaIdGeneros: [jogo.genero],
      idPlataforma: jogo.plataforma,
      classificacao: jogo.classificacao,
      processador: jogo.processador,
      memoria: jogo.memoria,
      placaVideo: jogo.placaVideo,
      sistemaOperacional: jogo.sistemaOperacional,
      armazenamento: jogo.armazenamento,
      estoque: jogo.estoque,
    };
    return this.httpClient.post<Jogo>(`${this.baseUrl}`, obj);
  }

  findById(id: number): Observable<Jogo> {
    return this.httpClient.get<Jogo>(`${this.baseUrl}/${id}`).pipe(
      map((jogo: any) => {
        return {
          ...jogo,
          classificacao: this.mapClassificacao(jogo.classificacao),
        };
      })
    );
  }

  findByNome(
    nome: string,
    pagina: number,
    tamanhoPagina: number
  ): Observable<Jogo[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString(),
    };
    return this.httpClient.get<Jogo[]>(`${this.baseUrl}/search/${nome}`, {
      params,
    });
  }

  insert(jogo: Jogo): Observable<Jogo> {
    return this.httpClient.post<Jogo>(this.baseUrl, jogo);
  }

  update(jogo: Jogo): Observable<Jogo> {
    return this.httpClient.put<Jogo>(`${this.baseUrl}/${jogo.id}`, jogo);
  }

  delete(jogo: Jogo): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${jogo.id}`);
  }

  alterarSituacao(jogo: Jogo): Observable<Jogo> {
    return this.httpClient.patch<Jogo>(
      `${this.baseUrl}/alterarSituacao/${jogo.id}`,
      jogo
    );
  }

  mapClassificacao(classificacao: any): Classificacao {
    switch (classificacao.label) {
      case 'Livre':
        return Classificacao.LIVRE;
      case '10 anos':
        return Classificacao.DEZ_ANOS;
      case '12 anos':
        return Classificacao.DOZE_ANOS;
      case '14 anos':
        return Classificacao.QUATORZE_ANOS;
      case '16 anos':
        return Classificacao.DEZESSEIS_ANOS;
      case '18 anos':
        return Classificacao.DEZOITO_ANOS;
      default:
        return Classificacao.LIVRE;
    }
  }
}
