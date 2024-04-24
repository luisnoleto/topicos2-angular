import { Component } from '@angular/core';
import { DesenvolvedoraListComponent } from '../desenvolvedora/desenvolvedora-list/desenvolvedora-list.component';
import { PaisListComponent } from '../pais/pais-list/pais-list.component';
import { JogoListComponent } from '../jogo/jogo-list/jogo-list.component';
import { PlataformaListComponent } from '../plataforma/plataforma-list/plataforma-list.component';
import { GeneroListComponent } from '../genero/genero-list/genero-list.component';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-administrador.',
  standalone: true,
  templateUrl: './tela-administrador.component.html',
  styleUrl: './tela-administrador.component.css',
  imports: [
    DesenvolvedoraListComponent,
    PaisListComponent,
    JogoListComponent,
    PlataformaListComponent,
    GeneroListComponent,
    MatCardModule,
  ],
})
export class TelaAdministradorComponent {
  constructor(private router: Router) {}

  navigateToPaisList() {
    this.router.navigate(['/pais']);
  }

  navigateToDesenvolvedoraList() {
    this.router.navigate(['/desenvolvedoras']);
  }

  navigateToJogoList() {
    this.router.navigate(['/jogos']);
  }

  navigateToPlataformaList() {
    this.router.navigate(['/plataformas']);
  }

  navigateToGeneroList() {
    this.router.navigate(['/generos']);
  }

  navigateToFabricanteList() {
    this.router.navigate(['/fabricantes']);
  }

  navigateToEstadoList() {
    this.router.navigate(['/estados']);
  }

  navigateToMunicipioList() {
    this.router.navigate(['/municipios']);
  }

  navigateToRequisitoList() {
    this.router.navigate(['/requisitos']);
  }
}
