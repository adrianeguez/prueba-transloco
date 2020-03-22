import { Component, OnInit } from '@angular/core';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { CargaMasivaInterface } from '../../../../interfaces/carga-masiva.interface';
import { GuardarArchivoRestService } from '../../../../servicios/rest/guardar-archivo-rest.service';
import { ToasterService } from 'angular2-toaster';
import { CargaMasivaCreateDto } from '../../../../clases/carga-masiva-create-dto';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { CargaMasivaRestService } from '../../../../servicios/rest/carga-masiva-rest.service';
import { MatDialog } from '@angular/material/dialog';
import { formatearFecha } from '../../../../funciones/formatear-fecha';
import { setearHora } from '../../../../funciones/setear-hora';
import { RUTAS_CARGAS_MASIVAS } from '../../rutas/definicion-rutas/rutas-cargas-masivas';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {
  toastErrorConexionServidor,
  toastErrorCrear,
  toastExitoCrear,
} from '../../../../../../constantes/mensajes-toaster';
import { PisoInterface } from '../../../../../submodulo-empresa-front/interfaces/piso.interface';
import { ModalListaPisosComponent } from '../../modales/modal-lista-pisos/modal-lista-pisos/modal-lista-pisos.component';
import {
  toastAdvertenciaCargaMasiva,
  toastAdvertenciaNombreArchivo,
  toastExitoCrearDatosArchivoCargaMasiva,
} from '../../../../constantes/mensajes-toaster';
import { enviarDatosArchivo } from '../../../../funciones/enviar-datos-archivo';
import * as moment from 'moment';

@Component({
  selector: 'ml-carga-masiva-id-piso',
  templateUrl: './carga-masiva-id-piso.component.html',
  styleUrls: ['./carga-masiva-id-piso.component.scss'],
})
export class CargaMasivaIdPisoComponent
  extends RutaConMigasDePanTablaBusqueda<
    CargaMasivaInterface,
    GuardarArchivoRestService,
    ToasterService
  >
  implements OnInit {
  nombreCarga;
  descripcionCarga;
  archivoCargaMasiva: CargaMasivaCreateDto = new CargaMasivaCreateDto();
  archivoSeleccionado: boolean;
  pisoSeleccionado: PisoInterface;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _guardarArchivoRestService: GuardarArchivoRestService,
    protected _cargaMasivaRestService: CargaMasivaRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _guardarArchivoRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
    );
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.nombreCarga = params.nombreCarga;
      this.descripcionCarga = `Archivo relacionado a ${this.nombreCarga}`;
      this.archivoCargaMasiva.fechaInicio = moment().format('YYYY-MM-DD');
      this.archivoCargaMasiva.horaInicio = setearHora(new Date());
      this.ruta = RUTAS_CARGAS_MASIVAS.rutaCargaMasiva(false, true, [
        this.nombreCarga,
      ]);
      const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
        RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
        RUTAS_CARGAS_MASIVAS.rutaMenuCargasMasivas(false, true),
        RUTAS_CARGAS_MASIVAS.rutaCargaMasiva(false, true, [this.nombreCarga]),
      ];
      this.establecerMigas(rutas);
    });
  }

  abrirModal() {
    const ventanaModal = this.dialog.open(ModalListaPisosComponent, {
      width: '600px',
    });

    const $respuestaModal = ventanaModal.afterClosed();

    $respuestaModal.subscribe(
      (pisoSeleccionado: PisoInterface) => {
        if (pisoSeleccionado) {
          this.pisoSeleccionado = pisoSeleccionado;
        }
      },
      error => {
        console.error('Error', error);
      },
    );
  }

  seleccionoArchivo(evento) {
    const fileList: FileList = evento.target.files;
    const nombreArchivo = evento.target.files[0].name.split('.')[0];
    const validaciones = {
      existeArchivo: fileList.length > 0,
      nombreArchivo: this.nombreCarga === nombreArchivo,
    };
    if (validaciones.existeArchivo && validaciones.nombreArchivo) {
      const file: File = fileList[0];
      this.archivoCargaMasiva.archivoASubir = file;
      this.archivoSeleccionado = true;
    } else {
      this._toasterServicePrivate.pop(toastAdvertenciaNombreArchivo);
      this.archivoSeleccionado = false;
    }
  }

  subirArchivoId() {
    const archivoCreado$ = this._guardarArchivoRestService.subirArchivo(
      this.archivoCargaMasiva.archivoASubir,
      this.pisoSeleccionado.id,
    );
    this.archivoCargaMasiva.nombre = this.archivoCargaMasiva.archivoASubir.name;
    this.archivoCargaMasiva.descripcion = this.descripcionCarga;
    this._cargandoService.habilitarCargando();
    archivoCreado$.subscribe(
      r => {
        const nombreArchivoASubir = this.archivoCargaMasiva.nombre.split(
          '.',
        )[0];
        this._cargandoService.deshabilitarCargando();
        if (this.nombreCarga === nombreArchivoASubir) {
          this.archivoCargaMasiva.fechaFinalizacion = moment().format('YYYY-MM-DD');
          this.archivoCargaMasiva.horaFin = setearHora(new Date());
          this.archivoCargaMasiva.estado = 'Finalizado';
          this._toasterServicePrivate.pop(toastExitoCrear);
          enviarDatosArchivo(
            this.archivoCargaMasiva,
            this._cargaMasivaRestService,
            this._cargandoService,
            this._toasterService,
          );
        } else {
          this._toasterServicePrivate.pop(toastAdvertenciaCargaMasiva);
        }
        this.values.push(r);
      },
      e => {
        this._cargandoService.deshabilitarCargando();
        this.archivoCargaMasiva.descripcion = 'Sin descripción';
        this.archivoCargaMasiva.fechaFinalizacion = null;
        this.archivoCargaMasiva.horaFin = null;
        this.archivoCargaMasiva.estado = `${e.error.datos.mensaje}`;
        this._toasterService.pop(toastErrorConexionServidor);
        enviarDatosArchivo(
          this.archivoCargaMasiva,
          this._cargaMasivaRestService,
          this._cargandoService,
          this._toasterService,
        );
        console.error('Error:', e.error.datos.mensaje);
      },
    );
  }
}
