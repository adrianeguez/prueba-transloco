import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import {ConfirmacionModule, ManLabNgBootstrapModule, ModalConfirmacionComponent} from 'man-lab-ng';
import { TableModule } from 'primeng/table';
import { DetalleAdicionalFormularioComponent } from './componentes/detalle-adicional-formulario/detalle-adicional-formulario.component';
import { DetalleAdicionalRoutingModule } from './detalle-adicional-routing.module';
import { CrearEditarDetalleAdicionalComponent } from './modales/crear-editar-detalle-adicional/crear-editar-detalle-adicional.component';
import { RutaGestionDetalleAdicionalComponent } from './rutas/ruta-gestion-detalle-adicional/ruta-gestion-detalle-adicional.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    DetalleAdicionalFormularioComponent,
    RutaGestionDetalleAdicionalComponent,
    CrearEditarDetalleAdicionalComponent,
  ],
  imports: [
    CommonModule,
    DetalleAdicionalRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    TextMaskModule,
    ConfirmacionModule,
    TituloPantallaModule
  ],
  entryComponents: [CrearEditarDetalleAdicionalComponent, ModalConfirmacionComponent],
  exports: [
    RutaGestionDetalleAdicionalComponent,
    DetalleAdicionalFormularioComponent,
  ],
  providers: [],
})
export class DetalleAdicionalModule {}
