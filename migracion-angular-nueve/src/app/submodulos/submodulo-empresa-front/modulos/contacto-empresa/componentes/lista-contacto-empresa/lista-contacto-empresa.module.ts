import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaContactosEmpresaComponent } from './lista-contactos-empresa/lista-contactos-empresa.component';
import {FilterContactoEmpresaModule} from '../filter-contacto-empresa/filter-contacto-empresa.module';
import {TablaContactoEmpresModule} from '../tabla-contacto-empres/tabla-contacto-empres.module';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [ListaContactosEmpresaComponent],
  imports: [
    CommonModule,
    FilterContactoEmpresaModule,
    TablaContactoEmpresModule,
    TranslocoModule,
  ],
  exports: [
    ListaContactosEmpresaComponent
  ]
})
export class ListaContactoEmpresaModule { }
