import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TextMaskModule } from 'angular2-text-mask';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { TableModule } from 'primeng/table';
// tslint:disable-next-line: max-line-length
import { ModalListaArticuloEmpresaModule } from './../../componentes/modales/modal-lista-articulo-empresa/modal-lista-articulo-empresa.module';
// tslint:disable-next-line: max-line-length
import { ModalListaArticuloProveedorModule } from './../../componentes/modales/modal-lista-articulo-proveedor/modal-lista-articulo-proveedor.module';
import { GrupoFormularioComponent } from './componentes/grupo-formulario/grupo-formulario.component';
import { GrupoRoutingModule } from './grupo-routing.module';
import { CrearEditarGrupoComponent } from './modales/crear-editar-grupo/crear-editar-grupo.component';
import { RutaGestionGruposComponent } from './rutas/ruta-gestion-grupos/ruta-gestion-grupos.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [
    CrearEditarGrupoComponent,
    GrupoFormularioComponent,
    RutaGestionGruposComponent,
  ],
  imports: [
    CommonModule,
    GrupoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    SelectEstadoModule,
    TextMaskModule,
    ModalListaArticuloEmpresaModule,
    ModalListaArticuloProveedorModule,
    TituloPantallaModule,
    TranslocoModule,
  ],
  entryComponents: [CrearEditarGrupoComponent],
  exports: [RutaGestionGruposComponent],
  providers: [],
})
export class GrupoModule {}
