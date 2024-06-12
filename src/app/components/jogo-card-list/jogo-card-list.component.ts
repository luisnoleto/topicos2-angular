import { Component, OnInit, signal } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardTitle,
} from '@angular/material/card';
import { CarrinhoService } from '../../services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Jogo } from '../../models/jogo.model';
import { JogoService } from '../../services/jogo.service';

// tipo personalizado de dados, como classes e interfaces, porém mais simples.
type Card = {
  idJogo: number;
  titulo: string;
  preco: number;
  urlImagem: string;
};

@Component({
  selector: 'app-jogo-card-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatCardFooter,
    NgFor,
    MatButton,
  ],
  templateUrl: './jogo-card-list.component.html',
  styleUrl: './jogo-card-list.component.css',
})
export class JogoCardListComponent implements OnInit {
  cards = signal<Card[]>([]);
  jogos: Jogo[] = [];

  constructor(
    private jogoService: JogoService,
    private carrinhoService: CarrinhoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarJogos();
  }

  carregarJogos() {
    // buscando todos as jogos
    this.jogoService.findAll(0, 10).subscribe((data) => {
      this.jogos = data;
      this.carregarCards();
    });
  }

  carregarCards() {
    const cards: Card[] = [];
    this.jogos.forEach((jogo) => {
      cards.push({
        idJogo: jogo.id,
        titulo: jogo.nome,
        preco: jogo.preco,
        urlImagem: this.jogoService.getUrlImagem(jogo.nomeImagem),
      });
    });
    this.cards.set(cards);
  }

  adicionarAoCarrinho(card: Card) {
    this.showSnackbarTopPosition('Produto adicionado ao carrinho!', 'Fechar');
    this.carrinhoService.adicionar({
      id: card.idJogo,
      nome: card.titulo,
      preco: card.preco,
      quantidade: 1,
    });
  }

  showSnackbarTopPosition(content: any, action: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
