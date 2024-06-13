import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { TelaAdministradorComponent } from '../../tela-administrador/tela-administrador.component';

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, TelaAdministradorComponent,FooterComponent],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css',
})
export class AdminTemplateComponent {}
