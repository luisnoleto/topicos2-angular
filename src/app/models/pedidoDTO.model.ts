import { ItemPedidoDTO } from './itempedidoDTO.model';

export interface PedidoDTO {
  endereco: number; // ID of the selected address
  pagamento: number; // Payment method
  itens: ItemPedidoDTO[];
}
