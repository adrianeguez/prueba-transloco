import {Component, Inject, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RutaGestionModuloCursoComponent} from '../../rutas/ruta-gestion-modulo-curso/ruta-gestion-modulo-curso.component';
import {ModuloCursoInterface} from '../../interfaces/modulo-curso.interface';
import {ModuloCursoRestService} from '../../servicios/rest/modulo-curso-rest.service';
import {TranslocoService} from '@ngneat/transloco';
import {ToasterService} from 'angular2-toaster';
import {environment} from '../../../../../../../environments/environment';
import {toastAdvertenciaCargaMasiva} from '../../../../../submodulo-cargas-masivas-front/constantes/mensajes-toaster';
import {CargandoService} from 'man-lab-ng';
import {toastErrorCrear, toastErrorEditar, toastExitoCrear} from '../../../../../../constantes/mensajes-toaster';
import {FileValidator} from '@gordon_freeman/ez-form';

@Component({
  selector: 'app-modal-subir-caratula',
  templateUrl: './modal-subir-caratula.component.html',
  styleUrls: ['./modal-subir-caratula.component.scss']
})
export class ModalSubirCaratulaComponent implements OnInit {

  configuracionFormulario = [
    {
      controlName: 'urlCaratula',
      label: 'Module Cover',
      hint: 'Please upload your cover picture',
      placeholder: 'Add your cover picture',
      validators: [
        Validators.required,
        FileValidator.extensions(['png', 'jpg', 'jpeg'])
      ],
      errorMessages: {
        fileExtension: 'Please select png, jpg or jpeg files only',
        required: 'Mandatory File',
        fileMaxSize: 'File size is larger than 500 kilobytes'
      },
      type: {
        typeName: 'file',
        multiple: false,
        accept: 'image/*',
        showFile: true,
        tableHeaders: {
          actions: 'Operaciones',
          description: 'Archivos entrantes'
        }
      },
    },
  ];
  formularioValido = false;
  url = environment.urlGoogleCloudStorage + environment.portGoogleCloudStorage;
  src;
  imagen;
  botonEnviar = true;
  imagenCargada = false;

  constructor(
    private readonly _dialogRef: MatDialogRef<RutaGestionModuloCursoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      moduloCurso: ModuloCursoInterface,
    },
    private readonly _moduloCursoService: ModuloCursoRestService,
    private readonly _translocoService: TranslocoService,
    private _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
  ) {
  }

  ngOnInit() {
    this._translocoService.selectTranslateObject('submoduloCertificadosCuros.moduloCursoModulo.editarCaratulaFormulario')
      .subscribe(
        (traducciones) => {
          this.configuracionFormulario[0].errorMessages = traducciones.errorMessages;
          this.configuracionFormulario[0].hint = traducciones.hint;
          this.configuracionFormulario[0].label = traducciones.label;
          this.configuracionFormulario[0].placeholder = traducciones.placeholder;
          this.configuracionFormulario[0].type.tableHeaders = traducciones.type.tableHeaders;
        }
      );
  }

  armarUrl() {
    return this.url + '/modulo-curso' + this.data.moduloCurso.id;
  }

  cargoImagen() {
    this.imagenCargada = true;
  }

  escucharDatosDelFormulario(evento: [FileList]) {
    if (evento) {
      const fileList: FileList = Object.values(evento)[0];
      const existeArchivo = fileList.length > 0;
      if (existeArchivo) {
        const archivoImagen = Object.values(fileList[0])[0];
        const reader = new FileReader();
        reader.onload = (eventoLecturaArchivo: any) => {
          this.src = eventoLecturaArchivo.target.result;
          this.formularioValido = true;
        };
        reader.readAsDataURL(archivoImagen);
        this.imagen = archivoImagen;
      } else {
        this._toasterService.pop(toastAdvertenciaCargaMasiva);
        this.formularioValido = false;
      }
    } else {
      this._toasterService.pop(toastErrorEditar);
      this.formularioValido = false;
    }
  }

  guardarArchivoAudio() {
    this._cargandoService.habilitarCargando();
    const nombre = 'modulo-curso' + this.data.moduloCurso.id;
    this._toasterService.pop(
      'warning',
      this._translocoService.translate('formularios.comunes.cuidado'),
      this._translocoService.translate('submoduloTema.temaFormulario.toasterArchivo')
    );
    this._moduloCursoService
      .cargarCaratula(this.imagen, nombre.toString(), +this.data.moduloCurso.id)
      .subscribe(
        registro => {
          if (registro.error !== undefined) {
            this._toasterService.pop(toastErrorCrear);
            console.error({error: registro.error, mensaje: 'No se guardo la imagen'});
            this._dialogRef.close();
          } else {
            this._toasterService.pop(toastExitoCrear);
            this._dialogRef.close(registro);
          }
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          this._toasterService.pop(toastErrorCrear);
          console.error({error, mensaje: 'No se guardo el la caratula'});
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
