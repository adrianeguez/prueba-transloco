import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { ManLabNgBootstrapModule } from 'man-lab-ng';
import { DragDropModule, DropdownModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { SelectCiudadModule } from '../../componentes/select-ciudad/select-ciudad.module';
import { SelectZonaModule } from '../../componentes/select-zona/select-zona.module';
import { SelectVendedorComponent } from './componentes/select-vendedor/select-vendedor.component';
import { MonitoreoVendedoresRoutingModule } from './monitoreo-vendedores-routing.module';
import { RutaMonitoreoVendedoresComponent } from './rutas/ruta-monitoreo-vendedores/ruta-monitoreo-vendedores.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [RutaMonitoreoVendedoresComponent, SelectVendedorComponent],
  imports: [
    CommonModule,
    MonitoreoVendedoresRoutingModule,
    DropdownModule,
    ReactiveFormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    DragDropModule,
    SelectCiudadModule,
    SelectZonaModule,
    TituloPantallaModule,
  ],
  exports: [RutaMonitoreoVendedoresComponent],
})
export class MonitoreoVendedoresModule {}
