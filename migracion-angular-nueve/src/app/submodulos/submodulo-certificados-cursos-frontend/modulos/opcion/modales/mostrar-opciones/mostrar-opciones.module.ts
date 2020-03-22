import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalMostrarOpcionesComponent } from './modal-mostrar-opciones/modal-mostrar-opciones.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ManLabNgModule} from 'man-lab-ng';
import {TablaOpcionComponent} from '../../componentes/tabla-opcion/tabla-opcion.component';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [ModalMostrarOpcionesComponent, TablaOpcionComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ReactiveFormsModule,
    ManLabNgModule,
    TranslocoModule,
  ],
  exports: [ModalMostrarOpcionesComponent],
  entryComponents: [ModalMostrarOpcionesComponent]
})
export class MostrarOpcionesModule { }
