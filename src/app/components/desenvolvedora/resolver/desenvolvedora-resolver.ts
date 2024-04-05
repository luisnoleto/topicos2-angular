import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Desenvolvedora } from '../../../models/desenvolvedora.model';
import { DesenvolvedoraService } from '../../../services/desenvolvedora.service';
import { inject } from '@angular/core';

export const desenvolvedoraResolver: ResolveFn<Desenvolvedora> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(DesenvolvedoraService).findById(route.paramMap.get('id')!);
};
