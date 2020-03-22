import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferenciaComponent } from './transferencia/transferencia.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {
  ModalListaBodegasModule
} from '../../../submodulo-empresa-front/componentes/modales/modal-lista-bodegas/modal-lista-bodegas.module';
import {
  ModalListaBodegasComponent
} from '../../../submodulo-empresa-front/componentes/modales/modal-lista-bodegas/modal-lista-bodegas/modal-lista-bodegas.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TransferenciaComponent],
  exports: [TransferenciaComponent],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    ModalListaBodegasModule,
    FormsModule,
  ],
  entryComponents: [ModalListaBodegasComponent],
})
export class TransferenciaModule {}
