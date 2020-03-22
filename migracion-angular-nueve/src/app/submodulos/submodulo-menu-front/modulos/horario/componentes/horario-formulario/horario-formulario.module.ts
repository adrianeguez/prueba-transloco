import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { HorarioFormularioComponent } from './horario-formulario.component';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [HorarioFormularioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    AutoCompleteModule,
  ],
  exports: [HorarioFormularioComponent],
})
export class HorarioFormularioModule {}
