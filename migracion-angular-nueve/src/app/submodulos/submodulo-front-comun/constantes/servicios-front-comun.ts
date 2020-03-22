import {Auth0Service} from '../servicios/auth0/auth0.service';
import {SeleccionoEmpresaGuardService} from '../servicios/guards/selecciono-empresa';

export const SERVICIOS_FRONT_COMUN = [
  Auth0Service,
  SeleccionoEmpresaGuardService
];
