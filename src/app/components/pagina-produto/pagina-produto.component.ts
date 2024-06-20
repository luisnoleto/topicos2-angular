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
import { MatButton } from '@angular/material/button';
import { Classificacao } from '../../models/classificacao.model';

@Component({
  selector: 'app-pagina-produto',
  standalone: true,
  imports: [
    JogoCardListComponent,
    MatCard,
    MatCardContent,
    CommonModule,
    NgIf,
    MatButton,
  ],
  templateUrl: './pagina-produto.component.html',
  styleUrls: ['./pagina-produto.component.css'],
})
export class PaginaProdutoComponent implements OnInit {
  jogo!: Jogo;
  urlImagem!: string;
  genero!: string;
  isDetalhesVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private jogoService: JogoService,
    private carrinhoService: CarrinhoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const jogoId = +params['id'];
      if (jogoId) {
        this.loadJogo(jogoId);
      } else {
        console.warn('JogoId inválido:', jogoId);
      }
    });
  }

  loadJogo(jogoId: number): void {
    this.jogoService.findById(jogoId).subscribe(
      (jogo: Jogo) => {
        this.jogo = jogo;
        this.jogoImagem();
        console.log('Jogo carregado:', jogo);
        this.topoPagina();
      },
      (error) => {
        console.error('Erro ao carregar jogo:', error);
      }
    );
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

  jogoImagem() {
    this.urlImagem = this.jogoService.getUrlImagem(this.jogo?.nomeImagem);
  }

  showSnackbarTopPosition(content: any, action: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  topoPagina() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleDetalhesVisibility(): void {
    this.isDetalhesVisible = !this.isDetalhesVisible;
  }
}
