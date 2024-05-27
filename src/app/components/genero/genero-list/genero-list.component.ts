import { Component, OnInit } from '@angular/core';
import { Genero } from '../../../models/genero.model';
import { GeneroService } from '../../../services/genero.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-genero-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './genero-list.component.html',
  styleUrl: './genero-list.component.css'
})
export class GeneroListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'acao'];
  generos: Genero[] = [];
  http: any;

  totalRecords = 0;
  pageSize = 5;
  page = 0;

  constructor(private generoService: GeneroService) {

  }

  ngOnInit(): void {
    this.generoService.findAll(this.page, this.pageSize).subscribe(data => {
      this.generos = data;
      console.log(this.generos);
    });

    this.generoService.count().subscribe(data => {    
      this.totalRecords = data;
      console.log(this.totalRecords);
    });
  }

  excluir(genero: Genero) {
    this.generoService.delete(genero).subscribe({
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
