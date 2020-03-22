import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaClientesRoutingModule } from './empresa-clientes-routing.module';
import { RutaGestionEmpresasClientesComponent } from './rutas/ruta-gestion-empresas-clientes/ruta-gestion-empresas-clientes.component';
import { CrearEditarEmpresaClientesComponent } from './modales/crear-editar-empresa-clientes.ts/crear-editar-empresa-clientes.ts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { TableModule } from 'primeng/table';
import { EmpresaClientesFormularioComponent } from './componentes/empresa-clientes-formulario/empresa-clientes-formulario.component';
import { AutoCompleteModule } from 'primeng/primeng';
import { EdificioModule } from '../edificio/edificio.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaGestionEmpresasClientesComponent,
    CrearEditarEmpresaClientesComponent,
    EmpresaClientesFormularioComponent,
  ],
  imports: [
    CommonModule,
    EmpresaClientesRoutingModule,
    ReactiveFormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    SelectEstadoModule,
    AutoCompleteModule,
    EdificioModule,
    TituloPantallaModule,
  ],
  exports: [RutaGestionEmpresasClientesComponent],
  entryComponents: [CrearEditarEmpresaClientesComponent],
  providers: [],
})
export class EmpresaClientesModule {}
