import { Desempenho } from "./desempenho.model";

export class Requisito {
    id!: number;
    processador!: string;
    memoria!: string;
    placaVideo!: string;
    sistemaOperacional!: string;
    armazenamento!: string;
    desempenho!: Desempenho;
  }
  