import { ItemPedidoDTO } from './itempedidoDTO.model';

export interface criarPedidoDTO {
  endereco: number;
  pagamento: number;
  itens: ItemPedidoDTO[];
  totalPedido: number;
}
