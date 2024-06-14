import { Jogo } from '../models/jogo.model';

export interface JogoComImagem extends Jogo {
  urlImagem: string;
}
