import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoDTO } from '../models/pedidoDTO.model';
import { ItemPedidoDTO } from '../models/itempedidoDTO.model';
import { JogoService } from './jogo.service';
import { Jogo } from '../models/jogo.model';
import { EnderecoDTO } from '../models/enderecoDTO.model';
import { criarPedidoDTO } from '../models/criarPedidoDTO.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private baseUrl = 'http://localhost:8080/pedidos';

  private jogosUrl = 'http://localhost:8080/jogos';

  private enderecosUrl = 'http://localhost:8080/endereco';

  constructor(
    private httpClient: HttpClient,
    private jogoService: JogoService
  ) {}

  getAll(): Observable<PedidoDTO[]> {
    return this.httpClient.get<PedidoDTO[]>(this.baseUrl);
  }

  getJogoById(id: number): Observable<Jogo> {
    return this.httpClient.get<Jogo>(`${this.jogosUrl}/${id}`);
  }

  getEnderecoById(id: number): Observable<EnderecoDTO> {
    return this.httpClient.get<EnderecoDTO>(`${this.enderecosUrl}/${id}`);
  }

  getByUsuarioId(usuarioId: number): Observable<PedidoDTO[]> {
    return this.httpClient.get<PedidoDTO[]>(
      `${this.baseUrl}/usuario/${usuarioId}`
    );
  }

  createPedido(pedidoDTO: criarPedidoDTO): Observable<PedidoDTO> {
    return this.httpClient.post<PedidoDTO>(
      `${this.baseUrl}/fazendopedido`,
      pedidoDTO
    );
  }

  addItemToPedido(
    pedidoId: number,
    ItemPedidoDTO: ItemPedidoDTO
  ): Observable<PedidoDTO> {
    return this.httpClient.post<PedidoDTO>(
      `${this.baseUrl}/${pedidoId}/items`,
      ItemPedidoDTO
    );
  }

  getPedidoById(pedidoId: number): Observable<PedidoDTO> {
    return this.httpClient.get<PedidoDTO>(`${this.baseUrl}/${pedidoId}`);
  }

  updatePedido(PedidoDTO: PedidoDTO): Observable<PedidoDTO> {
    return this.httpClient.put<PedidoDTO>(
      `${this.baseUrl}/${PedidoDTO}`,
      PedidoDTO
    );
  }

  deletePedido(pedidoId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${pedidoId}`);
  }
}
