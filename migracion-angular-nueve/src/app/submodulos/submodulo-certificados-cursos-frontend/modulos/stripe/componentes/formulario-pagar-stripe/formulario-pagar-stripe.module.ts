import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagarStripeComponent} from './pagar-stripe/pagar-stripe.component';
import {CheckboxModule, RadioButtonModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [
    PagarStripeComponent
  ],
  imports: [
    CommonModule,
    RadioButtonModule,
    FormsModule,
    MatRadioModule,
    CheckboxModule,
    TranslocoModule,
  ],
  entryComponents: [PagarStripeComponent],
  exports: [
    PagarStripeComponent
  ]
})
export class FormularioPagarStripeModule {
}
