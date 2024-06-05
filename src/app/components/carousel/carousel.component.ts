import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  constructor(private router: Router) {}

  navigateToJogo(jogoId: string) {
    this.router.navigate(['/jogo', jogoId]);
  }
  slides = [
    { img: '../assets/carousel1.png', id: 'jogo1' },
    { img: '../assets/carousel2.png', id: 'jogo2' },
  ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    infinite: true,
    arrow: true,
  };
}
