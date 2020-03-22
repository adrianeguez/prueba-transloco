import Module = NodeJS.Module;
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManLabNgBootstrapModule} from 'man-lab-ng';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslocoModule} from '@ngneat/transloco';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ArticuloFormularioComponent} from './articulo-formulario.component';

@NgModule({
  declarations: [
    ArticuloFormularioComponent
  ],
  imports: [
    CommonModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TranslocoModule,
    ReactiveFormsModule,
    AutoCompleteModule,
  ],
  exports: [
    ArticuloFormularioComponent,
  ],
})
export class ArticuloFormularioModule {
}
