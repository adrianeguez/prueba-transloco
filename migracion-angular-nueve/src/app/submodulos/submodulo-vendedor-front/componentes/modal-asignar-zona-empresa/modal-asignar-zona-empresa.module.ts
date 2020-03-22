import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAsignarZonaEmpresaComponent } from './modal-asignar-zona-empresa/modal-asignar-zona-empresa.component';
import { SelectZonaModule } from '../select-zona/select-zona.module';
import { SelectCiudadModule } from '../select-ciudad/select-ciudad.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ModalAsignarZonaEmpresaComponent],
  imports: [
    CommonModule,
    SelectCiudadModule,
    SelectZonaModule,
    MatDialogModule,
  ],
  exports: [ModalAsignarZonaEmpresaComponent],
  entryComponents: [ModalAsignarZonaEmpresaComponent],
})
export class ModalAsignarZonaEmpresaModule {}
