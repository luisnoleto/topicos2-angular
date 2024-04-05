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
  ],
  templateUrl: './desenvolvedora-list.component.html',
  styleUrl: './desenvolvedora-list.component.css',
})
export class DesenvolvedoraListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'cnpj', 'pais', 'acao'];
  desenvolvedora: Desenvolvedora[] = [];

  constructor(private desenvolvedoraService: DesenvolvedoraService) {}

  ngOnInit(): void {
    this.desenvolvedoraService.findAll().subscribe((data) => {
      this.desenvolvedora = data;
      console.log(this.desenvolvedora);
    });
  }
  deleteDesenvolvedora(desenvolvedora: Desenvolvedora) {
    this.desenvolvedoraService.delete(desenvolvedora).subscribe({
      next: () => {
        // Remove the desenvolvedora from the list
        this.desenvolvedora = this.desenvolvedora.filter(
          (u) => u.id !== desenvolvedora.id
        );
      },
      error: (err) => {
        console.log('Erro ao deletar Usuário', err);
      },
    });
  }
}
