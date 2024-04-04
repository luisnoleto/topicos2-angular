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
  ],
  templateUrl: './plataforma-list.component.html',
  styleUrl: './plataforma-list.component.css',
})
export class PlataformaListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'fabricante', 'acao'];
  plataforma: Plataforma[] = [];

  constructor(private plataformaService: PlataformaService) {}

  ngOnInit(): void {
    this.plataformaService.findAll().subscribe((data) => {
      this.plataforma = data;
      console.log(this.plataforma);
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
}
