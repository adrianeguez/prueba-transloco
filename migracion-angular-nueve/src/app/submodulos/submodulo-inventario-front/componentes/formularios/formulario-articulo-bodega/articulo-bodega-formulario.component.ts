
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {
  ConfiguracionDisabledInterfaz,
  encerarFormBuilder,
  generarCampos,
  generarEmiteEmpezoTipear,
  generarMensajesFormGroup,
  establecerCamposDisabled,
  NO_EXISTEN_REGISTROS
} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {ArticuloBodega} from './articulo-bodega';
import {ArticuloBodegaFormulario} from './articulo-bodega-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {ArticuloPorEmpresaRestService} from '../../../servicios/rest/articulo-empresa.service';
import {ArticuloBodegaInterface} from '../../../interfaces/articulo-bodega.interface';
import {NUMERO_FILAS_TABLAS} from '../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {CurrencyMaskConfig} from 'ng2-currency-mask/src/currency-mask.config';
import {ArticuloBodegaRestService} from '../../../servicios/rest/articulo-bodega-rest.service';


@Component({
  selector: 'ml-articulo-bodega-formulario',
  templateUrl: './articulo-bodega-formulario.component.html'
})

export class ArticuloBodegaFormularioComponent implements OnInit {

  @Output() articuloBodegaValido: EventEmitter<ArticuloBodega | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioArticuloBodega;

  @Input() idEmpresa: number;

  @Input() idBodega: number;
  articuloBodega: ArticuloBodegaFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesArticuloBodega = {

    articuloPorEmpresas: [],
  };
  opcionesCurrencyMask: CurrencyMaskConfig = { prefix: '$ ', thousands: ',', decimal: '.', align: 'center', allowNegative: false, precision: 2, suffix: ' USD' };

  constructor(private _formBuilder: FormBuilder,
              private _cargandoService: CargandoService,
              private _toasterService: ToasterService,
              private _articuloPorEmpresaRestService: ArticuloPorEmpresaRestService,
              private readonly _articuloBodegaRestService: ArticuloBodegaRestService,
  ) {

  }

  ngOnInit() {

    this.articuloBodega = new ArticuloBodegaFormulario(
      this.configuracionDisabled.ArticuloEmpresa.valor,
      this.configuracionDisabled.Minimo.valor,
      this.configuracionDisabled.Maximo.valor,
      this.configuracionDisabled.MinimoAlerta.valor,
      this.configuracionDisabled.InventarioInicialCantidad.valor,
      this.configuracionDisabled.InventarioInicialDinero.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.articuloBodega);
    this.articuloBodega.formGroup = this._formBuilder.group(encerarFormBuilder(this.articuloBodega));
    generarMensajesFormGroup(this.configuracionDisabled, this.articuloBodega);
    generarEmiteEmpezoTipear(this.articuloBodega, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.articuloBodega
      .formGroup
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        camposValidados => {
          this.mensajeToaster = '';

          if (this.validacionesCampos() && this.articuloBodega.formGroup.valid) {

            this.articuloBodegaValido.emit(generarCampos(this.articuloBodega));
            this._toasterService.pop('info', 'Valido', 'Articulo por bodega válida ');

          } else {

            if (this.mensajeToaster !== '') {
              this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
            }
            this.articuloBodegaValido.emit(false);
          }
        }
      );
  }

  validacionesCampos() {
    return this.validarEjemplo() && this.validarArticuloPorEmpresa();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }


  validarArticuloPorEmpresa() {
    if (this.articuloBodega.formGroup.get('articuloEmpresa').value !== null) {
      const articuloBodegaActual = this.articuloBodega.formGroup.get(
        'articuloEmpresa',
      ).value.id;
      const articuloBodegaEncontrado = this.objetoVariablesGlobales.articuloPorEmpresas.find(
        registro => registro.id === articuloBodegaActual,
      );
      if (articuloBodegaEncontrado || articuloBodegaActual) {
        return true;
      } else {
        this.mensajeToaster = 'Seleccione un artículo válido';
        return false;
      }
    }
  }

  buscarArticuloPorEmpresas(evento) {
    this._cargandoService.habilitarCargando();
    let articuloEmpresas$;
    if (evento.query === '') {
      const consulta = {
        where: {
          empresa: this.idEmpresa
        },
        relations: [
          'articulo', 'empresa'
        ]
      };
      articuloEmpresas$ = this._articuloBodegaRestService
        .filtarArticuloBodegaEmpresa({idEmpresa: this.idEmpresa, idBodega: this.idBodega});
    } else {
      const consulta = {
        busqueda: evento.query,
        idEmpresa: this.idEmpresa,
      };
      articuloEmpresas$ = this._articuloBodegaRestService
        .filtarArticuloBodegaEmpresa({idEmpresa: this.idEmpresa, idBodega: this.idBodega, articuloCodigoNombre: evento.query});
    }
    articuloEmpresas$
      .subscribe(
        (articuloPorEmpresas: any[]) => {
          this.objetoVariablesGlobales.articuloPorEmpresas = articuloPorEmpresas[0];
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
          this._toasterService.pop('error', 'ERROR', 'Revisa tu conexion o intentalo mas tarde');
          // Manejar errores
        }
      );
  }




}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesArticuloBodega {
  articuloPorEmpresas: ArticuloBodegaInterface[];
}

export interface ConfiguracionFormluarioArticuloBodega {
  Id?: ConfiguracionDisabledInterfaz;
  ArticuloEmpresa?: ConfiguracionDisabledInterfaz;
  Minimo?: ConfiguracionDisabledInterfaz;
  Maximo?: ConfiguracionDisabledInterfaz;
  MinimoAlerta?: ConfiguracionDisabledInterfaz;
  InventarioInicialCantidad?: ConfiguracionDisabledInterfaz;
  InventarioInicialDinero?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_ARTICULOBODEGA = (): ConfiguracionFormluarioArticuloBodega => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },
    ArticuloEmpresa: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    Minimo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    Maximo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    MinimoAlerta: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    InventarioInicialCantidad: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    InventarioInicialDinero: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

  };
};
