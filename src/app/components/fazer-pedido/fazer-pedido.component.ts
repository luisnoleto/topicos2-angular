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
  ],
  templateUrl: './fazer-pedido.component.html',
  styleUrls: ['./fazer-pedido.component.css'],
})
export class FazerPedidoComponent implements OnInit {
  carrinhoItens: ItemCarrinho[] = [];
  updatedCarrinhoItens: any[] = [];
  enderecos: string[] = ['Quadra 1204 sul alameda 16, 38 O 06']; // Example addresses

  constructor(
    private carrinhoService: CarrinhoService,
    private jogoService: JogoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe((itens) => {
      this.carrinhoItens = itens;
      this.updateCartItemsWithImages(itens);
    });
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

  continuarPagamento(): void {
    this.router.navigate(['/finalizar-pedido/pagamento']);
  }
}
