import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InformacionTributariaFormularioComponent} from './informacion-tributaria-formulario.component';
import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
  declarations: [
    InformacionTributariaFormularioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
  ],
  exports: [
    InformacionTributariaFormularioComponent
  ]
})
export class FormularioInformacionTributariaModule { }
