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
  return inject(JogoService).findById(route.paramMap.get('id')!);
};
