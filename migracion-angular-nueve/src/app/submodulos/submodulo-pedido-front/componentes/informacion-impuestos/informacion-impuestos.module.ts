import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformacionImpuestosComponent } from './informacion-impuestos/informacion-impuestos.component';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
  declarations: [InformacionImpuestosComponent],
  imports: [
    CommonModule,
    TabViewModule,
    FormsModule,
    CardModule,
    FieldsetModule,
  ],
  exports: [InformacionImpuestosComponent],
})
export class InformacionImpuestosModule {}
