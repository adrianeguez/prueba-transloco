import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CursoRoutingModule} from './curso-routing.module';
import {RutaGestionCursosComponent} from './rutas/ruta-gestion-cursos/ruta-gestion-cursos.component';
import {CrearEditarCursoComponent} from './modales/crear-editar-curso/crear-editar-curso.component';
import {ManLabNgBootstrapModule, ModalModule, SelectEstadoModule} from 'man-lab-ng';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {TableModule} from 'primeng/table';
import {RutaMenuMisCursosComponent} from './rutas/ruta-menu-mis-cursos/ruta-menu-mis-cursos.component';
import {ItemMenuModule} from '../../../submodulo-front-comun/modulos/item-menu/item-menu.module';
import {CursoFormularioComponent} from './componentes/curso-formulario/curso-formulario.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslocoModule} from '@ngneat/transloco';
import {PermisoDirectiveModule} from '../../../submodulo-front-comun/directivas/permiso/permiso.module';
import {RutaInicioCursoComponent} from './rutas/ruta-inicio-curso/ruta-inicio-curso.component';
import {RutaSeleccionarCursoComponent} from './rutas/ruta-seleccionar-curso/ruta-seleccionar-curso.component';
import {SeleccionarIdiomaComponent} from './modales/seleccionar-idioma/seleccionar-idioma.component';
import {IdiomaFormularioComponent} from './componentes/seleccion-idioma-curso-formulario/idioma-formulario.component';
import {CursoFormularioModule} from './componentes/curso-formulario/curso-formulario.module';
import {CrearPedidoCursoModule} from '../pedido/modales/crear-pedido-curso/crear-pedido-curso.module';
import { MapaEstablecimientosComponent } from './modales/mapa-establecimientos/mapa-establecimientos.component';
import {MapaModule} from '../../../../compartido/mapa-modulo/modal.mapa.module';
import { EdficioDetalleComponent } from './componentes/edficio-detalle/edficio-detalle.component';
import {MatButtonModule} from '@angular/material/button';
import {EzFormModule} from '@gordon_freeman/ez-form';
import {FormularioBuscarEdificioComponent} from './componentes/formulario-buscar-edificio/formulario-buscar-edificio.component';

@NgModule({
  declarations: [
    RutaGestionCursosComponent,
    RutaSeleccionarCursoComponent,
    CrearEditarCursoComponent,
    RutaMenuMisCursosComponent,
    RutaInicioCursoComponent,
    SeleccionarIdiomaComponent,
    IdiomaFormularioComponent,
    MapaEstablecimientosComponent,
    EdficioDetalleComponent,
    FormularioBuscarEdificioComponent,
  ],
  imports: [
    CommonModule,
    CursoRoutingModule,
    ManLabNgBootstrapModule,
    TituloPantallaModule,
    TableModule,
    ItemMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    ModalModule,
    FormsModule,
    TranslocoModule,
    PermisoDirectiveModule,
    CursoFormularioModule,
    SelectEstadoModule,
    CrearPedidoCursoModule,
    MapaModule,
    MatButtonModule,
    EzFormModule,
  ],
  entryComponents: [
    CrearEditarCursoComponent,
    SeleccionarIdiomaComponent,
    MapaEstablecimientosComponent,
  ],
})
export class CursoModule {
}
