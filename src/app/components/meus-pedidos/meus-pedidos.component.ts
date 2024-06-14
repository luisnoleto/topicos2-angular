import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { EnderecoService } from '../../services/endereco.service';
import { PedidoDTO } from '../../models/pedidoDTO.model';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JogoComImagem } from '../../models/jogocomimagem.model';
import { EnderecoDTO } from '../../models/enderecoDTO.model';
import { JogoService } from '../../services/jogo.service';
import { MunicipioService } from '../../services/municipio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meus-pedidos',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, RouterModule],
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css'],
})
export class MeusPedidosComponent implements OnInit {
  pedidos$!: Observable<PedidoDTO[]>;
  jogoDetailsMap: { [key: number]: JogoComImagem } = {}; // Use the extended interface
  enderecoDetailsMap: { [key: number]: EnderecoDTO } = {};
  detalhesVisibility: { [key: number]: boolean } = {};

  constructor(
    private pedidoService: PedidoService,
    private enderecoService: EnderecoService,
    private authService: AuthService,
    private jogoService: JogoService,
    private municipioService: MunicipioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUsuarioLogado().subscribe((usuario) => {
      if (usuario && usuario.id) {
        this.pedidos$ = this.pedidoService.getByUsuarioId(usuario.id).pipe(
          switchMap((pedidos) => {
            const jogoIds = pedidos.flatMap((pedido) =>
              pedido.itens.map((item) => item.idProduto)
            );
            const uniqueJogoIds = [...new Set(jogoIds)];
            return forkJoin(
              uniqueJogoIds.map((id) => this.fetchJogoDetails(id))
            ).pipe(
              map((jogos) => {
                jogos.forEach((jogo) => (this.jogoDetailsMap[jogo.id] = jogo));
                return pedidos;
              })
            );
          }),
          catchError((error) => {
            console.error('Error fetching pedidos or jogos', error);
            return of([]);
          })
        );
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  fetchJogoDetails(id: number): Observable<JogoComImagem> {
    // Update return type
    return this.jogoService.findById(id).pipe(
      map((jogo) => ({
        ...jogo,
        urlImagem: this.getUrlImagem(jogo.nomeImagem),
      }))
    );
  }

  getUrlImagem(nomeImagem: string): string {
    return this.jogoService.getUrlImagem(nomeImagem);
  }

  toggleDetalhes(pedidoId: number | undefined): void {
    if (pedidoId === undefined) {
      return;
    }
    this.detalhesVisibility[pedidoId] = !this.detalhesVisibility[pedidoId];
  }

  isDetalhesVisible(pedidoId: number | undefined): boolean {
    if (pedidoId === undefined) {
      return false;
    }
    return !!this.detalhesVisibility[pedidoId];
  }
}
