import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogo } from '../models/jogo.model';

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
      // Return a default image or handle the absence of an image name appropriately
      return './assets/padraosemImagem.jpg'; // Adjust this path to your default image
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
    };
    return this.httpClient.post<Jogo>(`${this.baseUrl}`, obj);
  }
  findById(id: number): Observable<Jogo> {
    return this.httpClient.get<Jogo>(`${this.baseUrl}/${id}`);
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
}
