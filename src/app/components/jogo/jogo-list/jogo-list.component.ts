import { Component, OnInit } from '@angular/core';
import { Jogo } from '../../../models/jogo.model';
import { JogoService } from '../../../services/jogo.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

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
  ],
  templateUrl: './jogo-list.component.html',
  styleUrl: './jogo-list.component.css',
})
export class JogoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'sigla', 'acao'];
  jogos: Jogo[] = [];

  constructor(private jogoService: JogoService) {}

  ngOnInit(): void {
    this.jogoService.findAll().subscribe((data) => {
      this.jogos = data;
    });
  }
}
