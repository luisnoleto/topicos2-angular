import { Classificacao } from './classificacao.model';
import { Desenvolvedora } from './desenvolvedora.model';
import { Fabricante } from './fabricante.model';
import { Genero } from './genero.model';
import { Plataforma } from './plataforma.model';

export class Jogo {
  id!: number;
  nome!: string;
  descricao!: string;
  preco!: number;
  estoque!: number;
  genero!: Genero;
  processador!: string;
  memoria!: string;
  placaVideo!: string;
  sistemaOperacional!: string;
  armazenamento!: string;
  plataforma!: Plataforma;
  desenvolvedora!: Desenvolvedora;
  classificacao!: Classificacao;
  fabricante!: Fabricante;
  nomeImagem!: string;
  ativo!: boolean;
}
