import { Component, OnInit } from '@angular/core';
import { Requisito } from '../../../models/requisitos.model';
import { RequisitoService } from '../../../services/requisito.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-requisito-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule],
  templateUrl: './requisito-list.component.html',
  styleUrl: './requisito-list.component.css'
})
export class RequisitoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'processador', 'acao'];
  requisitos: Requisito[] = [];

  constructor(private requisitoService: RequisitoService) {

  }

  ngOnInit(): void {
    this.requisitoService.findAll().subscribe(data => {
      this.requisitos = data;
    })
  }

}
