import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrearEditarServicioEstablecimientoComponent} from './modales/modal-articulo-servicio/crear-editar-servicio-establecimiento/crear-editar-servicio-establecimiento.component';
import {RutaGestionServicioComponent} from './rutas/ruta-gestion-servicio/ruta-gestion-servicio.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {ManLabNgBootstrapModule, SelectEstadoModule} from 'man-lab-ng';
import {TableModule} from 'primeng/table';
import {ServicioEstablecimientoRoutingModule} from './servicio-establecimiento-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {ListaArticuloEmpresaModule} from '../../../submodulo-pedido-front/componentes/lista-articulo-empresa/lista-articulo-empresa.module';
import {MostrarArticuloComponent} from './modales/modal-mostrar-articulo/mostrar-articulo/mostrar-articulo.component';
import {ArticuloModule} from '../../../submodulo-articulos-front/modulos/articulo/articulo.module';
import {RutaEstablecimientosCursoComponent} from './rutas/ruta-establecimientos-curso/ruta-establecimientos-curso.component';
import {ArticuloFormularioModule} from '../../../submodulo-articulos-front/modulos/articulo/componentes/articulo-formulario/articulo-formulario.module';
import {ModalListarPreciosModule} from '../precio/modales/modal-listar-precios/modal-listar-precios.module';
import {TranslocoModule} from '@ngneat/transloco';
import {ListaArticuloServicioModule} from '../../../submodulo-articulos-front/modulos/articulo/componentes/lista-articulo-servicio/lista-articulo-servicio.module';

@NgModule({
  declarations: [
    RutaGestionServicioComponent,
    CrearEditarServicioEstablecimientoComponent,
    MostrarArticuloComponent,
    RutaEstablecimientosCursoComponent
  ],
  imports: [
    CommonModule,
    TituloPantallaModule,
    ManLabNgBootstrapModule,
    TableModule,
    ServicioEstablecimientoRoutingModule,
    FormsModule,
    MatDialogModule,
    ListaArticuloEmpresaModule,
    ArticuloModule,
    SelectEstadoModule,
    ArticuloFormularioModule,
    ModalListarPreciosModule,
    TranslocoModule,
    ListaArticuloServicioModule,
  ],
  entryComponents: [
    CrearEditarServicioEstablecimientoComponent,
    MostrarArticuloComponent,
  ],
})
export class ServicioEstablecimientoModule {
}
