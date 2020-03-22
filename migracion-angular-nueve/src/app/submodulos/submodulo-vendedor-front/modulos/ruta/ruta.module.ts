import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { AutoCompleteModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { RutaVendedorFormularioComponent } from './componentes/ruta-formulario/ruta-vendedor-formulario.component';
import { CrearEditarRutaVendedorComponent } from './modales/crear-editar-ruta-vendedor/crear-editar-ruta-vendedor.component';
import { RutaRoutingModule } from './ruta-routing.module';
import { RutaGestionRutaComponent } from './rutas/ruta-gestion-ruta/ruta-gestion-ruta.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaGestionRutaComponent,
    CrearEditarRutaVendedorComponent,
    RutaVendedorFormularioComponent,
  ],
  imports: [
    CommonModule,
    RutaRoutingModule,
    ReactiveFormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    SelectEstadoModule,
    AutoCompleteModule,
    TituloPantallaModule,
  ],
  entryComponents: [CrearEditarRutaVendedorComponent],
  exports: [RutaGestionRutaComponent],
})
export class RutaModule {}
