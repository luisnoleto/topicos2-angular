import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemCarrinho } from '../../models/itemcarrinho.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { JogoService } from '../../services/jogo.service';
import { MatCard } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { forkJoin, map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatButtonModule,
  ],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {
  carrinhoItens: ItemCarrinho[] = [];
  updatedCarrinhoItens: any[] = [];

  constructor(
    private carrinhoService: CarrinhoService,
    private jogoService: JogoService
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
          urlImagem: this.carrinhoService.getUrlImagem(jogo.nomeImagem),
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

  finalizarCompra(): void {
    // Finalizar compra logic
  }

  calcularTotal(): number {
    return this.updatedCarrinhoItens.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  }
}
