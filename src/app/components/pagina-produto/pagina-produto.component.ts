import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JogoService } from '../../services/jogo.service';
import { Jogo } from '../../models/jogo.model';
import { JogoCardListComponent } from '../jogo-card-list/jogo-card-list.component';
import { MatCard } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { CarrinhoService } from '../../services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pagina-produto',
  standalone: true,
  imports: [JogoCardListComponent, MatCard, MatCardContent, CommonModule, NgIf],
  templateUrl: './pagina-produto.component.html',
  styleUrls: ['./pagina-produto.component.css'],
})
export class PaginaProdutoComponent implements OnInit {
  jogo: Jogo | undefined;

  constructor(
    private route: ActivatedRoute,
    private jogoService: JogoService,
    private carrinhoService: CarrinhoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const jogoId = Number(this.route.snapshot.paramMap.get('id'));
    if (jogoId) {
      this.jogoService.findById(jogoId).subscribe(
        (jogo: Jogo) => {
          this.jogo = jogo;
          console.log('Jogo carregado:', jogo);
        },
        (error) => {
          console.error('Erro ao carregar jogo:', error);
        }
      );
    } else {
      console.warn('JogoId inválido:', jogoId);
    }
  }

  adicionarAoCarrinho(jogo: Jogo) {
    this.showSnackbarTopPosition('Produto adicionado ao carrinho!', 'Fechar');
    if (this.jogo) {
      this.carrinhoService.adicionar({
        id: this.jogo.id,
        nome: this.jogo.nome,
        preco: this.jogo.preco,
        quantidade: 1,
      });
    }
  }

  showSnackbarTopPosition(content: any, action: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
