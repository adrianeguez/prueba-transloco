import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoMovimientoComponent } from './tipo-movimiento-component/tipo-movimiento.component';
import { CalendarModule, DropdownModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TipoMovimientoComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    NgbDatepickerModule,
  ],
  exports: [TipoMovimientoComponent],
})
export class TipoMovimientoModule {}
