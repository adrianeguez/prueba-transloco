import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutaMenuCargasMasivasComponent } from './rutas/ruta-menu-cargas-masivas/ruta-menu-cargas-masivas.component';
import { CargasMasivasRoutingModule } from './cargas-masivas-routing.module';
import { RutaGestionCargasMasivasComponent } from './rutas/ruta-gestion-cargas-masivas/ruta-gestion-cargas-masivas.component';
import { TableModule } from 'primeng/table';
import { FilterFechasModule, ManLabNgBootstrapModule } from 'man-lab-ng';
import { RutaCargaMasivaComponent } from './rutas/ruta-carga-masiva/ruta-carga-masiva.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalListaArticuloProveedorModule } from '../../../submodulo-articulos-front/componentes/modales/modal-lista-articulo-proveedor/modal-lista-articulo-proveedor.module';
import { ModalListaArticulosComponent } from './modales/modal-lista-articulos/modal-lista-articulos/modal-lista-articulos.component';
import { ModalListaArticulosModule } from './modales/modal-lista-articulos/modal-lista-articulos.module';
import { CargaMasivaIdEdificioComponent } from './componentes/carga-masiva-id-edificio/carga-masiva-id-edificio.component';
import { CargaMasivaIdPisoComponent } from './componentes/carga-masiva-id-piso/carga-masiva-id-piso.component';
import { CargaMasivaIdContactoEmpresaComponent } from './componentes/carga-masiva-id-contacto-empresa/carga-masiva-id-contacto-empresa.component';
import { CargaMasivaIdGrupoComponent } from './componentes/carga-masiva-id-grupo/carga-masiva-id-grupo.component';
import { CargaMasivaIdSubgrupoComponent } from './componentes/carga-masiva-id-subgrupo/carga-masiva-id-subgrupo.component';
import { CargaMasivaIdArticuloComponent } from './componentes/carga-masiva-id-articulo/carga-masiva-id-articulo.component';
import { CargaMasivaIdTipoImpuestoComponent } from './componentes/carga-masiva-id-tipo-impuesto/carga-masiva-id-tipo-impuesto.component';
import { ModalListaContactoEmpresaComponent } from './modales/modal-lista-contacto-empresa/modal-lista-contacto-empresa/modal-lista-contacto-empresa.component';
import { ModalListaContactoEmpresaModule } from './modales/modal-lista-contacto-empresa/modal-lista-contacto-empresa.module';
import { ModalListaEdificiosComponent } from './modales/modal-lista-edificios/modal-lista-edificios/modal-lista-edificios.component';
import { ModalListaEdificiosModule } from './modales/modal-lista-edificios/modal-lista-edificios.module';
import { ModalListaPisosComponent } from './modales/modal-lista-pisos/modal-lista-pisos/modal-lista-pisos.component';
import { ModalListaPisosModule } from './modales/modal-lista-pisos/modal-lista-pisos.module';
import { ModalListaGruposModule } from './modales/modal-lista-grupos/modal-lista-grupos.module';
import { ModalListaGruposComponent } from './modales/modal-lista-grupos/modal-lista-grupos/modal-lista-grupos.component';
import { ModalListaSubgruposModule } from './modales/modal-lista-subgrupos/modal-lista-subgrupos.module';
import { ModalListaSubgruposComponent } from './modales/modal-lista-subgrupos/modal-lista-subgrupos/modal-lista-subgrupos.component';
import { ModalListaTipoImpuestoModule } from './modales/modal-lista-tipo-impuesto/modal-lista-tipo-impuesto.module';
import { ModalListaTipoImpuestoComponent } from './modales/modal-lista-tipo-impuesto/modal-lista-tipo-impuesto/modal-lista-tipo-impuesto.component';

import { CargaMasivaIdTipoVendedoresComponent } from './componentes/carga-masiva-id-tipo-vendedores/carga-masiva-id-tipo-vendedores.component';
import { ModalListaTipoVendedoresModule } from './modales/modal-lista-tipo-vendedores/modal-lista-tipo-vendedores.module';
import { ModalListaTipoVendedoresComponent } from './modales/modal-lista-tipo-vendedores/modal-lista-tipo-vendedores/modal-lista-tipo-vendedores.component';
import {CargaMasivaIdEmpresaProveedorComponent} from './componentes/carga-masiva-id-empresa-proveedor/carga-masiva-id-empresa-proveedor.component';
import {CargaMasivaIdBodegaComponent} from './componentes/carga-masiva-id-bodega/carga-masiva-id-bodega.component';
import {ModalListaEmpresaProveedorComponent} from './modales/modal-lista-empresa-proveedor/modal-lista-empresa-proveedor/modal-lista-empresa-proveedor.component';
import {ModalListaBodegasComponent} from './modales/modal-lista-bodegas/modal-lista-bodegas/modal-lista-bodegas.component';
import {ModalListaEmpresaProveedorModule} from './modales/modal-lista-empresa-proveedor/modal-lista-empresa-proveedor.module';
import {ModalListaBodegasModule} from './modales/modal-lista-bodegas/modal-lista-bodegas.module';

@NgModule({
  declarations: [
    RutaGestionCargasMasivasComponent,
    RutaMenuCargasMasivasComponent,
    RutaCargaMasivaComponent,
    CargaMasivaIdEdificioComponent,
    CargaMasivaIdPisoComponent,
    CargaMasivaIdContactoEmpresaComponent,
    CargaMasivaIdGrupoComponent,
    CargaMasivaIdSubgrupoComponent,
    CargaMasivaIdArticuloComponent,
    CargaMasivaIdTipoImpuestoComponent,
    CargaMasivaIdEmpresaProveedorComponent,
    CargaMasivaIdBodegaComponent,
    CargaMasivaIdTipoVendedoresComponent,
  ],
  imports: [
    CommonModule,
    CargasMasivasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ManLabNgBootstrapModule,
    ModalListaArticuloProveedorModule,
    ModalListaArticulosModule,
    ModalListaContactoEmpresaModule,
    ModalListaEdificiosModule,
    ModalListaPisosModule,
    ModalListaGruposModule,
    ModalListaSubgruposModule,
    ModalListaTipoImpuestoModule,
    ModalListaTipoVendedoresModule,
    ModalListaBodegasModule,
    ModalListaEmpresaProveedorModule,
    FilterFechasModule,
  ],
  providers: [],
  entryComponents: [
    ModalListaArticulosComponent,
    ModalListaContactoEmpresaComponent,
    ModalListaEdificiosComponent,
    ModalListaPisosComponent,
    ModalListaGruposComponent,
    ModalListaSubgruposComponent,
    ModalListaTipoImpuestoComponent,
    ModalListaTipoVendedoresComponent,
    ModalListaEmpresaProveedorComponent,
    ModalListaBodegasComponent,
  ],
})
export class CargasMasivasModule {}
