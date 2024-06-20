import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { EnderecoService } from '../../services/endereco.service';
import { PedidoDTO } from '../../models/pedidoDTO.model';
import { Observable, OperatorFunction, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JogoComImagem } from '../../models/jogocomimagem.model';
import {
  EnderecoDTO,
  EnderecoResponseDTO,
} from '../../models/enderecoDTO.model';
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
  enderecoDetailsMap: { [key: number]: EnderecoResponseDTO } = {};
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
            const enderecoIds = pedidos
              .map((pedido) => pedido.endereco?.id)
              .filter((id): id is number => id !== undefined);

            const uniqueJogoIds = [...new Set(jogoIds)];
            const uniqueEnderecoIds = [...new Set(enderecoIds)];

            return forkJoin([
              ...uniqueJogoIds.map((id) => this.fetchJogoDetails(id)),
              ...uniqueEnderecoIds.map((id) => this.fetchEnderecoDetails(id)),
            ]).pipe(
              map(() => {
                return pedidos;
              })
            );
          }),
          catchError((error) => {
            console.error('Error fetching pedidos, jogos, or enderecos', error);
            return of([]);
          })
        );
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  fetchJogoDetails(id: number): Observable<JogoComImagem> {
    return this.jogoService.findById(id).pipe(
      map((jogo) => {
        const jogoComImagem = {
          ...jogo,
          urlImagem: this.getUrlImagem(jogo.nomeImagem),
        };
        this.jogoDetailsMap[jogo.id] = jogoComImagem;
        return jogoComImagem;
      })
    );
  }

  fetchEnderecoDetails(id: number): Observable<EnderecoResponseDTO> {
    return this.enderecoService.getEnderecoById(id).pipe(
      map((endereco: EnderecoResponseDTO) => {
        this.enderecoDetailsMap[endereco.id] = endereco;
        return endereco;
      }) as OperatorFunction<EnderecoDTO, EnderecoResponseDTO>
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

  getEnderecoCompleto(pedido: PedidoDTO): string {
    const endereco = pedido.endereco
      ? this.enderecoDetailsMap[pedido.endereco.id]
      : null;
    if (endereco) {
      return `Rua: ${endereco.logradouro}<br>Nº: ${endereco.numero}<br>Bairro: ${endereco.bairro}<br>Cidade: ${endereco.nomeCidade}<br>CEP: ${endereco.cep}<br>Estado: ${endereco.nomeEstado}`;
    } else {
      return '';
    }
  }

  calculateMarginRight(itens: any[]): number {
    // Example calculation: 100px base margin + 50px for each item
    if (itens.length === 1) {
      return 800;
    }
    // Apply dynamic calculation for more than one item
    return 800 - itens.length * 101;
  }
}
