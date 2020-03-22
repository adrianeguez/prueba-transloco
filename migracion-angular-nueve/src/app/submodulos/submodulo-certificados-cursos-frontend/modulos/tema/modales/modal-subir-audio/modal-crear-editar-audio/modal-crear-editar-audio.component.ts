import {Component, Inject, OnInit} from '@angular/core';
import {environment} from '../../../../../../../../environments/environment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RutaGestionTemaComponent} from '../../../rutas/ruta-gestion-tema/ruta-gestion-tema.component';
import {CargandoService} from 'man-lab-ng';
import {TemaRestService} from '../../../servicios/rest/tema.rest.service';
import {TranslocoService} from '@ngneat/transloco';
import {Toast, ToasterService} from 'angular2-toaster';
import {validarFormatoArchivo} from '../../../../../funciones/validar-formato-archivo';
import {crearToasterGeneral} from '../../../../../funciones/crear-toaster-general';

@Component({
  selector: 'app-modal-crear-editar-audio',
  templateUrl: './modal-crear-editar-audio.component.html',
  styleUrls: ['./modal-crear-editar-audio.component.scss']
})
export class ModalCrearEditarAudioComponent implements OnInit {
  formularioValido = false;
  src;
  audio;
  url = environment.urlGoogleCloudStorage + environment.portGoogleCloudStorage;
  botonEnviar = false;

  constructor(
    private readonly _dialogRef: MatDialogRef<RutaGestionTemaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly _data: {
      nombreTabla: string,
      id: number,
      titulo: string
    },
    private readonly _cargandoService: CargandoService,
    private readonly _temaService: TemaRestService,
    private readonly _translocoService: TranslocoService,
    private _toasterService: ToasterService,
  ) {
  }

  ngOnInit() {

  }

  seleccionoArchivoAudio(evento) {
    const fileList: FileList = evento.target.files;
    const existeArchivo = fileList.length > 0;
    if (existeArchivo) {
      const audioFile = fileList.item(0);
      const reader = new FileReader();
      reader.onload = (eventoLecturaArchivo: any) => {
        this.src = eventoLecturaArchivo.target.result;
        if (validarFormatoArchivo(this.src, 'audio')) {
          this.formularioValido = true;
          this.botonEnviar = true;
        }
      };
      reader.readAsDataURL(audioFile);
      this.audio = audioFile;
    } else {
      this._toasterService.pop(
        crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorCargarArchivo')
      );
      this.formularioValido = false;
      this.botonEnviar = false;
    }
  }



  guardarArchivoAudio() {
    this.botonEnviar = false;
    const nombreAudio = this._data.nombreTabla + this._data.id;
    this._toasterService.pop(
      'warning',
      this._translocoService.translate('formularios.comunes.cuidado'),
      this._translocoService.translate('submoduloCertificadosCuros.tema.temaFormulario.toasterArchivo')
    );
    this._cargandoService.habilitarCargando();
    this._temaService
      .cargarArchivoAudio(this.audio, nombreAudio.toString())
      .subscribe(
        registro => {
          if (registro.error !== undefined) {
            this._toasterService.pop(
              crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorCrearVacio')
            );
            console.error({error: registro.error, mensaje: 'No se guardo el audio', data: this.audio});
            this._cargandoService.deshabilitarCargando();
            this._dialogRef.close();
          } else {
            this._toasterService.pop(
              crearToasterGeneral(this._translocoService, 'success', 'general.toasters.toastExitoCrearVacio')
            );
            this._cargandoService.deshabilitarCargando();
            this._dialogRef.close(registro);
          }
        },
        error => {
          this._toasterService.pop(
            crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorCrearVacio')
          );
          console.error({error, mensaje: 'No se guardo el audio', data: this.audio});
          this._cargandoService.deshabilitarCargando();
          this._dialogRef.close();
        }
      );
  }

  enviarDatosFormulario() {
    this.botonEnviar = false;
    this.guardarArchivoAudio();
  }


  cancelarModal() {
    this._dialogRef.close();
  }
}
