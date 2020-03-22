import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaProveedoresRoutingModule } from './empresa-proveedores-routing.module';
import { RutaGestionEmpresasProveedoresComponent } from './rutas/ruta-gestion-empresas-proveedores/ruta-gestion-empresas-proveedores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/primeng';
import { CrearEditarEmpresaProveedoresComponent } from './modales/crear-editar-empresa-proveedores/crear-editar-empresa-proveedores.component';
import { EmpresaProveedoresFormularioComponent } from './componentes/empresa-proveedores-formulario/empresa-proveedores-formulario.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaGestionEmpresasProveedoresComponent,
    CrearEditarEmpresaProveedoresComponent,
    EmpresaProveedoresFormularioComponent,
  ],
  imports: [
    CommonModule,
    EmpresaProveedoresRoutingModule,
    ReactiveFormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    SelectEstadoModule,
    AutoCompleteModule,
    TituloPantallaModule,
  ],
  exports: [RutaGestionEmpresasProveedoresComponent],
  entryComponents: [CrearEditarEmpresaProveedoresComponent],
  providers: [],
})
export class EmpresaProveedoresModule {}
