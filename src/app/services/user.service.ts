import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { PerfilDTO } from '../models/perfildto.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/usuarios';

  private adminUrl = 'http://localhost:8080/usuariologado';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl);
  }

  findById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`);
  }

  meusDados(): Observable<User> {
    return this.httpClient.get<User>(`${this.adminUrl}/meusdados`);
  }

  insert(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/cadastro`, user);
  }

  update(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}/${user.id}`, user);
  }

  delete(user: User): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${user.id}`);
  }

  findByNome(nome: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/search/nome/${nome}`);
  }
  alterarSenha(senhaAtual: String, novaSenha: String): Observable<User> {
    return this.httpClient.patch<User>(`${this.adminUrl}/alterar/senha`, {
      senhaAtual,
      novaSenha,
    });
  }
  findAllPerfis(): Observable<PerfilDTO[]> {
    return this.httpClient.get<PerfilDTO[]>(`${this.adminUrl}/perfis`);
  }

  cadastrarUsuario(user: User): Observable<User> {
    const userToSend = { ...user, perfil: user.perfil ? user.perfil.id : null };
    return this.httpClient.post<User>(`${this.adminUrl}/cadastro`, user);
  }

  perfilNome(login: string): Observable<PerfilDTO> {
    return this.httpClient.get<PerfilDTO>(
      `${this.baseUrl}/perfilNome/${login}`
    );
  }
  alterarNome(senhaAtual: String, novoNome: String): Observable<User> {
    return this.httpClient.patch<User>(`${this.adminUrl}/alterar/nome`, {
      senhaAtual,
      novoNome,
    });
  }

  alterarEmail(senhaAtual: String, novoEmail: String): Observable<User> {
    return this.httpClient.patch<User>(`${this.adminUrl}/alterar/email`, {
      senhaAtual,
      novoEmail,
    });
  }

  alterarCpf(senhaAtual: String, novoCpf: String): Observable<User> {
    return this.httpClient.patch<User>(`${this.adminUrl}/alterar/cpf`, {
      senhaAtual,
      novoCpf,
    });
  }
}
