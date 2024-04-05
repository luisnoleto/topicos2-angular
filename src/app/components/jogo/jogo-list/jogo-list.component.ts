import { Component, OnInit } from '@angular/core';
import { Jogo } from '../../../models/jogo.model';
import { JogoService } from '../../../services/jogo.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-jogo-list',
  standalone: true,
  imports: [
    NgFor,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule

  ],
  templateUrl: './jogo-list.component.html',
  styleUrl: './jogo-list.component.css',
})
export class JogoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'acao'];
  jogos: Jogo[] = [];

  constructor(private jogoService: JogoService) {}

  totalRecords = 0;
  pageSize = 5;
  page = 0;

  ngOnInit(): void {
    this.jogoService.findAll(this.page, this.pageSize).subscribe((data) => {
      this.jogos = data;
      console.log(this.jogos);

      this.jogoService.count().subscribe((data) => {
        this.totalRecords = data;
        console.log(this.totalRecords);
      });
    });
  }
  paginar(event: PageEvent): void{
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(jogo: Jogo) {
    this.jogoService.delete(jogo).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Erro ao Excluir' + JSON.stringify(err));
      }
    });
  }


}
