import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {
  ConfiguracionDisabledInterfaz,
  encerarFormBuilder,
  generarCampos,
  generarEmiteEmpezoTipear,
  generarMensajesFormGroup,
  establecerCamposDisabled,
  NO_EXISTEN_REGISTROS,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { RutaVendedor } from './ruta-vendedor';
import { RutaVendedorFormulario } from './ruta-vendedor-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';
import { LugarRestService } from '../../../../servicios/rest/lugar-rest.service';
import { BodegaRestService } from '../../../../../submodulo-empresa-front/servicios/rest/bodega-rest.service';
import { LugarInterface } from '../../../../interfaces/lugar-interface';
import { BodegaInterface } from '../../../../../submodulo-empresa-front/interfaces/bodega.interface';

@Component({
  selector: 'ml-ruta-vendedor-formulario',
  templateUrl: './ruta-vendedor-formulario.component.html',
})
export class RutaVendedorFormularioComponent implements OnInit {
  @Output() rutaVendedorValido: EventEmitter<
    RutaVendedor | boolean
    > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioRutaVendedor;

  @Input() idEmpresa: number | string;

  rutaVendedor: RutaVendedorFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesRutaVendedor = {
    lugars: [],
    bodegas: [],
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
    private _lugarRestService: LugarRestService,
    private _bodegaRestService: BodegaRestService,
  ) {}

  ngOnInit() {

    this.rutaVendedor = new RutaVendedorFormulario(
      this.configuracionDisabled.Lugar.valor,
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Bodega.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.rutaVendedor);
    this.rutaVendedor.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.rutaVendedor),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.rutaVendedor);
    generarEmiteEmpezoTipear(this.rutaVendedor, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.rutaVendedor.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {

        this.mensajeToaster = '';

        if (this.validacionesCampos() && this.rutaVendedor.formGroup.valid) {
          this.rutaVendedorValido.emit(generarCampos(this.rutaVendedor));
          this._toasterService.pop('info', 'Valido', 'RutaVendedor válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.rutaVendedorValido.emit(false);
        }
      });
  }

  validacionesCampos() {
    return this.validarEjemplo() && this.validarLugar() && this.validarBodega();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }

  validarLugar() {
    if (this.rutaVendedor.formGroup.get('lugar').value !== null) {
      const lugarValorActual = this.rutaVendedor.formGroup.get('lugar').value
        .id;
      const lugarEncontrado = this.objetoVariablesGlobales.lugars.find(
        registro => registro.id === lugarValorActual,
      );
      if (lugarEncontrado || lugarValorActual) {
        return true;
      } else {
        this.mensajeToaster = 'Seleccione un lugar válido';
        const campoLugarExiste = this.rutaVendedor.formGroup.get('lugar').value;
        if (campoLugarExiste) {
          this.rutaVendedor.formGroup.patchValue({
            lugar: null,
          });
        }
        return false;
      }
    }
  }

  buscarLugars(evento) {
    this._cargandoService.habilitarCargando();
    let lugars$;
    if (evento.query === '') {
      lugars$ = this._lugarRestService.obtenerNodosFinales(1);
    } else {
      lugars$ = this._lugarRestService.obtenerNodosFinales(evento.query);
    }
    lugars$.subscribe(
      (lugars: any[]) => {
        this.objetoVariablesGlobales.lugars = lugars;
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(
          'error',
          'ERROR',
          'Revisa tu conexion o intentalo mas tarde',
        );
        // Manejar errores
      },
    );
  }

  validarBodega() {
    if (this.rutaVendedor.formGroup.get('bodega').value !== null) {
      const bodegaValorActual = this.rutaVendedor.formGroup.get('bodega').value
        .id;
      const bodegaEncontrado = this.objetoVariablesGlobales.bodegas.find(
        registro => registro.id === bodegaValorActual,
      );
      if (bodegaEncontrado || bodegaValorActual) {
        return true;
      } else {
        this.mensajeToaster = 'Seleccione un bodega válido';
        const campoBodegaExiste = this.rutaVendedor.formGroup.get('bodega')
          .value;
        if (campoBodegaExiste) {
          this.rutaVendedor.formGroup.patchValue({
            bodega: null,
          });
        }
        return false;
      }
    }
  }

  buscarBodegas(evento) {
    this._cargandoService.habilitarCargando();
    let bodegas$;
    const datos = {
      idEmpresa: +this.idEmpresa,
      habilitado: 1,
      skip: 0,
      take: null,
    };
    if (evento.query === '') {
      bodegas$ = this._bodegaRestService.obtenerBodegasPorEmpresa(datos);
    } else {
      const consulta = {
        // lenar la consulta
        buqueda: evento.query,
        idEmpresa: +this.idEmpresa,
        habilitado: 1,
        skip: 0,
        take: null,
      };
      bodegas$ = this._bodegaRestService.obtenerBodegasPorEmpresa(consulta);
    }
    bodegas$.subscribe(
      (bodegas: any[]) => {
        this.objetoVariablesGlobales.bodegas = bodegas[0];
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(
          'error',
          'ERROR',
          'Revisa tu conexion o intentalo mas tarde',
        );
        // Manejar errores
      },
    );
  }

  limpiarZonas() {
    this.rutaVendedor.formGroup.get('bodega').setValue('');
  }
}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesRutaVendedor {
  lugars: LugarInterface[];
  bodegas: BodegaInterface[];
}

export interface ConfiguracionFormluarioRutaVendedor {
  Id?: ConfiguracionDisabledInterfaz;
  Lugar?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Bodega?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_RUTAVENDEDOR = (): ConfiguracionFormluarioRutaVendedor => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
    Lugar: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Nombre: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Bodega: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
