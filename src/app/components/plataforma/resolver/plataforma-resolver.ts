import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Plataforma } from '../../../models/plataforma.model';
import { PlataformaService } from '../../../services/plataforma.service';
import { inject } from '@angular/core';

export const plataformaResolver: ResolveFn<Plataforma> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(PlataformaService).findById(route.paramMap.get('id')!);
};
