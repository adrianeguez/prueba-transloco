import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagarStripeComponent} from './componentes/formulario-pagar-stripe/pagar-stripe/pagar-stripe.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StripeRoutingModule { }
