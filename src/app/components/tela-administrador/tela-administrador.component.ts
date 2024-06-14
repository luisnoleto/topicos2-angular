import { Component } from '@angular/core';
import { DesenvolvedoraListComponent } from '../desenvolvedora/desenvolvedora-list/desenvolvedora-list.component';
import { PaisListComponent } from '../pais/pais-list/pais-list.component';
import { JogoListComponent } from '../jogo/jogo-list/jogo-list.component';
import { PlataformaListComponent } from '../plataforma/plataforma-list/plataforma-list.component';
import { GeneroListComponent } from '../genero/genero-list/genero-list.component';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { FooterComponent } from '../template/footer/footer.component';

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
    FooterComponent,
  ],
})
export class TelaAdministradorComponent {
  constructor(private router: Router) {}

  navigateToPaisList() {
    this.router.navigate(['admin/pais']);
  }

  navigateToDesenvolvedoraList() {
    this.router.navigate(['admin/desenvolvedoras']);
  }

  navigateToJogoList() {
    this.router.navigate(['admin/jogos']);
  }

  navigateToPlataformaList() {
    this.router.navigate(['admin/plataformas']);
  }

  navigateToGeneroList() {
    this.router.navigate(['admin/generos']);
  }

  navigateToFabricanteList() {
    this.router.navigate(['admin/fabricantes']);
  }

  navigateToEstadoList() {
    this.router.navigate(['admin/estados']);
  }

  navigateToMunicipioList() {
    this.router.navigate(['admin/municipios']);
  }

}
