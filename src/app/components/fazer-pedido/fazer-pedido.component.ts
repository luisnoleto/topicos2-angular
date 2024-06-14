import { Component, OnInit } from '@angular/core';
import { ItemCarrinho } from '../../models/itemcarrinho.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { JogoService } from '../../services/jogo.service';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatCardTitle } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { ItemPedidoDTO } from '../../models/itempedidoDTO.model';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { EnderecoService } from '../../services/endereco.service';
import { criarPedidoDTO } from '../../models/criarPedidoDTO.model';

@Component({
  selector: 'app-fazer-pedido',
  standalone: true,
  imports: [
    MatCard,
    MatButton,
    MatCardTitle,
    MatCardActions,
    MatCardContent,
    CommonModule,
    MatRadioModule,
    FormsModule,
  ],
  templateUrl: './fazer-pedido.component.html',
  styleUrls: ['./fazer-pedido.component.css'],
})
export class FazerPedidoComponent implements OnInit {
  carrinhoItens: ItemCarrinho[] = [];
  updatedCarrinhoItens: any[] = [];
  enderecos: { id: number; endereco: string }[] = [];
  enderecoId!: number;
  pagamento!: number;
  mostrarOpcoesPagamento: boolean = false;

  constructor(
    private carrinhoService: CarrinhoService,
    private jogoService: JogoService,
    private pedidoService: PedidoService,
    private router: Router,
    private enderecoService: EnderecoService
  ) {}

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe((itens) => {
      this.carrinhoItens = itens;
      this.updateCartItemsWithImages(itens);
    });
    this.buscaEnderecos();
  }
  checkCarrinhoStatus() {
    if (this.updatedCarrinhoItens.length === 0) {
      this.router.navigate(['/home']);
    }
  }

  updateCartItemsWithImages(itens: ItemCarrinho[]) {
    const observables = itens.map((item) =>
      this.jogoService.findById(item.id).pipe(
        map((jogo) => ({
          ...item,
          nomeImagem: jogo.nomeImagem,
          urlImagem: this.jogoService.getUrlImagem(jogo.nomeImagem),
        }))
      )
    );

    forkJoin(observables).subscribe((updatedItens) => {
      this.updatedCarrinhoItens = updatedItens;
    });
  }

  removerItem(item: ItemCarrinho): void {
    this.carrinhoService.remover(item);
    this.updateCartItemsWithImages(this.carrinhoService.obter());
  }

  calcularTotal(): number {
    return this.updatedCarrinhoItens.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  }

  insertEndereco(): void {
    this.router.navigate(['/cadastro-enderecos']);
  }

  buscaEnderecos(): void {
    this.enderecoService.getEnderecos().subscribe((enderecos) => {
      this.enderecos = enderecos;
      if (this.enderecos.length > 0) {
        this.enderecoId = this.enderecos[0].id;
      }
    });
  }

  continuarPagamento(): void {
    this.mostrarOpcoesPagamento = true;
  }

  metodoPag(value: number): void {
    this.pagamento = value;
  }

  finalizarPedido(): void {
    if (!this.enderecoId) {
      console.error('Nenhum endereço selecionado');
      return;
    }

    const pedido: criarPedidoDTO = {
      endereco: this.enderecoId,
      pagamento: this.pagamento,
      itens: this.carrinhoItens.map((item) => ({
        idProduto: item.id,
        preco: item.preco,
        quantidade: item.quantidade,
      })),
      totalPedido: this.calcularTotal(),
    };

    this.pedidoService.createPedido(pedido).subscribe({
      next: (response) => {
        console.log('Pedido realizado com sucesso', response);
        this.carrinhoService.removerTudo();
        this.checkCarrinhoStatus();
        this.router.navigate(['/meus-pedidos']);
      },
      error: (error) => {
        console.error('Erro ao realizar pedido', error);
      },
    });
  }
}
