import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManLabNgBootstrapModule} from 'man-lab-ng';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslocoModule} from '@ngneat/transloco';
import {ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {PruebaFormularioComponent} from './prueba-formulario.component';

@NgModule({
  declarations: [
    PruebaFormularioComponent
  ],
  imports: [
    CommonModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TranslocoModule,
    ReactiveFormsModule,
    CalendarModule,
    NgbTimepickerModule,
  ],
  exports: [
    PruebaFormularioComponent
  ],
})
export class PruebaFormularioModule {
}
