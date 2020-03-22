import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCalificacionesComponent } from './select-calificaciones/select-calificaciones.component';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [SelectCalificacionesComponent],
  imports: [CommonModule, DropdownModule],
  exports: [SelectCalificacionesComponent],
})
export class SelectCalificacionesModule { }
