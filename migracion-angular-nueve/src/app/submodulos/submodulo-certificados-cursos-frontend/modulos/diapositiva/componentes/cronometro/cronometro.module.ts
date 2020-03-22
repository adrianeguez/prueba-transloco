import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CronometroComponent} from './cronometro.component';
import {ConvertirTiempoPipe} from './convertirTiempo.pipe';

@NgModule({
  declarations: [
    CronometroComponent,
    ConvertirTiempoPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CronometroComponent,
    ConvertirTiempoPipe
  ]
})
export class CronometroModule { }
