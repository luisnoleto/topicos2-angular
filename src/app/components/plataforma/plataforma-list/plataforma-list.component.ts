import { Component } from '@angular/core';
import { Plataforma } from '../../../models/plataforma.model';
import { PlataformaService } from '../../../services/plataforma.service';
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SituacaoDialogBoxComponent } from '../../situacao-dialog-box/situacao-dialog-box.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-plataforma-list',
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
  templateUrl: './plataforma-list.component.html',
  styleUrl: './plataforma-list.component.css',
  providers: [
    {
      provide: MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS,
      useValue: { disableToggleValue: true },
    }
  ]
})
export class PlataformaListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'fabricante', 'acao'];
  plataforma: Plataforma[] = [];

  totalRecords = 0;
  pageSize = 5;
  page = 0;

  constructor(private plataformaService: PlataformaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.plataformaService.findAll(this.page, this.pageSize).subscribe((data) => {
      this.plataforma = data;
      console.log(this.plataforma);
    });

    this.plataformaService.count().subscribe(data => {
      this.totalRecords = data;
      console.log(this.totalRecords);
    });
  }
  deletePlataforma(plataforma: Plataforma) {
    this.plataformaService.delete(plataforma).subscribe({
      next: () => {
        this.plataforma = this.plataforma.filter((u) => u.id !== plataforma.id);
      },
      error: (err) => {
        console.log('Erro ao deletar Plataforma', err);
      },
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  openDialog(event: Event, plataforma: Plataforma) {
    let situacao = plataforma.ativo ? 'desativar' : 'ativar';
    let situacaoTitle = plataforma.ativo ? 'Desativar' : 'Ativar';

    const dialogRef = this.dialog.open(SituacaoDialogBoxComponent, {
      width: '350px',
      height: '200px',
      data: {
        title: situacaoTitle,
        message: 'Deseja realmente ' + situacao + ' a plataforma ' + plataforma.nome + '?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.plataformaService.alterarSituacao(plataforma).subscribe(
          response => {
            // Sucesso ao alterar a situação
            plataforma.ativo = !plataforma.ativo;
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
