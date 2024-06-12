import { Fabricante } from './fabricante.model';

export class Plataforma {
    id!: number;
    nome!: string;
    fabricante!: Fabricante;
    ativo!: boolean;
  }
  