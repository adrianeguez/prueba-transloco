import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCrearEditarCronoCabeceraComponent } from './modal-crear-editar-crono-cabecera/modal-crear-editar-crono-cabecera.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ManLabNgBootstrapModule, ModalModule } from 'man-lab-ng';
// tslint:disable-next-line:max-line-length
import { CronoVendCabeceraFormularioComponent } from '../../componentes/formularios/cronograma-cabecera/crono-vend-cabecera-formulario.component';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    ModalCrearEditarCronoCabeceraComponent,
    CronoVendCabeceraFormularioComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    AutoCompleteModule,
    ModalModule,
  ],
  entryComponents: [ModalCrearEditarCronoCabeceraComponent],
  exports: [CronoVendCabeceraFormularioComponent],
})
export class ModalCrearEditarCronoCabeceraModule {}
