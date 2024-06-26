import { PerfilDTO } from './perfildto.model';
import { Telefone } from './telefone.model';

export class User {
  id!: number;
  nome!: string;
  login!: string;
  senha!: string;
  email!: string;
  cpf!: string;
  dataNascimento!: Date;
  listaTelefone!: Telefone[];
  perfil!: PerfilDTO;
}
