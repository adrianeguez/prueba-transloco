import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentoTrabajadorRoutingModule } from './departamento-trabajador-routing.module';
// tslint:disable-next-line:max-line-length
import { RutaGestionDepartamentoTrabajadorComponent } from './rutas/ruta-gestion-departamentos-trabajador/ruta-gestion-departamentos-trabajador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule, TreeTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
// tslint:disable-next-line:max-line-length
import { CrearEditarDepartamentoTrabajadorComponent } from './modales/crear-editar-departamento-trabajador/crear-editar-departamento-trabajador.component';
// tslint:disable-next-line:max-line-length
import { DepartamentoTrabajadorFormularioComponent } from './componentes/departamento-trabajador-formulario/departamento-trabajador-formulario.component';
import { SelectTipoCargoModule } from '../../componentes/selects/select-tipo-cargo/select-tipo-cargo.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaGestionDepartamentoTrabajadorComponent,
    CrearEditarDepartamentoTrabajadorComponent,
    DepartamentoTrabajadorFormularioComponent,
  ],
  imports: [
    CommonModule,
    DepartamentoTrabajadorRoutingModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TreeTableModule,
    FormsModule,
    SelectEstadoModule,
    SelectTipoCargoModule,
    TituloPantallaModule,
  ],
  entryComponents: [CrearEditarDepartamentoTrabajadorComponent],
  providers: [],
  exports: [RutaGestionDepartamentoTrabajadorComponent],
})
export class DepartamentoTrabajadorModule {}
