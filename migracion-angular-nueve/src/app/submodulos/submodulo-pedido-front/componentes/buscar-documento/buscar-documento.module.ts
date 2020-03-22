import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarDocumentoComponent } from './buscar-documento-component/buscar-documento.component';

@NgModule({
  declarations: [BuscarDocumentoComponent],
  imports: [CommonModule],
  exports: [BuscarDocumentoComponent],
})
export class BuscarDocumentoModule {}
