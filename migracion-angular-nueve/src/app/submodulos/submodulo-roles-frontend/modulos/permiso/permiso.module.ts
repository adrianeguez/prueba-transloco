import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmacionModule, ManLabNgBootstrapModule, ModalConfirmacionComponent} from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterPermisoNombreModule } from '../../componentes/filter-permiso-nombre/filter-permiso-nombre.module';
import { NombrePermisoModule } from './componentes/nombre-permiso/nombre-permiso.module';
import { TableModule } from 'primeng/table';
import { CrearEditarNombrePermisoComponent } from './modales/crear-editar-nombre-permiso/crear-editar-nombre-permiso.component';
import { SelectNivelMenuModule } from '../../componentes/select-nivel-menu/select-nivel-menu.module';
import { SelectRolesModule } from '../../componentes/select-roles/select-roles.module';
import { RutaGestionNombrePermisoComponent } from './rutas/ruta-gestion-nombre-permiso/ruta-gestion-nombre-permiso.component';
import { RutaGestionUsuarioRolComponent } from './rutas/ruta-gestion-usuario-rol/ruta-gestion-usuario-rol.component';
import { SelectUsuarioModule } from '../../componentes/select-usuario/select-usuario.module';
import { PermisoRoutingModule } from './permiso-routing.module';
import { RutaGestionPermisoRolComponent } from './rutas/ruta-gestion-permiso-rol/ruta-gestion-permiso-rol.component';
import { RutaGestionRolMenuComponent } from './rutas/ruta-gestion-rol-menu/ruta-gestion-rol-menu.component';
import { RutaInicioPermisosComponent } from './rutas/ruta-inicio-permisos/ruta-inicio-permisos.component';
import {PermisoNombreRestService} from '../../servicios/rest/permiso-nombre-rest.service';
import {UsuarioRolRestService} from '../../servicios/rest/usuario-rol.service';
import {RolModule} from '../rol/rol.module';
import {UsuarioModule} from '../usuario/usuario.module';
import {PermisoRolRestService} from '../../servicios/rest/permiso-rol.service';

@NgModule({
  declarations: [
    RutaGestionNombrePermisoComponent,
    CrearEditarNombrePermisoComponent,
    RutaGestionUsuarioRolComponent,
    RutaGestionPermisoRolComponent,
    RutaGestionRolMenuComponent,
    RutaInicioPermisosComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    FilterPermisoNombreModule,
    NombrePermisoModule,
    TableModule,
    SelectNivelMenuModule,
    SelectRolesModule,
    SelectUsuarioModule,
    PermisoRoutingModule,
    RolModule,
    UsuarioModule,
    ConfirmacionModule
  ],
  entryComponents: [CrearEditarNombrePermisoComponent, ModalConfirmacionComponent],
  providers: [
    PermisoNombreRestService,
    UsuarioRolRestService,
    PermisoRolRestService
  ],
})
export class PermisoModule {}
