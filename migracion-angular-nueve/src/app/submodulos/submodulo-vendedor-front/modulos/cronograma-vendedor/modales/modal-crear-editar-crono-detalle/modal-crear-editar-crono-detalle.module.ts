import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCrearEditarCronoDetalleComponent } from './modal-crear-editar-crono-detalle/modal-crear-editar-crono-detalle.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { ManLabNgBootstrapModule, ManLabNgModule } from 'man-lab-ng';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
// tslint:disable-next-line:max-line-length
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CronoVendDetalleFormularioComponent } from '../../componentes/formularios/cronograma-detalle/crono-vend-detalle-formulario.component';

@NgModule({
  declarations: [
    ModalCrearEditarCronoDetalleComponent,
    CronoVendDetalleFormularioComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    AutoCompleteModule,
    NgbDatepickerModule,
    ManLabNgModule,
  ],
  entryComponents: [ModalCrearEditarCronoDetalleComponent],
  exports: [CronoVendDetalleFormularioComponent],
})
export class ModalCrearEditarCronoDetalleModule {}
