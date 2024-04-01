import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { RequisitoService } from "../../../services/requisito.service";
import { Requisito } from "../../../models/requisitos.model";

export const requisitoResolver: ResolveFn<Requisito> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(RequisitoService).findById(route.paramMap.get('id')!);
    }