import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../../services/carrinho.service';
import { ItemCarrinho } from '../../models/itemcarrinho.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [
    FormsModule,
    MatCheckboxModule,
    MatCardModule,
    CommonModule,
    MatButton,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
})
export class PagamentoComponent implements OnInit {
  pedidos() {
    this.carrinhoService.removerTudo();
  }
  carrinhoItens: ItemCarrinho[] = [];
  pix: boolean = false;
  qrCodeUrl: string = '././assets/qrcode-pix.png';

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe((itens) => {
      this.carrinhoItens = itens;
    });
  }

  calcularTotal(): number {
    return this.carrinhoItens.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  }
}
