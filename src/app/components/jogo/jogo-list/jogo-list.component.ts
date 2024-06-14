import { Component, OnInit } from '@angular/core';
import { Jogo } from '../../../models/jogo.model';
import { JogoService } from '../../../services/jogo.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { SituacaoDialogBoxComponent } from '../../situacao-dialog-box/situacao-dialog-box.component';



@Component({
  selector: 'app-jogo-list',
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
  templateUrl: './jogo-list.component.html',
  styleUrl: './jogo-list.component.css',
  providers: [
    {
      provide: MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS,
      useValue: { disableToggleValue: true },
    }
  ]
})
export class JogoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'plataforma', 'acao'];
  jogos: Jogo[] = [];

  totalRecords = 0;
  pageSize = 5;
  page = 0;

  constructor(
    private jogoService: JogoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.jogoService.findAll(this.page, this.pageSize).subscribe(data => {
      this.jogos = data;
      console.log(this.jogos);
    });

    this.jogoService.count().subscribe(data => {
      this.totalRecords = data;
      console.log(this.totalRecords);
    });
  }

  excluir(jogo: Jogo) {
    this.jogoService.delete(jogo).subscribe({
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

  openDialog(event: Event, jogo: Jogo) {
    let situacao = jogo.ativo ? 'desativar' : 'ativar';
    let situacaoTitle = jogo.ativo ? 'Desativar' : 'Ativar';

    const dialogRef = this.dialog.open(SituacaoDialogBoxComponent, {
      width: '350px',
      height: '200px',
      data: {
        title: situacaoTitle,
        message: 'Deseja realmente ' + situacao + ' a jogo ' + jogo.nome + '?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.jogoService.alterarSituacao(jogo).subscribe(
          response => {
            // Sucesso ao alterar a situação
            jogo.ativo = !jogo.ativo;
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
