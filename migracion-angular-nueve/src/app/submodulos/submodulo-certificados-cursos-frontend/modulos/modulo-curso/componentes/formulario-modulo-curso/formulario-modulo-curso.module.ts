import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModuloCursoFormularioComponent} from './modulo-curso-formulario.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [
    ModuloCursoFormularioComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    TranslocoModule,
  ],
  exports: [
    ModuloCursoFormularioComponent
  ]
})
export class FormularioModuloCursoModule {
}
