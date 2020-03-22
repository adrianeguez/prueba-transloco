import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManLabNgBootstrapModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material';
import { MenuLateralFormularioComponent } from './componentes/menu-formulario/menu-formulario/menu-lateral-formulario.component';
import { CrearEditarMenuComponent } from './modales/crear-editar-menu-lateral/crear-editar-menu.component';
import { MenuLateralRoutingModule } from './menu-lateral-routing.module';
import { RutaGestionMenuLateralComponent } from './rutas/ruta-gestion-menu-lateral/ruta-gestion-menu-lateral.component';
import { SelectNivelMenuModule } from '../../../../submodulo-roles-frontend/componentes/select-nivel-menu/select-nivel-menu.module';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { TreeDragDropService } from 'primeng/api';

@NgModule({
  declarations: [
    MenuLateralFormularioComponent,
    CrearEditarMenuComponent,
    RutaGestionMenuLateralComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    MenuLateralRoutingModule,
    SelectNivelMenuModule,
    TableModule,
    TreeModule,
  ],
  entryComponents: [CrearEditarMenuComponent],
  providers: [TreeDragDropService],
})
export class MenuLateralModule {}
