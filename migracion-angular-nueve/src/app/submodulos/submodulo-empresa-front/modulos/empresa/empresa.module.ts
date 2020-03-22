import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaFormularioComponent } from './componentes/formularios/empresa-formulario/empresa-formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { TableModule } from 'primeng/table';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material';
import { RutaGestionEmpresasComponent } from './rutas/ruta-gestion-empresas/ruta-gestion-empresas.component';
import { CrearEditarEmpresaComponent } from './modales/crear-editar-empresa/crear-editar-empresa.component';
import { TreeTableModule } from 'primeng/primeng';
import { SelectTipoEmpresaModule } from '../../componentes/selects/select-tipo-empresa/select-tipo-empresa.module';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { SlideMenuModule } from 'primeng/slidemenu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { FieldsetModule } from 'primeng/fieldset';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    EmpresaFormularioComponent,
    RutaGestionEmpresasComponent,
    CrearEditarEmpresaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    EmpresaRoutingModule,
    SelectEstadoModule,
    TreeTableModule,
    SelectTipoEmpresaModule,
    CardModule,
    TabViewModule,
    SlideMenuModule,
    MatTabsModule,
    MatGridListModule,
    FieldsetModule,
    TituloPantallaModule,
  ],
  exports: [EmpresaFormularioComponent, RutaGestionEmpresasComponent],
  entryComponents: [CrearEditarEmpresaComponent],
  providers: [],
})
export class EmpresaModule {}
