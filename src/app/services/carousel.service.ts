import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Slide, SlideDTO, Jogo } from '../models/SlideDTO.model';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  private baseUrl = 'http://localhost:8080/carousel';
  private jogosUrl = 'http://localhost:8080/jogos';

  constructor(private http: HttpClient) {}

  getSlides(): Observable<Slide[]> {
    return this.http.get<SlideDTO[]>(`${this.baseUrl}/slides`).pipe(
      map((slideDTOs) =>
        slideDTOs.map((slideDTO) => ({
          id: slideDTO.id.toString(),
          nomeImagem: this.getSlideUrl(slideDTO.nomeImagem),
          jogoId: slideDTO.jogoResponseDTO.id.toString(),
          jogo: slideDTO.jogoResponseDTO,
        }))
      )
    );
  }

  addSlide(formData: FormData): Observable<Slide> {
    return this.http.post<Slide>(`${this.baseUrl}/upload`, formData);
  }

  removeSlide(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${id}`);
  }

  removeSlideByJogoId(jogoId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${jogoId}`);
  }

  getSlideUrl(nomeImagem: string): string {
    const url = `${this.baseUrl}/download/${nomeImagem}`;
    console.log('Slide URL:', url);
    return url;
  }

  getJogos(): Observable<Jogo[]> {
    return this.http.get<Jogo[]>(this.jogosUrl);
  }
}
