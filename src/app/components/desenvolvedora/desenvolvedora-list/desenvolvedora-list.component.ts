import { Component } from '@angular/core';
import { Desenvolvedora } from '../../../models/desenvolvedora.model';
import { DesenvolvedoraService } from '../../../services/desenvolvedora.service';
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
  selector: 'app-desenvolvedora-list',
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
  templateUrl: './desenvolvedora-list.component.html',
  styleUrl: './desenvolvedora-list.component.css',
})
export class DesenvolvedoraListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'cnpj', 'pais', 'acao'];
  desenvolvedora: Desenvolvedora[] = [];

  totalRecords = 0;
  pageSize = 5;
  page = 0;

  constructor(private desenvolvedoraService: DesenvolvedoraService) { }

  ngOnInit(): void {
    this.desenvolvedoraService.findAll(this.page, this.pageSize).subscribe((data) => {
      this.desenvolvedora = data;
      console.log(this.desenvolvedora);
    });

    this.desenvolvedoraService.count().subscribe(data => {
      this.totalRecords = data;
      console.log(this.totalRecords);
    });
  }

  deleteDesenvolvedora(desenvolvedora: Desenvolvedora) {
    this.desenvolvedoraService.delete(desenvolvedora).subscribe({
      next: () => {
        
        this.desenvolvedora = this.desenvolvedora.filter(
          (u) => u.id !== desenvolvedora.id
        );
      },
      error: (err) => {
        console.log('Erro ao deletar Usuário', err);
      },
    });
  }

  paginar(event:PageEvent): void{
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

}
