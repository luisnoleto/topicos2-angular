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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

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
    MatPaginatorModule
  ],
  templateUrl: './pais-list.component.html',
  styleUrl: './pais-list.component.css',
})
export class PaisListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'sigla', 'acao'];
  pais: Pais[] = [];

  totalRecords = 0;
  pageSize = 5;
  page = 0;

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {
    this.paisService.findAll(this.page, this.pageSize).subscribe((data) => {
      this.pais = data;
      console.log(this.pais);
    });

    this.paisService.count().subscribe(data => {
      this.totalRecords = data;
      console.log(this.totalRecords);
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

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }
}
