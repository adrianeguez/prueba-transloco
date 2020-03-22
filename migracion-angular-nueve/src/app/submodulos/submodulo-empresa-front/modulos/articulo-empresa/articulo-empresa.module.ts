import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticuloEmpresaRoutingModule } from './articulo-empresa-routing.module';
import { GestionArticulosEmpresaComponent } from './rutas/gestion-articulos-empresa/gestion-articulos-empresa.component';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { ModalListaArticuloEmpresaModule } from '../../../submodulo-articulos-front/componentes/modales/modal-lista-articulo-empresa/modal-lista-articulo-empresa.module';
// tslint:disable-next-line:max-line-length
import { ModalListaArticuloEmpresaComponent } from '../../../submodulo-articulos-front/componentes/modales/modal-lista-articulo-empresa/modal-lista-articulo-empresa/modal-lista-articulo-empresa.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [GestionArticulosEmpresaComponent],
  imports: [
    CommonModule,
    ArticuloEmpresaRoutingModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    SelectEstadoModule,
    ReactiveFormsModule,
    ModalListaArticuloEmpresaModule,
    TituloPantallaModule,
  ],
  entryComponents: [ModalListaArticuloEmpresaComponent],
})
export class ArticuloEmpresaModule {}
