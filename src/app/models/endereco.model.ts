import { Municipio } from './municipio.model';

export interface Endereco {
  id: number;
  cep: string;
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  municipio: Municipio;
}

