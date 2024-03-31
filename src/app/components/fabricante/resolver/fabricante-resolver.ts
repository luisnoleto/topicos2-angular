import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { FabricanteService } from "../../../services/fabricante.service";
import { Fabricante } from "../../../models/fabricante.model";

export const fabricanteResolver: ResolveFn<Fabricante> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(FabricanteService).findById(route.paramMap.get('id')!);
    }