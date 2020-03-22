import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {ConfirmacionModule, ManLabNgBootstrapModule, ModalConfirmacionComponent} from 'man-lab-ng';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { SelectCiudadModule } from '../../componentes/select-ciudad/select-ciudad.module';
import { SelectZonaModule } from '../../componentes/select-zona/select-zona.module';
import { DragDropVendedorRutaComponent } from './componentes/drag-drop-vendedor-ruta/drag-drop-vendedor-ruta.component';
import { AsignarVendedorRutaComponent } from './modales/asignar-vendedor-ruta/asignar-vendedor-ruta.component';
import { RutaClienteRoutingModule } from './ruta-cliente-routing.module';
import { RutaAsignacionVendedorEmpresaComponent } from './rutas/ruta-asignacion-vendedor-empresa/ruta-asignacion-vendedor-empresa.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaAsignacionVendedorEmpresaComponent,
    DragDropVendedorRutaComponent,
    AsignarVendedorRutaComponent,
  ],
  imports: [
    CommonModule,
    RutaClienteRoutingModule,
    DropdownModule,
    ReactiveFormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    DragDropModule,
    SelectCiudadModule,
    SelectZonaModule,
    ConfirmacionModule,
    TituloPantallaModule,
  ],
  entryComponents: [AsignarVendedorRutaComponent, ModalConfirmacionComponent],
  exports: [RutaAsignacionVendedorEmpresaComponent],
})
export class RutaClienteModule {}
