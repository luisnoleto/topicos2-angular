import { Component } from '@angular/core';
import { DesenvolvedoraListComponent } from '../desenvolvedora/desenvolvedora-list/desenvolvedora-list.component';
import { PaisListComponent } from '../pais/pais-list/pais-list.component';

@Component({
  selector: 'app-dev-pais',
  standalone: true,
  templateUrl: './dev-pais.component.html',
  styleUrl: './dev-pais.component.css',
  imports: [DesenvolvedoraListComponent, PaisListComponent],
})
export class DevPaisComponent {}
