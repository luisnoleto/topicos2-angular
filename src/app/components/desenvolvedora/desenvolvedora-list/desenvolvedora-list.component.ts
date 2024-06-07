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
import { MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { SituacaoDialogBoxComponent } from '../../situacao-dialog-box/situacao-dialog-box.component';
import { catchError } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


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
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  templateUrl: './desenvolvedora-list.component.html',
  styleUrl: './desenvolvedora-list.component.css',
  providers: [
    {
      provide: MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS,
      useValue: { disableToggleValue: true },
    }
  ]
})
export class DesenvolvedoraListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'cnpj', 'pais', 'acao'];
  desenvolvedora: Desenvolvedora[] = [];

  totalRecords = 0;
  pageSize = 5;
  page = 0;
  snackBar: any;


  constructor(
    private desenvolvedoraService: DesenvolvedoraService,
    private dialog: MatDialog) { }

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

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  openDialog(event: Event, desenvolvedora: Desenvolvedora) {
    let situacao = desenvolvedora.ativo ? 'desativar' : 'ativar';
    let situacaoTitle = desenvolvedora.ativo ? 'Desativar' : 'Ativar';

    const dialogRef = this.dialog.open(SituacaoDialogBoxComponent, {
      width: '350px',
      height: '225px',
      data: {
        title: situacaoTitle,
        message: 'Deseja realmente ' + situacao + ' a desenvolvedora ' + desenvolvedora.nome + '?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.desenvolvedoraService.alterarSituacao(desenvolvedora).subscribe(
          response => {
            // Sucesso ao alterar a situação
            desenvolvedora.ativo = !desenvolvedora.ativo;
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