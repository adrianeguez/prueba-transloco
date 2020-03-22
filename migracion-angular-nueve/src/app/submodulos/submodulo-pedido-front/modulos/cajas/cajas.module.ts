import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CajasRoutingModule} from './cajas-routing.module';
import {RutaGestionCajasComponent} from './rutas/ruta-gestion-cajas/ruta-gestion-cajas.component';
import {TableModule} from 'primeng/table';
import {FilterFechasModule, ManLabNgBootstrapModule} from 'man-lab-ng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  ModalSeleccionarEstablecimientoComponent
  // tslint:disable-next-line: max-line-length
} from '../../componentes/modales/modal-seleccionar-establecimiento/modal-seleccionar-establecimiento/modal-seleccionar-establecimiento.component';
import {
  ModalSeleccionarEstablecimientoModule
} from '../../componentes/modales/modal-seleccionar-establecimiento/modal-seleccionar-establecimiento.module';
import {
  ModalSeleccionarOperarioComponent
} from '../../componentes/modales/modal-seleccionar-operario/modal-seleccionar-operario/modal-seleccionar-operario.component';
import {ModalSeleccionarOperarioModule} from '../../componentes/modales/modal-seleccionar-operario/modal-seleccionar-operario.module';
import {ModalCrearPtoEmiOpeModule} from '../../componentes/modales/modal-crear-pto-emi-ope/modal-crear-pto-emi-ope.module';
import {
  ModalCrearPtoEmiOpeComponent
} from '../../componentes/modales/modal-crear-pto-emi-ope/modal-crear-pto-emi-ope/modal-crear-pto-emi-ope.component';
import {RutaMiCajaComponent} from './rutas/ruta-mi-caja/ruta-mi-caja.component';
import {ModalIngresarKardexCajaModule} from '../../componentes/modales/modal-ingresar-kardex-caja/modal-ingresar-kardex-caja.module';
import {
  ModalIngresarKardexCajaComponent
} from '../../componentes/modales/modal-ingresar-kardex-caja/modal-ingresar-kardex-caja/modal-ingresar-kardex-caja.component';
import {ModalCuadrarCajaModule} from '../../componentes/modales/modal-cuadrar-caja/modal-cuadrar-caja.module';
import {ModalCuadrarCajaComponent} from '../../componentes/modales/modal-cuadrar-caja/modal-cuadrar-caja/modal-cuadrar-caja.component';
import {RutaGestionVentasComponent} from './rutas/ruta-gestion-ventas/ruta-gestion-ventas.component';
import {RutaVentaModule} from '../../componentes/ruta-venta/ruta-venta.module';


@NgModule({
  declarations: [
    RutaGestionCajasComponent,
    RutaMiCajaComponent,
    RutaGestionVentasComponent
  ],
  imports: [
    CommonModule,
    CajasRoutingModule,
    TableModule,
    ManLabNgBootstrapModule,
    FilterFechasModule,
    FormsModule,
    ModalSeleccionarEstablecimientoModule,
    ModalSeleccionarOperarioModule,
    ReactiveFormsModule,
    ModalCrearPtoEmiOpeModule,
    ModalIngresarKardexCajaModule,
    ModalCuadrarCajaModule,
    RutaVentaModule,
  ],
  entryComponents: [
    ModalSeleccionarEstablecimientoComponent,
    ModalSeleccionarOperarioComponent,
    ModalCrearPtoEmiOpeComponent,
    ModalIngresarKardexCajaComponent,
    ModalCuadrarCajaComponent,
  ],
})
export class CajasModule {
}
