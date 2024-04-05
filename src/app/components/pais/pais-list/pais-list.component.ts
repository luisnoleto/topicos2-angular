import { Component } from '@angular/core';
import { Pais } from '../../../models/pais.model';
import { PaisService } from '../../../services/pais.service';
import { OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Route } from '@angular/router';

@Component({
  selector: 'app-pais-list',
  standalone: true,
  imports: [
    NgFor,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './pais-list.component.html',
  styleUrl: './pais-list.component.css',
})
export class PaisListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'sigla', 'acao'];
  pais: Pais[] = [];

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {
    this.paisService.findAll().subscribe((data) => {
      this.pais = data;
      console.log(this.pais);
    });
  }
  deletePais(pais: Pais) {
    this.paisService.delete(pais).subscribe({
      next: () => {
        // Remove the pais from the list
        this.pais = this.pais.filter((u) => u.id !== pais.id);
      },
      error: (err) => {
        console.log('Erro ao deletar Usuário', err);
      },
    });
  }
}
