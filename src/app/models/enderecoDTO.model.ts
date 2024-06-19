import { Municipio } from './municipio.model';

export interface EnderecoDTO {
  id: number;
  cep: string;
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  idCidade: number;
  cidade: Municipio;
}
