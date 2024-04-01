import { Component, OnInit } from '@angular/core';
import { Genero } from '../../../models/genero.model';
import { GeneroService } from '../../../services/genero.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-genero-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule],
  templateUrl: './genero-list.component.html',
  styleUrl: './genero-list.component.css'
})
export class GeneroListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'acao'];
  generos: Genero[] = [];

  constructor(private generoService: GeneroService) {

  }

  ngOnInit(): void {
    this.generoService.findAll().subscribe(data => {
      this.generos = data;
    })
  }

}
