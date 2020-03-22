import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorComponent } from './proveedor/proveedor.component';
import {
  ModalListaEmpresaProveedorModule,
  // tslint:disable-next-line:import-spacing
} from '../../../submodulo-empresa-front/componentes/modales/modal-lista-empresa-proveedor/modal-lista-empresa-proveedor.module';
import {
  ModalListaEmpresaProveedorComponent,
  // tslint:disable-next-line:max-line-length
} from '../../../submodulo-empresa-front/componentes/modales/modal-lista-empresa-proveedor/modal-lista-empresa-proveedor/modal-lista-empresa-proveedor.component';
import { FormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { DatosFacturaModule } from '../datos-factura/datos-factura.module';
import { TipoMovimientoModule } from '../tipo-movimiento/tipo-movimiento.module';
import { InformacionArticulosModule } from '../informacion-articulos/informacion-articulos.module';
import { InformacionImpuestosModule } from '../informacion-impuestos/informacion-impuestos.module';
import { TablaNotasCreditoModule } from '../tablas/tabla-notas-credito/tabla-notas-credito.module';
import { ArticulosModule } from '../articulos/articulos.module';

@NgModule({
  declarations: [ProveedorComponent],
  exports: [ProveedorComponent],
  imports: [
    CommonModule,
    FormsModule,
    FieldsetModule,
    TabViewModule,
    CardModule,
    ModalListaEmpresaProveedorModule,
    DatosFacturaModule,
    TipoMovimientoModule,
    InformacionArticulosModule,
    InformacionImpuestosModule,
    TablaNotasCreditoModule,
    ArticulosModule,
  ],
  entryComponents: [ModalListaEmpresaProveedorComponent],
})
export class ProveedorModule {}
