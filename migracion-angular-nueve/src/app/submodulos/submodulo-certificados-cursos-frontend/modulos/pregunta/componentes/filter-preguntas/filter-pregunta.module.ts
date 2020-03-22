import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FilterPreguntaComponent} from './filter-pregunta/filter-pregunta.component';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [
    FilterPreguntaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslocoModule
  ],
  exports: [
    FilterPreguntaComponent,
  ]
})
export class FilterPreguntaModule { }
