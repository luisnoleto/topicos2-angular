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
import { HttpErrorResponse } from '@angular/common/http';
import { SituacaoDialogBoxComponent } from '../../situacao-dialog-box/situacao-dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS, MatSlideToggleModule } from '@angular/material/slide-toggle';

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
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  templateUrl: './pais-list.component.html',
  styleUrl: './pais-list.component.css',
  providers: [
    {
      provide: MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS,
      useValue: { disableToggleValue: true },
    }
  ]
})
export class PaisListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'sigla', 'acao'];
  pais: Pais[] = [];

  totalRecords = 0;
  pageSize = 5;
  page = 0;

  constructor(private paisService: PaisService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

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

  openDialog(event: Event, pais: Pais) {
    let situacao = pais.ativo ? 'desativar' : 'ativar';
    let situacaoTitle = pais.ativo ? 'Desativar' : 'Ativar';

    const dialogRef = this.dialog.open(SituacaoDialogBoxComponent, {
      width: '350px',
      height: '200px',
      data: {
        title: situacaoTitle,
        message: 'Deseja realmente ' + situacao + ' a pais ' + pais.nome + '?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.paisService.alterarSituacao(pais).subscribe(
          response => {
            // Sucesso ao alterar a situação
            pais.ativo = !pais.ativo;
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
