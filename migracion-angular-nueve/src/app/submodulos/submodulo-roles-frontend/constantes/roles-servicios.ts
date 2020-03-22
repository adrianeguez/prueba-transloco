import { MenuRestService } from '../../submodulo-menu-lateral-front/servicios/rest/menu.service';
import { PermisoNombreRestService } from '../servicios/rest/permiso-nombre-rest.service';
import { PermisoRolRestService } from '../servicios/rest/permiso-rol.service';
import { RolRestService } from '../servicios/rest/rol.service';
import { RolMenuRestService } from '../servicios/rest/rol-menu.service';
import { DatosUsuarioRestService } from '../servicios/rest/datos-usuario-rest.service';
import { UsuarioRolRestService } from '../servicios/rest/usuario-rol.service';

export const ROLES_SERVICIOS = [
  MenuRestService,
  PermisoNombreRestService,
  PermisoRolRestService,
  RolRestService,
  RolMenuRestService,
  DatosUsuarioRestService,
  UsuarioRolRestService,
];
