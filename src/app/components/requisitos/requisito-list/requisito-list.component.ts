import { Component, OnInit } from '@angular/core';
import { Requisito } from '../../../models/requisitos.model';
import { RequisitoService } from '../../../services/requisito.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Genero } from '../../../models/genero.model';
import { GeneroService } from '../../../services/genero.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-requisito-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './requisito-list.component.html',
  styleUrl: './requisito-list.component.css'
})
export class RequisitoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'processador', 'sistemaOperacional', 'memoria', 'acao'];
  requisitos: Requisito[] = [];

  totalRecords = 0;
  pageSize = 5;
  page = 0;

  constructor(private requisitoService: RequisitoService) {

  }

  ngOnInit(): void {
    this.requisitoService.findAll(this.page, this.pageSize).subscribe(data => {
      this.requisitos = data;
      console.log(this.requisitos);
    });

    this.requisitoService.count().subscribe(data => {
      this.totalRecords = data;
      console.log(this.totalRecords);
    });
  }


  excluir(requisito: Requisito) {
    this.requisitoService.delete(requisito).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Erro ao Excluir' + JSON.stringify(err));
      }
    });
  }


  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }
}
