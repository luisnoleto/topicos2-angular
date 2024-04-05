import { Component } from '@angular/core';
import { Fabricante } from '../../../models/fabricante.model';
import { FabricanteService } from '../../../services/fabricante.service';
import { OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Route } from '@angular/router';

@Component({
  selector: 'app-fabricante-list',
  standalone: true,
  imports: [
    NgFor,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './fabricante-list.component.html',
  styleUrl: './fabricante-list.component.css',
})
export class FabricanteListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'acao'];
  fabricante: Fabricante[] = [];

  constructor(private fabricanteService: FabricanteService) {}

  ngOnInit(): void {
    this.fabricanteService.findAll().subscribe((data) => {
      this.fabricante = data;
      console.log(this.fabricante);
    });
  }
  deleteFabricante(fabricante: Fabricante) {
    this.fabricanteService.delete(fabricante).subscribe({
      next: () => {
        this.fabricante = this.fabricante.filter((u) => u.id !== fabricante.id);
      },
      error: (err) => {
        console.log('Erro ao deletar Fabricante', err);
      },
    });
  }
}
