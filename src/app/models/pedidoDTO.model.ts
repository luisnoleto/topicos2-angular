import { ItemPedidoDTO } from './itempedidoDTO.model';
import { EnderecoDTO } from './enderecoDTO.model';
import { FormaPagamento } from './formaPagamento.model';
import { StatusPedido } from './statusPedido.model';
export interface PedidoDTO {
  id?: number;
  endereco?: EnderecoDTO;
  enderecoId: number;
  pagamentoId: number;
  itens: ItemPedidoDTO[];
  totalPedido: number;
  pagamento: FormaPagamento;
  statusPedido: StatusPedido;
  dataCompra: Date;
}
