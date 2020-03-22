import {NgModule} from '@angular/core';
import {ContenidoFormularioComponent} from './contenido-formulario.component';
import {CommonModule} from '@angular/common';
import {ManLabNgBootstrapModule} from 'man-lab-ng';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslocoModule} from '@ngneat/transloco';
import {ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ContenidoFormularioComponent
  ],
  imports: [
    CommonModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TranslocoModule,
    ReactiveFormsModule,
  ],
  exports: [
    ContenidoFormularioComponent
  ]
})
export class ContenidoFormularioModule {

}
