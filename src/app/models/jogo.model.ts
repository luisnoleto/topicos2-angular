import { Classificacao } from './classificacao.model';
import { Desenvolvedora } from './desenvolvedora.model';
import { Genero } from './genero.model';
import { Plataforma } from './plataforma.model';
import { Requisitos } from './requisitos.model';

export class Jogo {
  id!: number;
  nome!: string;
  descricao!: string;
  preco!: number;
  genero!: Genero;
  plataforma!: Plataforma;
  requisitos!: Requisitos;
  desenvolvedora!: Desenvolvedora;
  classificacao!: Classificacao;
}
