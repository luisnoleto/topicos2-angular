import { Classificacao } from './classificacao.model';
import { Desenvolvedora } from './desenvolvedora.model';
import { Genero } from './genero.model';
import { Plataforma } from './plataforma.model';
import { Requisito } from './requisitos.model';

export class Jogo {
  id!: number;
  nome!: string;
  descricao!: string;
  preco!: number;
  genero!: Genero;
  plataforma!: Plataforma;
  requisitos!: Requisito;
  desenvolvedora!: Desenvolvedora;
  classificacao!: Classificacao;
}
