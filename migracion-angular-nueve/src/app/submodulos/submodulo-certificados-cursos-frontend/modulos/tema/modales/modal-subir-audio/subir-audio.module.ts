import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalCrearEditarAudioComponent} from './modal-crear-editar-audio/modal-crear-editar-audio.component';
import {TituloPantallaModule} from '../../../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ManLabNgModule, ModalModule, SelectEstadoModule} from 'man-lab-ng';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [ModalCrearEditarAudioComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    TituloPantallaModule,
    FormsModule,
    SelectEstadoModule,
    ReactiveFormsModule,
    ManLabNgModule,
    ModalModule,
    TranslocoModule
  ],
  exports: [ModalCrearEditarAudioComponent],
  entryComponents: [ModalCrearEditarAudioComponent],
})
export class SubirAudioModule {
}
