import {Component, Inject, OnInit} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RutaGestionContenidoComponent} from '../../rutas/ruta-gestion-contenido/ruta-gestion-contenido.component';
import {ContenidoInterface} from '../../interfaces/contenido.interface';
import {CargandoService} from 'man-lab-ng';
import {ContenidoRestService} from '../../servicios/rest/contenido.rest.service';
import {TranslocoService} from '@ngneat/transloco';
import {ToasterService} from 'angular2-toaster';
import {validarFormatoArchivo} from '../../../../funciones/validar-formato-archivo';
import {crearToasterGeneral} from '../../../../funciones/crear-toaster-general';

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.scss']
})
export class SubirImagenComponent implements OnInit {
  formularioValido = false;
  url = environment.urlGoogleCloudStorage + environment.portGoogleCloudStorage;
  src;
  imagen;
  botonEnviar = false;
  imagenCargada = false;

  constructor(
    private readonly _dialogRef: MatDialogRef<RutaGestionContenidoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public _data: {
      contenido: ContenidoInterface,
      nombreTabla: string,
      id: number,
      titulo: string,
      numeroImagen: number,
    },
    private readonly _cargandoService: CargandoService,
    private readonly _contenidoService: ContenidoRestService,
    private readonly _translocoService: TranslocoService,
    private _toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
  }

  seleccionoArchivoImagen(evento) {
    const fileList: FileList = evento.target.files;
    const existeArchivo = fileList.length > 0;
    if (existeArchivo) {
      const imageFile = fileList.item(0);
      const reader = new FileReader();
      reader.onload = (eventoLecturaArchivo: any) => {
        this.src = eventoLecturaArchivo.target.result;
        if (validarFormatoArchivo(this.src, 'image')) {
          this.formularioValido = true;
          this.botonEnviar = true;
        } else {
          this.formularioValido = false;
          this.botonEnviar = false;
        }
      };
      reader.readAsDataURL(imageFile);
      this.imagen = imageFile;
    } else {
      this._toasterService.pop(
        crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorCargarArchivo')
      );
      this.formularioValido = false;
      this.botonEnviar = false;
    }
  }

  guardarArchivoImagen() {
    this.botonEnviar = false;
    this._cargandoService.habilitarCargando();
    const nombreImagen = this._data.nombreTabla + this._data.id + this._data.numeroImagen;
    this._toasterService.pop(
      'warning',
      this._translocoService.translate('formularios.comunes.cuidado'),
      this._translocoService.translate('submoduloTema.temaFormulario.toasterArchivo')
    );
    this._contenidoService
      .cargarArchivoImagen(this.imagen, this._data.numeroImagen, nombreImagen.toString())
      .subscribe(
        registro => {
          if (registro.error !== undefined) {
            this._toasterService.pop(
              crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorCrearVacio')
            );
            console.error({error: registro.error, mensaje: 'No se guardo la imagen', data: registro});
            this._dialogRef.close();
          } else {
            this._toasterService.pop(
              crearToasterGeneral(this._translocoService, 'success', 'generales.toasters.toastExitoCrearVacio')
            );
            this._dialogRef.close(registro);
          }
        },
        error => {
          this._toasterService.pop(
            crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorCrearVacio')
          );
          console.error({error, mensaje: 'No se guardo la imagen', data: this.imagen});
          this._dialogRef.close();
        }
      );
    this._cargandoService.deshabilitarCargando();
  }

  enviarDatosFormulario() {
    this.botonEnviar = false;
    this.guardarArchivoImagen();
  }


  cancelarModal() {
    this._dialogRef.close();
  }

}
