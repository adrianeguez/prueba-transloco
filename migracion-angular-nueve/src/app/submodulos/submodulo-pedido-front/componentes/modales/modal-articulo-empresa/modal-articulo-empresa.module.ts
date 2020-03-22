import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalArticuloEmpresaComponent } from './modal-articulo-empresa/modal-articulo-empresa.component';
import { MatDialogModule } from '@angular/material/dialog';
import {ListaArticuloEmpresaModule} from '../../lista-articulo-empresa/lista-articulo-empresa.module';

@NgModule({
  declarations: [ModalArticuloEmpresaComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ListaArticuloEmpresaModule
  ]
})
export class ModalArticuloEmpresaModule { }
