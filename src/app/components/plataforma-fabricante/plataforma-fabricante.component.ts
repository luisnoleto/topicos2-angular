import { Component } from '@angular/core';
import { PlataformaListComponent } from '../plataforma/plataforma-list/plataforma-list.component';
import { FabricanteListComponent } from '../fabricante/fabricante-list/fabricante-list.component';

@Component({
  selector: 'app-plataforma-fabricante',
  standalone: true,
  templateUrl: './plataforma-fabricante.component.html',
  styleUrl: './plataforma-fabricante.component.css',
  imports: [PlataformaListComponent, FabricanteListComponent],
})
export class PlataformaFabricanteComponent {}
