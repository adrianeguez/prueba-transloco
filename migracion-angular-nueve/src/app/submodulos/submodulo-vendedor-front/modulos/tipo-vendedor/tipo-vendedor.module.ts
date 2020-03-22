import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { TableModule } from 'primeng/table';
import { TipoVendedorFormularioComponent } from './componentes/tipo-vendedor-formulario/tipo-vendedor-formulario.component';
import { CrearEditarTipoVendedorComponent } from './modales/crear-editar-tipo-vendedor/crear-editar-tipo-vendedor.component';
import { RutaGestionTipoVendedorComponent } from './rutas/ruta-gestion-tipo-vendedor/ruta-gestion-tipo-vendedor.component';
import { TipoVendedorRoutingModule } from './tipo-vendedor-routing.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaGestionTipoVendedorComponent,
    CrearEditarTipoVendedorComponent,
    TipoVendedorFormularioComponent,
  ],
  imports: [
    CommonModule,
    TipoVendedorRoutingModule,
    ReactiveFormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    SelectEstadoModule,
    TituloPantallaModule,
  ],
  entryComponents: [CrearEditarTipoVendedorComponent],
  exports: [RutaGestionTipoVendedorComponent],
})
export class TipoVendedorModule {}
