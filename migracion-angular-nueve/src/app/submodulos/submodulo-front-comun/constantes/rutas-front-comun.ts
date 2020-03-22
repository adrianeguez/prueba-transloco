import {GUARDS_FRONT_COMUN} from './guards-front-comun';
import {RutaSeleccionarEmpresaComponent} from '../rutas/ruta-seleccionar-empresa/ruta-seleccionar-empresa.component';
import {RutaConfiguracionesComponent} from '../rutas/ruta-configuraciones/ruta-configuraciones.component';
import {RutaInicioComponent} from '../rutas/ruta-inicio/ruta-inicio.component';

export const RUTAS_FRONT_COMUN = [
  {
    path: 'inicio',
    canActivate: GUARDS_FRONT_COMUN,
    component: RutaInicioComponent,
  },
  {
    path: 'configuraciones',
    canActivate: GUARDS_FRONT_COMUN,
    component: RutaConfiguracionesComponent,
  },
  {
    path: 'seleccionar-empresa',
    component: RutaSeleccionarEmpresaComponent,
  },
];
