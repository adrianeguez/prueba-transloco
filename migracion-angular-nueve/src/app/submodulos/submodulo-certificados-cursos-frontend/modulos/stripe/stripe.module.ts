import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StripeRoutingModule} from './stripe-routing.module';
import {PagarStripeComponent} from './componentes/formulario-pagar-stripe/pagar-stripe/pagar-stripe.component';
import {RadioButtonModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {FormularioPagarStripeModule} from './componentes/formulario-pagar-stripe/formulario-pagar-stripe.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    StripeRoutingModule,
    FormsModule,
    FormularioPagarStripeModule,
  ],
  entryComponents: [
  ],
  exports: [
  ]
})
export class StripeModule {
}
