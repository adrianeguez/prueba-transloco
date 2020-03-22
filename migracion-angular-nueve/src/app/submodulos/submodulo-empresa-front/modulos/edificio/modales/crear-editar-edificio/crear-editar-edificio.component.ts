import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToasterService } from 'angular2-toaster';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import {
  CONFIGURACION_EDIFICIO,
  ConfiguracionFormluarioEdificio,
} from '../../componentes/formularios/edificio-formulario/edificio-formulario.component';
import { EdificioRestService } from '../../../../servicios/rest/edificio-rest.service';
import {
  CONFIGURACION_DIRECCION,
  ConfiguracionFormluarioDireccion,
} from '../../componentes/formularios/direccion-formulario/direccion-formulario.component';
import {
  CONFIGURACION_LOCALIZACION,
  ConfiguracionFormluarioLocalizacion,
} from '../../componentes/formularios/localizacion-formulario/localizacion-formulario.component';
import { EdificioInterface } from '../../../../interfaces/edificio.interface';
import { DireccionInterface } from '../../../../interfaces/direccion.interface';
import { LocalizacionInterface } from '../../../../interfaces/localizacion.interface';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { ESTADOS } from '../../../../../../enums/estados';
import {DatosCrearEditarEdificioInterface} from '../../interfaces/datos-crear-editar-edificio.interface';
import {LugarInterface} from '../../../../../submodulo-vendedor-front/interfaces/lugar-interface';
import {Localizacion} from '../../componentes/formularios/localizacion-formulario/localizacion';
import {ENUM_ES_EDIFICIO_MATRIZ} from '../../enums/enum-es-matriz';

@Component({
  selector: 'ml-crear-editar-edificio',
  templateUrl: './crear-editar-edificio.component.html',
  styleUrls: ['./crear-editar-edificio.component.sass'],
})
export class CrearEditarEdificioComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioEdificioValido: boolean;
  edificioCrearEditar: EdificioInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionEdificio: ConfiguracionFormluarioEdificio;
  formularioDireccionValido: boolean;
  formularioLocalizacionValido = true;
  direccionCrearEditar: DireccionInterface;
  localizacionCrearEditar: Localizacion;
  configuracionDireccion: ConfiguracionFormluarioDireccion;
  configuracionLocalizacion: ConfiguracionFormluarioLocalizacion;
  datosGuardarEdificioDireccionLocalizacion: DatosCrearEditarEdificioInterface;
  lugarSeleccionado: LugarInterface;

  constructor(
    public dialogo: MatDialogRef<CrearEditarEdificioComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      edificio: EdificioInterface;
      idEmpresa;
      direccion: DireccionInterface;
      localizacion: { coordenadaX?: number; coordenadaY?: number; id? };
    },
    private readonly _toasterService: ToasterService,
    private readonly _edificioRestService: EdificioRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.edificio ? 'Llene' : 'Modifique'
    } los campos necesarios para `;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionEdificio = CONFIGURACION_EDIFICIO();
    this.configuracionDireccion = CONFIGURACION_DIRECCION();
    this.configuracionLocalizacion = CONFIGURACION_LOCALIZACION();

    if (this.data.edificio) {
      const edificioEditar = this.data.edificio;
      this.formularioEdificioValido = true;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionEdificio,
        edificioEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionEdificio,
        {},
      );
    }

    if (this.data.direccion) {
      const direccionEditar = this.data.direccion;
      this.formularioDireccionValido = true;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDireccion,
        direccionEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDireccion,
        {},
      );
    }
    if (this.data.localizacion) {
      const localizacionEditar = this.data.localizacion;
      this.formularioLocalizacionValido = true;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionLocalizacion,
        localizacionEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionLocalizacion,
        {},
      );
    }
  }
  ngAfterViewInit(): void {
    this.componenteEstaTipeando.ocultarTipeando = true;
  }

  OcultarEstaTipeando() {
    this.componenteEstaTipeando.eliminarAnimacion();
  }

  mostrarEstaTipeando() {
    this.componenteEstaTipeando.ocultarTipeando = false;
    this.componenteEstaTipeando.seVaAnimacion = false;
  }

  establecerFormularioEdificioInvalido() {
    this.formularioEdificioValido = false;
    this.mostrarEstaTipeando();
  }
  establecerFormularioDireccionInvalido() {
    this.formularioDireccionValido = false;
    this.mostrarEstaTipeando();
  }
  establecerFormularioLocalizacionInvalido() {
    this.formularioLocalizacionValido = false;
    this.mostrarEstaTipeando();
  }

  validarFormularioEdificio(edificio: EdificioInterface | boolean) {
    if (edificio) {
      this.edificioCrearEditar = edificio as EdificioInterface;
      this.formularioEdificioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioEdificioValido = false;
      this.edificioCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  validarFormularioDireccion(direccion: DireccionInterface | boolean) {
    if (direccion) {
      direccion = direccion as DireccionInterface;
      direccion.lugar = direccion.lugar as LugarInterface;
      this.direccionCrearEditar = direccion;
      if (direccion.lugar && direccion.lugar.id) {
        this.lugarSeleccionado = direccion.lugar;
        direccion.lugar = direccion.lugar.id;
      }
      this.formularioDireccionValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioDireccionValido = false;
      this.direccionCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  validarFormularioLocalizacion(localizacion: Localizacion | boolean) {
    if (localizacion) {
      const noSeIngresoCoordenadaX = !(localizacion as Localizacion).coordenadaX;
      const noSeIngresoCoordenadaY = !(localizacion as Localizacion).coordenadaY;
      if (noSeIngresoCoordenadaX || noSeIngresoCoordenadaY) {
        this.formularioLocalizacionValido = false;
      } else {
        this.localizacionCrearEditar = localizacion as Localizacion;
        this.formularioLocalizacionValido = true;
        this.OcultarEstaTipeando();
      }
    } else {
      this.formularioLocalizacionValido = false;
      this.localizacionCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this.datosGuardarEdificioDireccionLocalizacion = {};
    this.datosGuardarEdificioDireccionLocalizacion.entidadNombre = 'edificio';
    this.datosGuardarEdificioDireccionLocalizacion.direccion = this.direccionCrearEditar;
    if (this.localizacionCrearEditar) {
      this.datosGuardarEdificioDireccionLocalizacion.localizacion = {
        localizacion: {
          type: 'Point',
          coordinates: [
            +this.localizacionCrearEditar.coordenadaX,
            +this.localizacionCrearEditar.coordenadaY,
          ],
        },
        entidadNombre: 'edificio',
      };
    }
    if (this.edificioCrearEditar) {
      this.datosGuardarEdificioDireccionLocalizacion.edificio = this.edificioCrearEditar;
      this.edificioCrearEditar.esMatriz =
        +this.edificioCrearEditar.esMatriz ? ENUM_ES_EDIFICIO_MATRIZ.Si : ENUM_ES_EDIFICIO_MATRIZ.No;
    }
    const editarEmpresa =
      this.data.edificio || this.data.direccion || this.data.localizacion;
    if (editarEmpresa) {
      this.datosGuardarEdificioDireccionLocalizacion.idEmpresa = this.data.idEmpresa;
      this.datosGuardarEdificioDireccionLocalizacion.idDireccion = this.data.direccion.id;
      this.datosGuardarEdificioDireccionLocalizacion.idEdificio = this.data.edificio.id;
      this.datosGuardarEdificioDireccionLocalizacion.idLocalizacion = this.data.localizacion.id;
      if (this.datosGuardarEdificioDireccionLocalizacion.localizacion) {
        this.datosGuardarEdificioDireccionLocalizacion.localizacion.entidadId = this.data.edificio.id.toString();
      }
      this._cargandoService.habilitarCargando();
      this._edificioRestService
        .editarEdificioDireccionLocalizacion(
          this.datosGuardarEdificioDireccionLocalizacion,
        )
        .subscribe(
          (respuestaEditarEdificio: EdificioInterface) => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            (respuestaEditarEdificio.direccion as DireccionInterface).lugar = this.lugarSeleccionado;
            this.dialogo.close(respuestaEditarEdificio);
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            this._cargandoService.deshabilitarCargando();
            console.error(
              {
                error,
                mensaje: 'Error al editar el edificio',
                data: this.datosGuardarEdificioDireccionLocalizacion
              }
            );
            this._toasterService.pop(toastErrorEditar);
          },
        );
    } else {
      this.edificioCrearEditar.empresa = this.data.idEmpresa;
      this._cargandoService.habilitarCargando();
      this._edificioRestService
        .guardarEdificioDireccionLocalizacion(
          this.datosGuardarEdificioDireccionLocalizacion,
        )
        .subscribe(
          (respuestaCrearEdificio: EdificioInterface) => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoCrear);
            (respuestaCrearEdificio.direccion as DireccionInterface).lugar = this.lugarSeleccionado;
            this.dialogo.close(respuestaCrearEdificio);
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(
              {
                error,
                mensaje: 'Error al guardar el edificio',
                data: this.datosGuardarEdificioDireccionLocalizacion
              }
            );
            this._toasterService.pop(toastErrorCrear);
          },
        );
    }
  }
}
