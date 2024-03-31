import { Component, OnInit } from '@angular/core';
import { Fabricante } from '../../../models/fabricante.model';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FabricanteService } from '../../../services/fabricante.service';

@Component({
  selector: 'app-fabricante-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule],
  templateUrl: './fabricante-list.component.html',
  styleUrl: './fabricante-list.component.css'
})
export class FabricanteListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'acao'];
  fabricantes: Fabricante[] = [];

  constructor(private fabricanteService: FabricanteService) {

  }

  ngOnInit(): void {
    this.fabricanteService.findAll().subscribe(data => {
      this.fabricantes = data;
    })
  }

}
