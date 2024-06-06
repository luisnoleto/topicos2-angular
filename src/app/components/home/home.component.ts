import { Component } from '@angular/core';
import { HeaderComponent } from '../template/header/header.component';
import { RouterOutlet } from '@angular/router';
import { JogoCardListComponent } from '../jogo-card-list/jogo-card-list.component';
import { FooterComponent } from '../template/footer/footer.component';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    JogoCardListComponent,
    FooterComponent,
    CarouselComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
