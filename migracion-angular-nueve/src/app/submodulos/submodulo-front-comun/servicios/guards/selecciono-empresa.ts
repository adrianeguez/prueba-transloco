import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Auth0Service} from '../auth0/auth0.service';
import {RUTAS_SELECCIONAR_EMPRESA} from '../../rutas/definicion-rutas/rutas-seleccionar-empresa';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class SeleccionoEmpresaGuardService implements CanActivate {
  constructor(private readonly _auth0Service: Auth0Service,
              private readonly _router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._auth0Service.urlRedireccion = state.url;
    const ruta = RUTAS_SELECCIONAR_EMPRESA.rutaSeleccionarEmpresa(true, false);
    if (environment.activarGuards) {
      if (this._auth0Service.seleccionoEmpresa) {
        return this._auth0Service.seleccionoEmpresa;
      } else {
        const tieneEmpresa = this._auth0Service.cargarDatosDeVariablesGlobales();
        if (tieneEmpresa) {
          const unaSolaEmpresa = this._auth0Service.revisarSiSoloTrabajaEnUnaEmpresa();
          console.log(unaSolaEmpresa);
          console.log(ruta);
          if (unaSolaEmpresa) {
            return unaSolaEmpresa;
          } else {
            this._router.navigate(ruta);
            return false;
          }
        } else {
          return tieneEmpresa;
        }
      }
    } else {
      return true;
    }
  }

}
