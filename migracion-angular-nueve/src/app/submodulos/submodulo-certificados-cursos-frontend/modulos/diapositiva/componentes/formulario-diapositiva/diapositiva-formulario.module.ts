import Module = NodeJS.Module;
import {NgModule} from '@angular/core';
import {DiapositivaFormularioComponent} from './diapositiva-formulario.component';
import {CommonModule} from '@angular/common';
import {ManLabNgBootstrapModule} from 'man-lab-ng';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslocoModule} from '@ngneat/transloco';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DiapositivaFormularioComponent
  ],
    imports: [
        CommonModule,
        ManLabNgBootstrapModule,
        MatDialogModule,
        TranslocoModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        CalendarModule,
        NgbTimepickerModule,
    ],
  exports: [
    DiapositivaFormularioComponent,
  ],
})
export class DiapositivaFormularioModule {
}
