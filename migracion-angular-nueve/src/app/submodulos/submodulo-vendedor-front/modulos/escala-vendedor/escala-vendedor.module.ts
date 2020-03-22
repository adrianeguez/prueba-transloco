import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { TableModule } from 'primeng/table';
import { EscalaVendedorFormularioComponent } from './componentes/escala-vendedor-formulario/escala-vendedor-formulario.component';
import { EscalaVendedorRoutingModule } from './escala-vendedor-routing.module';
import { CrearEditarEscalaVendedorComponent } from './modales/crear-editar-escala-vendedor/crear-editar-escala-vendedor.component';
import { RutaGestionEscalaVendedorComponent } from './rutas/ruta-gestion-escala-vendedor/ruta-gestion-escala-vendedor.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaGestionEscalaVendedorComponent,
    CrearEditarEscalaVendedorComponent,
    EscalaVendedorFormularioComponent,
  ],
  imports: [
    CommonModule,
    EscalaVendedorRoutingModule,
    ReactiveFormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    SelectEstadoModule,
    TextMaskModule,
    TituloPantallaModule,
  ],
  entryComponents: [CrearEditarEscalaVendedorComponent],
  exports: [RutaGestionEscalaVendedorComponent],
})
export class EscalaVendedorModule {}
