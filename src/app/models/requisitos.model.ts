import { DesempenhoDTO } from "./desempenhoDTO.model";

export class Requisito {
    id!: number;
    processador!: string;
    memoria!: string;
    placaVideo!: string;
    sistemaOperacional!: string;
    armazenamento!: string;
    desempenho!: DesempenhoDTO;
  }
  