import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosFacturaComponent } from './datos-factura-component/datos-factura.component';
import { CalendarModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DatosFacturaComponent],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    FieldsetModule,
    NgbDatepickerModule,
  ],
  exports: [DatosFacturaComponent],
})
export class DatosFacturaModule {}
