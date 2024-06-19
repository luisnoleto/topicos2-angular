export interface Slide {
  id: string;
  nomeImagem: string;
  jogoId: string;
  jogo: Jogo;
}

export interface SlideDTO {
  id: number;
  nomeImagem: string;
  jogoResponseDTO: Jogo;
}

export interface Jogo {
  id: string;
  nome: string;
  // Outros campos se necessário
}
