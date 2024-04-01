import { Telefone } from './telefone.model';

export class User {
  id!: number;
  nome!: string;
  login!: string;
  senha!: string;
  email!: string;
  cpf!: string;
  telefones!: Telefone[];
}
