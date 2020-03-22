import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticulosDetalleComponent } from './articulos-detalle/articulos-detalle.component';
import {TableModule} from 'primeng/table';
import {TextMaskModule} from 'angular2-text-mask';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ArticulosDetalleComponent],
  imports: [
    CommonModule,
    TableModule,
    TextMaskModule,
    FormsModule
  ],
  exports: [ArticulosDetalleComponent]
})
export class ArticulosDetalleModule { }
