export class Jogo {
  id!: number;
  nome!: string;
  descricao!: string;
  preco!: number;
  estoque!: number;
  genero!: Genero;
}

export enum Genero {
  Aventura = 1,
  Acao = 2,
  RPG = 3,
  Estrategia = 4,
  Tiro = 5,
  Esporte = 6,
  Simulacao = 7,
  Corrida = 8,
  Luta = 9,
  Terror = 10,
}
