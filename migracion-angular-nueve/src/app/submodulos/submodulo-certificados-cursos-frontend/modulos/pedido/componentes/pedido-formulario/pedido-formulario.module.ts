import {NgModule} from '@angular/core';
import {PedidoFormularioComponent} from './pedido-formulario.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ManLabNgBootstrapModule, ManLabNgModule} from 'man-lab-ng';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslocoModule, TranslocoService} from '@ngneat/transloco';
import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
  declarations: [PedidoFormularioComponent],
  imports: [
    CommonModule,
    FormsModule,
    ManLabNgBootstrapModule,
    ManLabNgModule,
    MatDialogModule,
    MatDialogModule,
    TranslocoModule,
    ReactiveFormsModule,
    AutoCompleteModule,
  ],
  exports: [PedidoFormularioComponent]
})
export class PedidoFormularioModule {
}
