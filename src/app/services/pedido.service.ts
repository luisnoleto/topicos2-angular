import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';
import { ItemPedido } from '../models/itempedido.model';
import { JogoService } from './jogo.service';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private baseUrl = 'http://your-api-url.com/pedidos';

  constructor(
    private httpClient: HttpClient,
    private jogoService: JogoService
  ) {}

  createPedido(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.post<Pedido>(this.baseUrl, pedido);
  }

  addItemToPedido(
    pedidoId: number,
    itemPedido: ItemPedido
  ): Observable<Pedido> {
    return this.httpClient.post<Pedido>(
      `${this.baseUrl}/${pedidoId}/items`,
      itemPedido
    );
  }

  getPedidoById(pedidoId: number): Observable<Pedido> {
    return this.httpClient.get<Pedido>(`${this.baseUrl}/${pedidoId}`);
  }

  updatePedido(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.put<Pedido>(`${this.baseUrl}/${pedido.id}`, pedido);
  }

  deletePedido(pedidoId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${pedidoId}`);
  }
}
