import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
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
import {Articulo} from './articulo';
import {ArticuloFormulario} from './articulo-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';
import {UnidadMedidaRestService} from '../../../../servicios/rest/unidad-medida-rest.service';
import {TipoImpuestoRestService} from '../../../../servicios/rest/tipo-impuesto-rest.service';
import {TarifaRestService} from '../../../../servicios/rest/tarifa-rest.service';
import {UnidadMedidaInterface} from '../../../../interfaces/unidad-medida.interface';
import {TipoImpuestoInterface} from '../../../../interfaces/tipo-impuesto.interface';
import {TarifaInterface} from '../../../../interfaces/tarifa.interface';


@Component({
    selector: 'ml-articulo-formulario',
    templateUrl: './articulo-formulario.component.html'
})

export class ArticuloFormularioComponent implements OnInit {

    @Output() articuloValido: EventEmitter<Articulo | boolean> = new EventEmitter();

    @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

    @Input() configuracionDisabled: ConfiguracionFormluarioArticulo;

    articulo: ArticuloFormulario;

    NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

    mensajeToaster = '';

    objetoVariablesGlobales: ObjetoVariablesGlobalesArticulo = {

        unidadMedidas: [],
        tipoImpuestos: [],
        tarifas: [],
    };
    private tipoImpuestoSeleccionada;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _cargandoService: CargandoService,
        private readonly _translocoService: TranslocoService,
        private _toasterService: ToasterService,
        private _unidadMedidaRestService: UnidadMedidaRestService,
        private _tipoImpuestoRestService: TipoImpuestoRestService,
        private _tarifaRestService: TarifaRestService,
    ) {


    }

    ngOnInit() {

        this.articulo = new ArticuloFormulario(
            this.configuracionDisabled.Nombre.valor,
            this.configuracionDisabled.NombreCorto.valor,
            this.configuracionDisabled.Descripcion.valor,
            this.configuracionDisabled.Codigo.valor,
            this.configuracionDisabled.CodigoAuxiliar.valor,
            this.configuracionDisabled.CodigoBarras.valor,
            this.configuracionDisabled.Peso.valor,
            this.configuracionDisabled.EmpresaProductora.valor,
            this.configuracionDisabled.HabilitadoStock.valor,
            this.configuracionDisabled.EsServicio.valor,
            this.configuracionDisabled.UnidadMedida.valor,
            this.configuracionDisabled.EsCurso.valor,
            this.configuracionDisabled.TipoImpuesto.valor,
            this.configuracionDisabled.Tarifa.valor,
        );
        console.log('datoss llegan form', this.articulo);

        // Empieza la construccion del formulario - No tocar estas lineas

        establecerCamposDisabled(this.configuracionDisabled, this.articulo);
        this.articulo.formGroup = this._formBuilder.group(encerarFormBuilder(this.articulo));
        generarMensajesFormGroup(this.configuracionDisabled, this.articulo);
        generarEmiteEmpezoTipear(this.articulo, this.empezoATipear);

        // Termina la construccion del formulario - No tocar estas lineas

        this.articulo
            .formGroup
            .valueChanges
            .pipe(
                debounceTime(1000)
            )
            .subscribe(
                camposValidados => {

                    console.log(this.articulo.formGroup);

                    this.mensajeToaster = '';

                    if (this.articulo.formGroup.valid && this.validacionesCampos()) {

                        this.articuloValido.emit(generarCampos(this.articulo));
                        this
                            ._toasterService
                            .pop(
                                'info',
                                this._translocoService.translate('formularios.comunes.valido'),
                                this._translocoService.translate('submoduloArticulos.articulo.articuloFormulario.toasterGeneral')
                            );

                    } else {

                        if (this.mensajeToaster !== '') {
                            this._toasterService.pop('warning', this._translocoService.translate('formularios.comunes.cuidado'), this.mensajeToaster);
                        }
                        this.articuloValido.emit(false);
                    }
                }
            );
    }

    validacionesCampos() {
        return this.validarEjemplo() && this.validarUnidadMedida() && this.validarTipoImpuesto() && this.validarTarifa();
    }

    validarEjemplo() {
        return true; // Implementacion de validacion ejemplo
    }


    validarUnidadMedida() {
        /*const valorCampo = this.articulo.formGroup.get('unidadMedida').value;
        if (valorCampo !== null || valorCampo !== undefined) {
            const unidadMedidaValorActual = valorCampo.id;
            const unidadMedidaEncontrado = this.objetoVariablesGlobales.unidadMedidas.find((registro) => registro.id === unidadMedidaValorActual);
            if (unidadMedidaEncontrado || typeof unidadMedidaValorActual === 'number' || typeof valorCampo === 'object') {
                return true;
            } else {
                this.mensajeToaster = this
                    ._translocoService
                    .translate('submoduloArticulos.articulo.articuloFormulario.unidadMedida.toaster');
                return false;
            }
        }*/
        const unidadMedidaValorActual = this.articulo.formGroup.get('unidadMedida').value.id;
        let unidadMedidaEncontrado = this.objetoVariablesGlobales.unidadMedidas.find((registro) => registro.id === unidadMedidaValorActual);
        if (typeof this.articulo.id !== 'object') {
            unidadMedidaEncontrado = {};
        }
        if (unidadMedidaEncontrado) {
            return true;
        } else {
            this.mensajeToaster = this
                ._translocoService
                .translate('submoduloArticulos.articulo.articuloFormulario.unidadMedida.toaster');
            return false;
        }
    }

    buscarUnidadMedidas(evento) {
        this._cargandoService.habilitarCargando();
        let unidadMedidas$;
        let consulta;
        if (evento.query === '') {
            consulta = { // lenar la consulta
                where: {
                    habilitado: 1,
                },
            };
        } else {
            consulta = { // lenar la consulta
                where: {
                    habilitado: 1,
                    nombre: `Like("%25${evento.query}%25")`,
                },
            };
        }
        unidadMedidas$ = this._unidadMedidaRestService
            .findAll('criterioBusqueda=' + JSON.stringify(consulta))
            .subscribe(
                (unidadMedidas: [UnidadMedidaInterface[], number]) => {
                    this.objetoVariablesGlobales.unidadMedidas = unidadMedidas[0];
                    this._cargandoService.deshabilitarCargando();
                },
                error => {
                    this._cargandoService.deshabilitarCargando();
                    console.error(error);
                    this._toasterService.pop(
                        'error',
                        this._translocoService
                            .translate('errores.errorTitulo'),
                        this._translocoService
                            .translate('errores.errorServidor'),
                    );
                    // Manejar errores
                }
            );
    }


    validarTipoImpuesto() {
        const valorCampo = this.articulo.formGroup.get('tipoImpuesto').value;
        if (valorCampo !== null || valorCampo !== undefined) {
            const tipoImpuestoValorActual = valorCampo.id;
            const tipoImpuestoEncontrado = this.objetoVariablesGlobales.tipoImpuestos.find((registro) => registro.id === tipoImpuestoValorActual);
            if (tipoImpuestoEncontrado || typeof tipoImpuestoValorActual === 'number' || typeof valorCampo === 'object' || valorCampo === 'valor') {
                return true;
            } else {
                this.mensajeToaster = this
                    ._translocoService
                    .translate('submoduloArticulos.articulo.articuloFormulario.tipoImpuesto.toaster');
                return false;
            }
        }
    }

    buscarTipoImpuestos(evento) {
        this._cargandoService.habilitarCargando();
        let tipoImpuestos$;
        let consulta;
        if (evento.query === '') {
            consulta = { // lenar la consulta
                where: {
                    habilitado: 1,
                },
            };
        } else {
            consulta = { // lenar la consulta
                where: {
                    habilitado: 1,
                    nombre: `Like("%25${evento.query}%25")`,
                },
            };
        }
        tipoImpuestos$ = this._tipoImpuestoRestService
            .findAll('criterioBusqueda=' + JSON.stringify(consulta))
            .subscribe(
                (tipoImpuestos: [TipoImpuestoInterface[], number]) => {
                    this.objetoVariablesGlobales.tipoImpuestos = tipoImpuestos[0];
                    this._cargandoService.deshabilitarCargando();
                },
                error => {
                    this._cargandoService.deshabilitarCargando();
                    console.error(error);
                    this._toasterService.pop(
                        'error',
                        this._translocoService
                            .translate('errores.errorTitulo'),
                        this._translocoService
                            .translate('errores.errorServidor'),
                    );
                    // Manejar errores
                }
            );
    }


    validarTarifa() {
        const valorCampo = this.articulo.formGroup.get('tarifa').value;
        if (valorCampo !== null || valorCampo !== undefined) {
            const tarifaValorActual = valorCampo.id;
            const tarifaEncontrado = this.objetoVariablesGlobales.tarifas.find((registro) => registro.id === tarifaValorActual);
            if (tarifaEncontrado || typeof tarifaValorActual === 'number' || typeof valorCampo === 'object' || valorCampo === 'valor') {
                return true;
            } else {
                this.mensajeToaster = this
                    ._translocoService
                    .translate('submoduloArticulos.articulo.articuloFormulario.tarifa.toaster');
                return false;
            }
        }
    }

    buscarTarifas(evento) {
        this._cargandoService.habilitarCargando();
        this.tipoImpuestoSeleccionada = this.articulo.formGroup.value.tipoImpuesto;
        let tarifas$;
        let consulta;
        if (this.tipoImpuestoSeleccionada) {
            if (evento.query === '') {
                consulta = { // lenar la consulta
                    where: {
                        tipoImpuesto: {id: this.tipoImpuestoSeleccionada.id},
                        habilitado: 1,
                    },
                };
                tarifas$ = this._tarifaRestService
                    .findAll('criterioBusqueda=' + JSON.stringify(consulta));
            } else {
                consulta = { // lenar la consulta
                    where: [
                        {
                            tipoImpuesto: {id: this.tipoImpuestoSeleccionada.id},
                            codigoSri: `Like("%25${evento.query}%25")`,
                            habilitado: 1,
                        },
                        {
                            valorPorcentaje: this.tipoImpuestoSeleccionada.id,
                            nombre: `Like("%25${evento.query}%25")`,
                            habilitado: 1,
                        },
                        {
                            tipoImpuesto: this.tipoImpuestoSeleccionada.id,
                            nombre: `Like("%25${evento.query}%25")`,
                            habilitado: 1,
                        }
                    ],
                };
                tarifas$ = this._tarifaRestService
                    .findWhereOr('criterioBusqueda=' + JSON.stringify(consulta));
            }
        } else {
            this._cargandoService.deshabilitarCargando();
        }
        tarifas$
            .subscribe(
                (tarifas: [TarifaInterface[], number]) => {
                    this.objetoVariablesGlobales.tarifas = tarifas[0];
                    this._cargandoService.deshabilitarCargando();
                },
                error => {
                    this._cargandoService.deshabilitarCargando();
                    console.error(error);
                    this._toasterService.pop(
                        'error',
                        this._translocoService
                            .translate('errores.errorTitulo'),
                        this._translocoService
                            .translate('errores.errorServidor'),
                    );
                    // Manejar errores
                }
            );
    }


}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesArticulo {
    unidadMedidas: UnidadMedidaInterface[];
    tipoImpuestos: TipoImpuestoInterface[];
    tarifas: TarifaInterface[];

}

export interface ConfiguracionFormluarioArticulo {
    Id?: ConfiguracionDisabledInterfaz;
    Nombre?: ConfiguracionDisabledInterfaz;
    NombreCorto?: ConfiguracionDisabledInterfaz;
    Descripcion?: ConfiguracionDisabledInterfaz;
    Codigo?: ConfiguracionDisabledInterfaz;
    CodigoAuxiliar?: ConfiguracionDisabledInterfaz;
    CodigoBarras?: ConfiguracionDisabledInterfaz;
    Peso?: ConfiguracionDisabledInterfaz;
    EmpresaProductora?: ConfiguracionDisabledInterfaz;
    HabilitadoStock?: ConfiguracionDisabledInterfaz;
    EsServicio?: ConfiguracionDisabledInterfaz;
    UnidadMedida?: ConfiguracionDisabledInterfaz;
    EsCurso?: ConfiguracionDisabledInterfaz;
    TipoImpuesto?: ConfiguracionDisabledInterfaz;
    Tarifa?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_ARTICULO = (): ConfiguracionFormluarioArticulo => {
    return {
        Id: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },
        Nombre: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        NombreCorto: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        Descripcion: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        Codigo: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        CodigoAuxiliar: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        CodigoBarras: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        Peso: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        EmpresaProductora: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        HabilitadoStock: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        EsServicio: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        UnidadMedida: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        EsCurso: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        TipoImpuesto: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        Tarifa: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

    };
};
