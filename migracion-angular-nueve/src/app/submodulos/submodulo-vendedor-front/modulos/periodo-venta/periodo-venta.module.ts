import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodoVentaRoutingModule } from './periodo-venta-routing.module';
import { RutaGestionPeriodoVentaComponent } from './rutas/ruta-gestion-periodo-venta/ruta-gestion-periodo-venta.component';
import { CrearEditarPeriodoVentaComponent } from './modales/crear-editar-periodo-venta/crear-editar-periodo-venta.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  ConfirmacionModule,
  FilterFechasModule,
  ManLabNgBootstrapModule, ModalConfirmacionComponent,
  SelectEstadoModule,
} from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { TableModule } from 'primeng/table';
import { PeriodoVentaFormularioComponent } from './componentes/periodo-venta-formulario/periodo-venta-formulario.component';
import { TextMaskModule } from 'angular2-text-mask';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import { SelectPeriodoMigrarComponent } from './componentes/select-periodo-migrar/select-periodo-migrar.component';
import {AutoCompleteModule} from 'primeng/primeng';
import { ModalPeriodoVentaMigrarComponent } from './modales/modal-periodo-venta-migrar/modal-periodo-venta-migrar.component';
import { NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    RutaGestionPeriodoVentaComponent,
    CrearEditarPeriodoVentaComponent,
    PeriodoVentaFormularioComponent,
    SelectPeriodoMigrarComponent,
    ModalPeriodoVentaMigrarComponent,
  ],
  imports: [
    CommonModule,
    PeriodoVentaRoutingModule,
    ReactiveFormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    SelectEstadoModule,
    TextMaskModule,
    FilterFechasModule,
    TituloPantallaModule,
    ConfirmacionModule,
    AutoCompleteModule,
    NgbDatepickerModule,
  ],
  entryComponents: [CrearEditarPeriodoVentaComponent, ModalConfirmacionComponent, ModalPeriodoVentaMigrarComponent],
  exports: [RutaGestionPeriodoVentaComponent],
})
export class PeriodoVentaModule {}
