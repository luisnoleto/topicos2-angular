import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { EnderecoService } from '../../services/endereco.service';
import { JogoService } from '../../services/jogo.service';
import { PedidoDTO } from '../../models/pedidoDTO.model';
import { JogoComImagem } from '../../models/jogocomimagem.model';
import {
  EnderecoDTO,
  EnderecoResponseDTO,
} from '../../models/enderecoDTO.model';
import { forkJoin, Observable, of, OperatorFunction } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes-compra',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './detalhes-compra.component.html',
  styleUrls: ['./detalhes-compra.component.css'],
})
export class DetalhesCompraComponent implements OnInit {
  pedido!: PedidoDTO;
  jogoDetailsMap: { [key: number]: JogoComImagem } = {};
  enderecoDetailsMap: { [key: number]: EnderecoResponseDTO } = {};
  jogoImagens: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private enderecoService: EnderecoService,
    private jogoService: JogoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const pedidoId = this.route.snapshot.paramMap.get('id');
    if (pedidoId) {
      this.pedidoService
        .getPedidoById(+pedidoId)
        .pipe(
          switchMap((pedido) => {
            this.pedido = pedido;
            const jogoIds = pedido.itens.map((item) => item.idProduto);
            const enderecoId = pedido.endereco?.id;

            const uniqueJogoIds = [...new Set(jogoIds)];
            const requests: Observable<any>[] = [
              ...uniqueJogoIds.map((id) => this.fetchJogoDetails(id)),
            ];

            if (enderecoId !== undefined) {
              requests.push(this.fetchEnderecoDetails(enderecoId));
            }

            return forkJoin(requests);
          }),
          catchError((error) => {
            console.error('Erro ao carregar os detalhes do pedido', error);
            return of([]);
          })
        )
        .subscribe();
    }
  }

  fetchJogoDetails(id: number): Observable<JogoComImagem> {
    return this.jogoService.findById(id).pipe(
      map((jogo) => {
        const jogoComImagem = {
          ...jogo,
          urlImagem: this.getUrlImagem(jogo.nomeImagem),
        };
        this.jogoDetailsMap[jogo.id] = jogoComImagem;
        this.jogoImagens.push(jogoComImagem.urlImagem);
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

  getEnderecoCompleto(): string {
    const endereco = this.pedido.endereco
      ? this.enderecoDetailsMap[this.pedido.endereco.id]
      : null;
    if (endereco) {
      return `Rua: ${endereco.logradouro}<br>Nº: ${endereco.numero}<br>Bairro: ${endereco.bairro}<br>Cidade: ${endereco.nomeCidade}<br>CEP: ${endereco.cep}<br>Estado: ${endereco.nomeEstado}`;
    } else {
      return '';
    }
  }

  goToMeusPedidos(): void {
    this.router.navigate(['/meus-pedidos']);
  }

  irJogo(jogoId: number): void {
    this.router.navigate(['/meus-pedidos', { jogoId }]);
  }
}
