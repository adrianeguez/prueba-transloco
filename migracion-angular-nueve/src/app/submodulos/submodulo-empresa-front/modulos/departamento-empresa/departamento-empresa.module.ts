import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// tslint:disable-next-line:max-line-length
import { DepartamentoEmpresaFormularioComponent } from './componentes/departamento-empresa-formulario/departamento-empresa-formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule, TreeTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material';
// tslint:disable-next-line:max-line-length
import { RutaGestionDepartamentosEmpresaComponent } from './rutas/ruta-gestion-departamentos-empresa/ruta-gestion-departamentos-empresa.component';
// tslint:disable-next-line:max-line-length
import { CrearEditarDepartamentoEmpresaComponent } from './modales/crear-editar-departamento-empresa/crear-editar-departamento-empresa.component';
// tslint:disable-next-line:max-line-length
import { DepartamentoEmpresaRoutingModule } from './departamento-empresa-routing.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    DepartamentoEmpresaFormularioComponent,
    RutaGestionDepartamentosEmpresaComponent,
    CrearEditarDepartamentoEmpresaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TreeTableModule,
    FormsModule,
    DepartamentoEmpresaRoutingModule,
    SelectEstadoModule,
    TituloPantallaModule,
  ],
  entryComponents: [CrearEditarDepartamentoEmpresaComponent],
  exports: [RutaGestionDepartamentosEmpresaComponent],
  providers: [],
})
export class DepartamentoEmpresaModule {}
