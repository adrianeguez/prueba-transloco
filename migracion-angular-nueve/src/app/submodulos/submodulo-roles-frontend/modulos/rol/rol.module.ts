import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManLabNgBootstrapModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material';
import { RolFormularioComponent } from './componentes/rol-formulario/rol-formulario.component';
import { RutaGestionRolesComponent } from './rutas/ruta-gestion-roles/ruta-gestion-roles.component';
import { CrearEditarRolComponent } from './modales/crear-editar-rol/crear-editar-rol.component';
import { FilterRolModule } from '../../componentes/filter-rol/filter-rol.module';
import { TableModule } from 'primeng/table';
import { RolRoutingModule } from './rol-routing.module';
import {RolRestService} from '../../servicios/rest/rol.service';

@NgModule({
  declarations: [
    RolFormularioComponent,
    RutaGestionRolesComponent,
    CrearEditarRolComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    FilterRolModule,
    TableModule,
    RolRoutingModule,
  ],
  entryComponents: [CrearEditarRolComponent],
  providers: [
    RolRestService
  ],
})
export class RolModule {}
