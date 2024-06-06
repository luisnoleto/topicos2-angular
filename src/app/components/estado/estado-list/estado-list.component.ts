import { Component, OnInit } from '@angular/core';
import { Location, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Estado } from '../../../models/estado.model';
import { EstadoService } from '../../../services/estado.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-estado-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './estado-list.component.html',
  styleUrl: './estado-list.component.css'
})
export class EstadoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'acao'];
  estados: Estado[] = [];

  totalRecords = 0;
  pageSize = 5;
  page = 0;

  constructor(private estadoService: EstadoService) {

  }

  ngOnInit(): void {
    this.estadoService.findAll(this.page, this.pageSize).subscribe(data => {
      this.estados = data;
      console.log(this.estados);
    });

    this.estadoService.count().subscribe(data => {
      this.totalRecords = data;
      console.log(this.totalRecords);
    });
  }

  paginar(event:PageEvent): void{
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

}
