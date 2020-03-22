import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformacionArticulosComponent } from './informacion-articulos-component/informacion-articulos.component';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
  declarations: [InformacionArticulosComponent],
  imports: [CommonModule, FieldsetModule],
  exports: [InformacionArticulosComponent],
})
export class InformacionArticulosModule {}
