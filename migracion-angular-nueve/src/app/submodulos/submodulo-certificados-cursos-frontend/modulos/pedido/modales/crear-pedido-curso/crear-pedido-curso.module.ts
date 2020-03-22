import {NgModule} from '@angular/core';
import {CrearEditarPedidoCursoComponent} from './crear-editar-pedido-curso/crear-editar-pedido-curso.component';
import {CommonModule} from '@angular/common';
import {PedidoRoutingModule} from '../../pedido-routing.module';
import {ManLabNgBootstrapModule, ManLabNgModule} from 'man-lab-ng';
import {TableModule} from 'primeng/table';
import {TituloPantallaModule} from '../../../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {FormsModule} from '@angular/forms';
import {TranslocoModule} from '@ngneat/transloco';
import {PedidoFormularioModule} from '../../componentes/pedido-formulario/pedido-formulario.module';
import {MatDialogModule} from '@angular/material/dialog';
import {StripeModule} from '../../../stripe/stripe.module';
import {FormularioPagarStripeModule} from '../../../stripe/componentes/formulario-pagar-stripe/formulario-pagar-stripe.module';

@NgModule({
  declarations: [CrearEditarPedidoCursoComponent],
    imports: [
        CommonModule,
        ManLabNgBootstrapModule,
        TableModule,
        TituloPantallaModule,
        FormsModule,
        MatDialogModule,
        ManLabNgModule,
        TranslocoModule,
        ManLabNgBootstrapModule,
        PedidoFormularioModule,
        StripeModule,
        FormularioPagarStripeModule,
    ],
  exports: [CrearEditarPedidoCursoComponent],
  entryComponents: [CrearEditarPedidoCursoComponent],
})
export class CrearPedidoCursoModule {
}
