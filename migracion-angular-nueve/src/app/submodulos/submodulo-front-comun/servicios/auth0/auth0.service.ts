import {EventEmitter, Injectable} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';
import {RUTAS_PRINCIPAL} from '../../rutas/definicion-rutas/rutas-principal';
import {environment} from '../../../../../environments/environment';
import {MenuRestService} from '../../../submodulo-menu-lateral-front/servicios/rest/menu.service';

declare var username: string;
declare var user_id: string;
declare var email: string;
declare var email_verified: string;
declare var datosEmpresa: string;
declare var permisos: string;

@Injectable({
  providedIn: 'root',
})
export class Auth0Service {
  datosUsuario: DatosUsuarioFront = {};
  empresasEnLasQueTrabaja: EmpresaTrabaja[] = [];
  seleccionoEmpresa = false;
  empresaSeleccionada: EmpresaTrabaja = {};
  eventoSeleccionoEmpresa$: EventEmitter<EmpresaTrabaja> = new EventEmitter();
  urlRedireccion: string;
  permisos: PermisosSistemaInterface [];

  constructor(private readonly _toasterService: ToasterService,
              private readonly _router: Router,
              private readonly _menuRestService: MenuRestService) {
    const tieneEmpresa = this.cargarDatosDeVariablesGlobales();
    const cookie = accessCookie('empresaSeleccionada');
    const urlHref = window.location.href.toString().replace(environment.url + environment.port, '').replace(environment.url + ':4200', '');
    if (tieneEmpresa) {
      if (cookie) {
        try {
          const empresa = JSON.parse(cookie);
          const trabajaEnAlgunaEmpresa = this.empresasEnLasQueTrabaja.some((e) => JSON.stringify(e) === cookie);
          if (trabajaEnAlgunaEmpresa) {
            this.seleccionarEmpresa(empresa, urlHref);
          }
        } catch (e) {
          console.error({
            error: e,
            mensaje: 'Esta mal formateado'
          });
        }

      } else {
        this.revisarSiSoloTrabajaEnUnaEmpresa();
      }
    }
  }

  cargarDatosDeVariablesGlobales(): boolean {
    try {
      this.empresasEnLasQueTrabaja = JSON.parse(datosEmpresa);
      this.datosUsuario.username = username;
      this.datosUsuario.user_id = user_id;
      this.datosUsuario.email = email;
      this.datosUsuario.email_verified = email_verified;
      return true;
    } catch (e) {
      console.error({error: e, mensaje: 'No tiene empresas'});
      setTimeout(
        () => {
          this._toasterService.pop('error', 'Error', 'No trabaja en ninguna empresa');
        },
        10
      );
      return false;
    }
  }

  revisarSiSoloTrabajaEnUnaEmpresa() {
    if (this.empresasEnLasQueTrabaja.length === 1) {
      this.empresaSeleccionada = this.empresasEnLasQueTrabaja[0];
      this.seleccionoEmpresa = true;
      this.eventoSeleccionoEmpresa$.emit(this.empresaSeleccionada);
      this.permisos = this.empresaSeleccionada.permisosUsuario;
      this._menuRestService.cargarMenuUsuario(this.empresaSeleccionada.empresa.id)
        .subscribe(
          r => {
            this._menuRestService.obtenerMenuCompleto();
            this.eventoSeleccionoEmpresa$.emit(this.empresaSeleccionada);
            createCookie('empresaSeleccionada', JSON.stringify(this.empresaSeleccionada));
            const url = RUTAS_PRINCIPAL.rutaMenuPrincipal(true, false);
            this._router.navigate(url);
          },
          error => console.error(error)
        );
      return true;
    } else {
      return false;
    }
  }

  seleccionarEmpresa(empresaSeleccionada: EmpresaTrabaja, urlHref?: string) {
    this.empresaSeleccionada = empresaSeleccionada;
    this.permisos = this.empresaSeleccionada.permisosUsuario;
    this.seleccionoEmpresa = true;
    this._menuRestService.cargarMenuUsuario(this.empresaSeleccionada.empresa.id)
      .subscribe(
        r => {
          this._menuRestService.obtenerMenuCompleto();
          this.eventoSeleccionoEmpresa$.emit(this.empresaSeleccionada);
          createCookie('empresaSeleccionada', JSON.stringify(empresaSeleccionada));
          if (this.urlRedireccion || urlHref) {
            this._router.navigateByUrl(this.urlRedireccion ? this.urlRedireccion : urlHref);
          } else {
            const url = RUTAS_PRINCIPAL.rutaMenuPrincipal(true, false);
            this._router.navigate(url);
          }
        },
        error => console.error(error)
      );
  }
}

export interface DatosUsuarioFront {
  username?: string;
  user_id?: string;
  email?: string;
  email_verified?: string;
  datosEmpresa?: string;
}

export interface EmpresaTrabaja {
  'datoUsuario'?: {
    'nombres': string;
    'apellidos': string;
    'identificacionPais': string;
    'celular': string;
    'id': number;
  };
  'contactoEmpresa'?: {
    'esOperario': number;
    'esAdminPtoEmi': number;
    tipoCargo: {
      nombre: string;
      codigo: string;
      habilitado: number;
      id: number;
    }
    'id': number;
  };
  'empresa'?: {
    'id': number;
    'ruc': string;
    'nombreComercial': string;
    'razonSocial': string;
  };
  'datosVendedor'?: { 'id': number }[];
  'operarioEn'?: { 'id': number }[];
  'administradorEn'?: {
    'id': number,
    'establecimiento': number,
    'edificio': number
  }[];
  'permisosUsuario'?: {
    'rolId': number,
    'nombreRol': string,
    'permisoId': number,
    'nombrePermiso': string,
    'nombreModulo': string,
    'empresaId': number
  } [];
}

export interface PermisosSistemaInterface {
  rolId?: number;
  nombreRol?: string;
  permisoId?: number;
  nombrePermiso?: string;
  nombreModulo?: string;
  empresaId?: number;
}

function accessCookie(cookieName) {
  const name = cookieName + '=';
  const allCookieArray = document.cookie.split(';');
  for (let i = 0; i < allCookieArray.length; i++) {
    const temp = allCookieArray[i].trim();
    if (temp.indexOf(name) === 0) {
      return temp.substring(name.length, temp.length);
    }
  }
  return '';
}


function createCookie(name, value) {
  document.cookie = name + '=' + value + '' + '; path=/';
}

function readCookie(name) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, '');
}
