import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorEstablecimientoRoutingModule } from './administrador-establecimiento-routing.module';
import { RutaGestionAdministradoresEstablecimientoComponent } from './rutas/ruta-gestion-administradores-establecimiento/ruta-gestion-administradores-establecimiento.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ManLabNgBootstrapModule, SelectEstadoModule} from 'man-lab-ng';
import {MatDialogModule} from '@angular/material/dialog';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import { CrearEditarAdministradorComponent } from './modales/crear-editar-administrador/crear-editar-administrador.component';
import {AdministradorEstablecimientoFormularioComponent} from './componentes/formulario-administrador-establecimiento/administrador-establecimiento-formulario.component';
import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
  declarations: [RutaGestionAdministradoresEstablecimientoComponent, CrearEditarAdministradorComponent,
  AdministradorEstablecimientoFormularioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    SelectEstadoModule,
    TituloPantallaModule,
    AdministradorEstablecimientoRoutingModule,
    AutoCompleteModule,
  ],
  entryComponents: [
    CrearEditarAdministradorComponent
  ]
})
export class AdministradorEstablecimientoModule { }
