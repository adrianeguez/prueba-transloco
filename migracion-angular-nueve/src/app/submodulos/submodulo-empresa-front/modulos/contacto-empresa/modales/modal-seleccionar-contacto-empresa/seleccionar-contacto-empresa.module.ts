import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalSeleccionarContactoEmpresaComponent} from './seleccionar-contacto-empresa/modal-seleccionar-contacto-empresa.component';
import {ListaContactosEmpresaComponent} from '../../componentes/lista-contacto-empresa/lista-contactos-empresa/lista-contactos-empresa.component';
import {ListaContactoEmpresaModule} from '../../componentes/lista-contacto-empresa/lista-contacto-empresa.module';
import {ManLabNgBootstrapModule, ManLabNgModule} from 'man-lab-ng';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [
    ModalSeleccionarContactoEmpresaComponent
  ],
  imports: [
    CommonModule,
    ListaContactoEmpresaModule,
    ManLabNgModule,
    FormsModule,
    MatDialogModule,
    ManLabNgBootstrapModule,
    TranslocoModule,
  ],
  exports: [
    ModalSeleccionarContactoEmpresaComponent,
  ],
  entryComponents: [
    ModalSeleccionarContactoEmpresaComponent,
  ]
})
export class SeleccionarContactoEmpresaModule { }
