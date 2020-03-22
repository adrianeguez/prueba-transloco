import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { ContactoEmpresaFormularioComponent } from './componentes/contacto-empresa-formulario/contacto-empresa-formulario.component';
import { ContactoEmpresaRoutingModule } from './contacto-empresa-routing.module';
import { TableModule } from 'primeng/table';
import {ManLabNgBootstrapModule, ManLabNgModule, SelectEstadoModule} from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { RutaGestionContactosEmpresaComponent } from './rutas/ruta-gestion-contactos-empresa/ruta-gestion-contactos-empresa.component';
import { CrearEditarContactoEmpresaComponent } from './modales/modal-crear-contacto-empresa/crear-editar-contacto-empresa/crear-editar-contacto-empresa.component';
import { AutoCompleteModule } from 'primeng/primeng';
import { SelectTipoCargoModule } from '../../componentes/selects/select-tipo-cargo/select-tipo-cargo.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {ModalCrearContactoEmpresaModule} from './modales/modal-crear-contacto-empresa/modal-crear-contacto-empresa.module';
import { ModalSeleccionarContactoEmpresaComponent } from './modales/modal-seleccionar-contacto-empresa/seleccionar-contacto-empresa/modal-seleccionar-contacto-empresa.component';
import {ListaContactoEmpresaModule} from './componentes/lista-contacto-empresa/lista-contacto-empresa.module';

@NgModule({
  declarations: [
    // ContactoEmpresaFormularioComponent,
    RutaGestionContactosEmpresaComponent,
    // CrearEditarContactoEmpresaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactoEmpresaRoutingModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    FormsModule,
    AutoCompleteModule,
    SelectEstadoModule,
    SelectTipoCargoModule,
    TituloPantallaModule,
    ModalCrearContactoEmpresaModule,
    ManLabNgModule,
  ],
  entryComponents: [CrearEditarContactoEmpresaComponent],
  exports: [],
  providers: [],
})
export class ContactoEmpresaModule {}
