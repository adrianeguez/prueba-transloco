import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListaPreguntaComponent} from './lista-pregunta/lista-pregunta.component';
import {FilterPreguntaModule} from '../filter-preguntas/filter-pregunta.module';
import {TablaPreguntaModule} from '../tabla-preguntas/tabla-pregunta.module';
import {TranslocoModule} from '@ngneat/transloco';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ListaPreguntaComponent],
  imports: [
    CommonModule,
    FilterPreguntaModule,
    TablaPreguntaModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ListaPreguntaComponent,
  ]
})
export class ListaPreguntasModule {
}
