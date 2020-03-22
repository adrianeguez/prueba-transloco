import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { AsignarEscalaVendedorComponent } from '../periodos-por-vendedor/modales/asignar-escala-vendedor/asignar-escala-vendedor.component';
import { DatosVendedorFormularioComponent } from './componentes/datos-vendedor-formulario/datos-vendedor-formulario.component';
import { SelectEscalaVendedorComponent } from './componentes/select-escala-vendedor/select-escala-vendedor.component';
import { SelectPeriodoVentaComponent } from './componentes/select-periodo-venta/select-periodo-venta.component';
import { DatosVendedorRoutingModule } from './datos-vendedor-routing.module';
import { AsignarPeriodoVentaComponent } from './modales/asignar-periodo-venta/asignar-periodo-venta.component';
import { CrearEditarDatosVendedorComponent } from './modales/crear-editar-datos-vendedor/crear-editar-datos-vendedor.component';
import { RutaGestionDatosVendedorComponent } from './rutas/ruta-gestion-datos-vendedor/ruta-gestion-datos-vendedor.component';
import { AnadirDatosVendedorComponent } from './modales/anadir-datos-vendedor/anadir-datos-vendedor.component';
import { FilterContactoEmpresaComponent } from './componentes/contacto-empresa/filter-contacto-empresa/filter-contacto-empresa.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {SelectTipoVendedorModule} from '../../componentes/select-tipo-vendedor/select-tipo-vendedor.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaGestionDatosVendedorComponent,
    CrearEditarDatosVendedorComponent,
    DatosVendedorFormularioComponent,
    SelectPeriodoVentaComponent,
    AsignarPeriodoVentaComponent,
    SelectEscalaVendedorComponent,
    AsignarEscalaVendedorComponent,
    AnadirDatosVendedorComponent,
    FilterContactoEmpresaComponent,
  ],
  imports: [
    CommonModule,
    DatosVendedorRoutingModule,
    ReactiveFormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    SelectEstadoModule,
    DropdownModule,
    AutoCompleteModule,
    SelectTipoVendedorModule,
    TituloPantallaModule,
  ],
  entryComponents: [
    CrearEditarDatosVendedorComponent,

    AsignarPeriodoVentaComponent,
    AsignarEscalaVendedorComponent,
    AnadirDatosVendedorComponent,
  ],
  exports: [RutaGestionDatosVendedorComponent],
})
export class DatosVendedorModule {}
