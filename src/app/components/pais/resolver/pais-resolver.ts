import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Pais } from '../../../models/pais.model';
import { PaisService } from '../../../services/pais.service';
import { inject } from '@angular/core';

export const paisResolver: ResolveFn<Pais> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(PaisService).findById(route.paramMap.get('id')!);
};
