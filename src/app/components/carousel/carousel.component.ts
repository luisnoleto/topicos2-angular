import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Router } from '@angular/router';
import { CarouselService } from '../../services/carousel.service';
import { Slide, Jogo } from '../../models/SlideDTO.model';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  slides: Slide[] = [];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    infinite: true,
    arrows: true,
  };

  constructor(
    private router: Router,
    private carouselService: CarouselService
  ) {}

  ngOnInit(): void {
    this.loadSlides();
  }

  loadSlides(): void {
    this.carouselService.getSlides().subscribe((slides) => {
      this.slides = slides;
      // Log para confirmar que os objetos 'jogo' estão presentes
      this.slides.forEach((slide) => {
        console.log(`Slide ${slide.id} jogo:`, slide.jogo);
        if (!slide.jogo) {
          console.error(`Slide ${slide.id} não possui um jogo associado.`);
        }
      });
      console.log('Slides carregados:', this.slides); // Log slides para depurar
    });
  }

  navigateToJogo(jogo: Jogo): void {
    if (!jogo || !jogo.id) {
      console.error(
        'Erro: jogo ou jogoId está indefinido, não é possível navegar.'
      );
      return;
    }
    this.router.navigate([`/jogo/${jogo.id}`]);
  }

  addSlide(slide: string): void {
    const formData = new FormData();
    formData.append('slide', slide);
    this.carouselService.addSlide(formData).subscribe((newSlide) => {
      this.slides.push(newSlide);
    });
  }

  removeSlide(index: number): void {
    const slideId = this.slides[index].id;
    this.carouselService.removeSlide(slideId).subscribe(() => {
      this.slides.splice(index, 1);
    });
  }
}
