import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {TextMaskModule} from 'angular2-text-mask';
import {ManLabNgBootstrapModule, SelectEstadoModule} from 'man-lab-ng';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {PrecioModule} from '../precio/precio.module';
// tslint:disable-next-line: max-line-length
import {ModalListaArticuloProveedorModule} from './../../componentes/modales/modal-lista-articulo-proveedor/modal-lista-articulo-proveedor.module';
import {DetalleAdicionalModule} from './../detalle-adicional/detalle-adicional.module';
import {ArticuloRoutingModule} from './articulo-routing.module';
import {ArticuloFormularioComponent} from './componentes/articulo-formulario/articulo-formulario.component';
import {SelectTipoImpuestoComponent} from './componentes/select-tipo-impuesto/select-tipo-impuesto.component';
import {SelectUnidadMedidaComponent} from './componentes/select-unidad-medida/select-unidad-medida.component';
// tslint:disable-next-line:max-line-length
import {AsignarImpuestoComponent} from './modales/asignar-impuesto/asignar-impuesto.component';
import {AsignarUnidadMedidaComponent} from './modales/asignar-unidad-medida/asignar-unidad-medida.component';
import {CrearEditarArticuloComponent} from './modales/crear-editar-articulo/crear-editar-articulo.component';
import {RutaGestionArticulosComponent} from './rutas/ruta-gestion-articulos/ruta-gestion-articulos.component';
import {AutoCompleteModule} from 'primeng/primeng';
import {ModalListaArticuloEmpresaModule} from '../../componentes/modales/modal-lista-articulo-empresa/modal-lista-articulo-empresa.module';
import {SelectTarifaComponent} from './componentes/select-tarifa/select-tarifa.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {ArticuloFormularioModule} from './componentes/articulo-formulario/articulo-formulario.module';

@NgModule({
  declarations: [
    CrearEditarArticuloComponent,
    AsignarImpuestoComponent,
    RutaGestionArticulosComponent,
    SelectTipoImpuestoComponent,
    SelectUnidadMedidaComponent,
    AsignarUnidadMedidaComponent,
    SelectTarifaComponent,
  ],
  imports: [
    CommonModule,
    ArticuloRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    SelectEstadoModule,
    DropdownModule,
    DetalleAdicionalModule,
    PrecioModule,
    ModalListaArticuloProveedorModule,
    PanelModule,
    TextMaskModule,
    AutoCompleteModule,
    ModalListaArticuloEmpresaModule,
    TituloPantallaModule,
    ArticuloFormularioModule,
  ],
    exports: [RutaGestionArticulosComponent],
  entryComponents: [
    AsignarImpuestoComponent,
    AsignarUnidadMedidaComponent,
    CrearEditarArticuloComponent,
  ],
  providers: [],
})
export class ArticuloModule {
}
