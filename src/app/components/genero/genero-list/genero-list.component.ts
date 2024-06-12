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
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS, MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SituacaoDialogBoxComponent } from '../../situacao-dialog-box/situacao-dialog-box.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-genero-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatPaginatorModule, MatSlideToggleModule, MatSnackBarModule],
  templateUrl: './genero-list.component.html',
  styleUrl: './genero-list.component.css',
  providers: [
    {
      provide: MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS,
      useValue: { disableToggleValue: true },
    }
  ]
})
export class GeneroListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'acao'];
  generos: Genero[] = [];
  http: any;

  totalRecords = 0;
  pageSize = 5;
  page = 0;

  constructor(
    private generoService: GeneroService,
    private location: Location,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {

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

  openDialog(event: Event, genero: Genero) {
    let situacao = genero.ativo ? 'desativar' : 'ativar';
    let situacaoTitle = genero.ativo ? 'Desativar' : 'Ativar';

    const dialogRef = this.dialog.open(SituacaoDialogBoxComponent, {
      width: '350px',
      height: '200px',
      data: {
        title: situacaoTitle,
        message: 'Deseja realmente ' + situacao + ' a genero ' + genero.nome + '?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.generoService.alterarSituacao(genero).subscribe(
          response => {
            // Sucesso ao alterar a situação
            genero.ativo = !genero.ativo;
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

