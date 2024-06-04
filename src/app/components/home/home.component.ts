import { Component } from '@angular/core';
import { ToolbarComponent } from '../template/toolbar/toolbar.component';
import { RouterOutlet } from '@angular/router';
import { JogoCardListComponent } from '../jogo-card-list/jogo-card-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolbarComponent, RouterOutlet, JogoCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
