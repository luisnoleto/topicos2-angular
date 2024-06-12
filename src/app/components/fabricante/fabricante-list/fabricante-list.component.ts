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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { SituacaoDialogBoxComponent } from '../../situacao-dialog-box/situacao-dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS, MatSlideToggleModule } from '@angular/material/slide-toggle';
import {  MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  templateUrl: './fabricante-list.component.html',
  styleUrl: './fabricante-list.component.css',
  providers: [
    {
      provide: MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS,
      useValue: { disableToggleValue: true },
    }
  ]
})
export class FabricanteListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'acao'];
  fabricante: Fabricante[] = [];

  totalRecords = 0;
  pageSize = 5;
  page = 0;


  constructor(
    private fabricanteService: FabricanteService,
    private location: Location,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fabricanteService.findAll(this.page, this.pageSize).subscribe((data) => {
      this.fabricante = data;
      console.log(this.fabricante);
    });

    this.fabricanteService.count().subscribe(data => {
      this.totalRecords = data;
      console.log(this.totalRecords);
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

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  voltarPagina() {
  this.location.back();
  }

  openDialog(event: Event, fabricante: Fabricante) {
    let situacao = fabricante.ativo ? 'desativar' : 'ativar';
    let situacaoTitle = fabricante.ativo ? 'Desativar' : 'Ativar';

    const dialogRef = this.dialog.open(SituacaoDialogBoxComponent, {
      width: '350px',
      height: '200px',
      data: {
        title: situacaoTitle,
        message: 'Deseja realmente ' + situacao + ' a fabricante ' + fabricante.nome + '?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.fabricanteService.alterarSituacao(fabricante).subscribe(
          response => {
            // Sucesso ao alterar a situação
            fabricante.ativo = !fabricante.ativo;
            console.log('Situação alterada com sucesso!');
            this.snackBar.open('Situação alterada com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          (error: HttpErrorResponse) => { // Especifica o tipo do parâmetro de erro
            // Lidar com erro
            console.error('Erro ao alterar a situação:', error);
            this.snackBar.open('Erro ao alterar a situação.', 'Fechar', {
              duration: 3000,
            });
          }
        );
      }
    });
  }
}
