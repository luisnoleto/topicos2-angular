import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Municipio } from "../../../models/municipio.model";
import { MunicipioService } from "../../../services/municipio.service";
import { inject } from "@angular/core";

export const municipioResolver: ResolveFn<Municipio> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(MunicipioService).findById(route.paramMap.get('id')!);
    }