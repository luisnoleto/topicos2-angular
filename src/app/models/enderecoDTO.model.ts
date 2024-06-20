import { Municipio } from './municipio.model';

export interface EnderecoDTO {
  id: number;
  cep: string;
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  idCidade: number;
}

export interface EnderecoResponseDTO {
  id: number;
  cep: string;
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  idCidade: number;
  nomeCidade: string;
  idEstado: number;
  nomeEstado: string;
}
