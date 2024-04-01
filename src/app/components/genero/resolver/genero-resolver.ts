import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { GeneroService } from "../../../services/genero.service";
import { Genero } from "../../../models/genero.model";

export const generoResolver: ResolveFn<Genero> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(GeneroService).findById(route.paramMap.get('id')!);
    }