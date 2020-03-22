import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalListarPreciosComponent} from './modal-listar-precios/modal-listar-precios.component';
import {ManLabNgModule, ModalModule, SelectEstadoModule} from 'man-lab-ng';
import {ListaPrecioModule} from '../../componentes/lista-precio/lista-precio.module';
import {MatDialogModule} from '@angular/material/dialog';
import {TituloPantallaModule} from '../../../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [ModalListarPreciosComponent],
  imports: [
    CommonModule,
    ListaPrecioModule,
    MatDialogModule,
    TituloPantallaModule,
    FormsModule,
    ReactiveFormsModule,
    ManLabNgModule,
    ModalModule,
    TranslocoModule
  ],
  entryComponents: [ModalListarPreciosComponent],
  exports: [ModalListarPreciosComponent]
})
export class ModalListarPreciosModule {
}
