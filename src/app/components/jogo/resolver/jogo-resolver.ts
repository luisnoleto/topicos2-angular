import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Jogo } from '../../../models/jogo.model';
import { JogoService } from '../../../services/jogo.service';
import { inject } from '@angular/core';

export const jogoResolver: ResolveFn<Jogo> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id = +route.paramMap.get('id')!;
  return inject(JogoService).findById(id);
};
