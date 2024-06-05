import { Component } from '@angular/core';
import { ToolbarComponent } from '../template/toolbar/toolbar.component';
import { RouterOutlet } from '@angular/router';
import { JogoCardListComponent } from '../jogo-card-list/jogo-card-list.component';
import { FooterComponent } from '../template/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ToolbarComponent,
    RouterOutlet,
    JogoCardListComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
