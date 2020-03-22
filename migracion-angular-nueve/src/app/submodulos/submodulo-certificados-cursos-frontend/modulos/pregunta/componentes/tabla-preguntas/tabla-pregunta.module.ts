import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {TablaPreguntaComponent} from './tabla-pregunta/tabla-pregunta.component';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [
    TablaPreguntaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    TranslocoModule
  ],
  exports: [
    TablaPreguntaComponent,
  ]
})
export class TablaPreguntaModule {
}
