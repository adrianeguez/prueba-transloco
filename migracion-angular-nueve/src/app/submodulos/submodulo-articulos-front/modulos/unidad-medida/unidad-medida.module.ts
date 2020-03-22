import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { DropdownModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { SelectArticuloComponent } from './componentes/select-articulo/select-articulo.component';
import { UnidadMedidaFormularioComponent } from './componentes/unidad-medida-formulario/unidad-medida-formulario.component';
import { AsignarArticuloComponent } from './modales/asignar-articulo/asignar-articulo.component';
import { CrearEditarUnidadMedidaComponent } from './modales/crear-editar-unidad-medida/crear-editar-unidad-medida.component';
import { RutaGestionUnidadMedidaComponent } from './rutas/ruta-gestion-unidad-medida/ruta-gestion-unidad-medida.component';
import { UnidadMedidaRoutingModule } from './unidad-medida-routing.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaGestionUnidadMedidaComponent,
    CrearEditarUnidadMedidaComponent,
    UnidadMedidaFormularioComponent,
    AsignarArticuloComponent,
    SelectArticuloComponent,
  ],
  imports: [
    CommonModule,
    UnidadMedidaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    SelectEstadoModule,
    DropdownModule,
    TituloPantallaModule,
  ],
  entryComponents: [CrearEditarUnidadMedidaComponent, AsignarArticuloComponent],
  exports: [RutaGestionUnidadMedidaComponent],
  providers: [],
})
export class UnidadMedidaModule {}
