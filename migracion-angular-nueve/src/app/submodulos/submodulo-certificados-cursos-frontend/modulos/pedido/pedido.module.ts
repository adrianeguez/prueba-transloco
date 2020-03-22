import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PedidoRoutingModule} from './pedido-routing.module';
import {RutaGestionPedidoCursoComponent} from './rutas/ruta-gestion-pedido-curso/ruta-gestion-pedido-curso.component';
import {CrearEditarPedidoCursoComponent} from './modales/crear-pedido-curso/crear-editar-pedido-curso/crear-editar-pedido-curso.component';
import {MatDialogModule} from '@angular/material';
import {TableModule} from 'primeng/table';
import {ManLabNgBootstrapModule, ManLabNgModule} from 'man-lab-ng';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import { RutaRealizarPedidoComponent } from './rutas/ruta-realizar-pedido/ruta-realizar-pedido.component';
import {FormsModule} from '@angular/forms';
import {PedidoFormularioModule} from './componentes/pedido-formulario/pedido-formulario.module';
import {TranslocoModule} from '@ngneat/transloco';
import {CrearPedidoCursoModule} from './modales/crear-pedido-curso/crear-pedido-curso.module';
import {StripeModule} from '../stripe/stripe.module';
import {FormularioPagarStripeModule} from '../stripe/componentes/formulario-pagar-stripe/formulario-pagar-stripe.module';

@NgModule({
  declarations: [
    RutaGestionPedidoCursoComponent,
    RutaRealizarPedidoComponent,
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    ManLabNgBootstrapModule,
    TableModule,
    TituloPantallaModule,
    FormsModule,
    MatDialogModule,
    ManLabNgModule,
    TranslocoModule,
    ManLabNgBootstrapModule,
    CrearPedidoCursoModule,
    FormularioPagarStripeModule,
  ],
  entryComponents: [
  ]
})
export class PedidoModule {
}
