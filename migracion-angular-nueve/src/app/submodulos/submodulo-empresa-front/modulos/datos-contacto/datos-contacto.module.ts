import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosContactoFormularioComponent } from './componentes/formulario-datos-contacto/datos-contacto-formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { RutaGestionDatosContactoComponent } from './rutas/ruta-gestion-datos-contacto/ruta-gestion-datos-contacto.component';
import { CrearEditarDatosContactoComponent } from './modales/crear-editar-datos-contacto/crear-editar-datos-contacto.component';
import { DatosContactoRoutingModule } from './datos-contacto-routing.module';
import { DropdownModule } from 'primeng/primeng';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    DatosContactoFormularioComponent,
    RutaGestionDatosContactoComponent,
    CrearEditarDatosContactoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    DatosContactoRoutingModule,
    SelectEstadoModule,
    DropdownModule,
    TituloPantallaModule,
  ],
  exports: [RutaGestionDatosContactoComponent],
  entryComponents: [CrearEditarDatosContactoComponent],
  providers: [],
})
export class DatosContactoModule {}
