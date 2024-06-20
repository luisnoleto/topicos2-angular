import { ItemPedidoDTO } from './itempedidoDTO.model';
import { EnderecoDTO } from './enderecoDTO.model';
import { FormaPagamento } from './formaPagamento.model';
export interface PedidoDTO {
  id?: number;
  endereco?: EnderecoDTO;
  enderecoId: number;
  pagamentoId: number;
  itens: ItemPedidoDTO[];
  totalPedido: number;
  pagamento: FormaPagamento;
}
