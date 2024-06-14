import { ItemPedidoDTO } from './itempedidoDTO.model';
import { EnderecoDTO } from './enderecoDTO.model';
export interface PedidoDTO {
  id?: number;
  endereco?: EnderecoDTO;
  enderecoId: number;
  pagamento: number;
  itens: ItemPedidoDTO[];
  totalPedido: number;
}
