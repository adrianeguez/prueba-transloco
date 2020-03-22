import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ManLabNgBootstrapModule, ModalModule} from 'man-lab-ng';
import { MatDialogModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { RutaGestionUsuarioComponent } from './rutas/ruta-gestion-usuario/ruta-gestion-usuario.component';
import { CrearEditarUsuarioComponent } from './modales/crear-editar-usuario/crear-editar-usuario.component';
import { SelectUsuarioModule } from '../../componentes/select-usuario/select-usuario.module';
import { FilterUsuarioModule } from '../../componentes/filter-usuario/filter-usuario.module';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { TableModule } from 'primeng/table';
import {DatosUsuarioRestService} from '../../servicios/rest/datos-usuario-rest.service';
import {Auth0Service} from '../../servicios/rest/auth0.service';
import {DatosContactoModule} from '../../../submodulo-empresa-front/modulos/datos-contacto/datos-contacto.module';
import {CrearEditarUsuarioModule} from './modales/crear-editar-usuario/crear-editar-usuario.module';

@NgModule({
  declarations: [
    RutaGestionUsuarioComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TextMaskModule,
    SelectUsuarioModule,
    FilterUsuarioModule,
    UsuarioRoutingModule,
    TableModule,
    ModalModule,
    DatosContactoModule,
    CrearEditarUsuarioModule.forRoot(),
  ],
  entryComponents: [],
  providers: [],
})
export class UsuarioModule {}
