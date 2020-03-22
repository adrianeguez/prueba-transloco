import {FormGroup} from '@angular/forms';
/* tslint:disable:quotemark*/
import {
    ConfiguracionFormBuilder,
    ObjetoMensajeValidacionInterfaz,
    encerarConfiguracionFormBuilder,
    establecerMensajesDeValidacionComunes
} from '@manticore-labs/ng-api';
import {MENSAJE_SOLO_NUMEROS} from '../../../../../constantes/mensajes-patrones';
import {MASK_NUMEROS_ENTEROS} from '../../../constantes/mascaras';

export class CabeceraCompraFormulario {
    formGroup: FormGroup;
    mensajesValidacionNumeroFactura: MensajesValidacionCabeceraCompra;
    mensajesValidacionNumeroSerie: MensajesValidacionCabeceraCompra;
    mensajesValidacionNumeroAutorizacion: MensajesValidacionCabeceraCompra;
    mensajesValidacionTipoFactura: MensajesValidacionCabeceraCompra;
    // contenidoPropiedad - NO BORRAR ESTA LINEA
    configuracionFormBuilder: ConfiguracionFormBuilder;

    // prettier-ignore
    constructor(
        public numeroFactura: string,
        public numeroSerie: string,
        public numeroAutorizacion: string,
        public tipoFactura: string,
        // contenidoConstructor - NO BORRAR ESTA LINEA
    ) {
        this.encerarConfiguracionFormBuilderNumeroFactura();

this.encerarConfiguracionFormBuilderNumeroSerie();

this.encerarConfiguracionFormBuilderNumeroAutorizacion();

this.encerarConfiguracionFormBuilderTipoFactura();

// contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
    }


       private encerarConfiguracionFormBuilderNumeroFactura() {

        // empiezaArgumentosNumeroFactura - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "numeroFactura",
            "nombreAPresentarse": "No. de factura",
            "ejemplo": "EJ: 000001",
            "tooltip": "Ingrese el número de factura",
            "minLength": false,
            "maxLength": false,
            "min": false,
            "max": false,
            "patternMensaje": "MENSAJE_SOLO_NUMEROS",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "MASK_NUMEROS_ENTEROS",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosNumeroFactura - NO BORRAR ESTA LINEA

        argumentos.mascara = MASK_NUMEROS_ENTEROS;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionNumeroFactura = establecerMensajesDeValidacionComunes(
            argumentos.nombre, // Nombre del campo
            argumentos.nombreAPresentarse, // Nombre a presentarse
            argumentos.ejemplo, // Ejemplo
            argumentos.tooltip, // Tooltip
            argumentos.mascara, // Mascara
            argumentos.mascaraFuncion, // Funcion para eliminar la mascara
            argumentos.minLength, // minLength
            argumentos.maxLength, // maxLength
            argumentos.min, // min
            argumentos.max, // max
            argumentos.pattern, // pattern
            argumentos.patternMensaje); // patternMensaje

        this.mensajesValidacionNumeroFactura.configuracionFormBuilder = {
            required: {
                activado: argumentos.required
            },
            email: {
                activado: argumentos.email
            },
            min: {
                activado: argumentos.min ? true : false
            },
            max: {
                activado: argumentos.max ? true : false
            },
            minlength: {
                activado: argumentos.minLength ? true : false
            },
            maxlength: {
                activado: argumentos.maxLength ? true : false
            },
            pattern: {
                activado: argumentos.pattern ? true : false
            }
        };

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionNumeroFactura.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderNumeroSerie() {

        // empiezaArgumentosNumeroSerie - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "numeroSerie",
            "nombreAPresentarse": "No. de serie",
            "ejemplo": "EJ: 0001",
            "tooltip": "Ingrese el número de serie",
            "minLength": false,
            "maxLength": false,
            "min": false,
            "max": false,
            "patternMensaje": "MENSAJE_SOLO_NUMEROS",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "MASK_NUMEROS_ENTEROS",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosNumeroSerie - NO BORRAR ESTA LINEA

        argumentos.mascara = MASK_NUMEROS_ENTEROS;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionNumeroSerie = establecerMensajesDeValidacionComunes(
            argumentos.nombre, // Nombre del campo
            argumentos.nombreAPresentarse, // Nombre a presentarse
            argumentos.ejemplo, // Ejemplo
            argumentos.tooltip, // Tooltip
            argumentos.mascara, // Mascara
            argumentos.mascaraFuncion, // Funcion para eliminar la mascara
            argumentos.minLength, // minLength
            argumentos.maxLength, // maxLength
            argumentos.min, // min
            argumentos.max, // max
            argumentos.pattern, // pattern
            argumentos.patternMensaje); // patternMensaje

        this.mensajesValidacionNumeroSerie.configuracionFormBuilder = {
            required: {
                activado: argumentos.required
            },
            email: {
                activado: argumentos.email
            },
            min: {
                activado: argumentos.min ? true : false
            },
            max: {
                activado: argumentos.max ? true : false
            },
            minlength: {
                activado: argumentos.minLength ? true : false
            },
            maxlength: {
                activado: argumentos.maxLength ? true : false
            },
            pattern: {
                activado: argumentos.pattern ? true : false
            }
        };

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionNumeroSerie.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderNumeroAutorizacion() {

        // empiezaArgumentosNumeroAutorizacion - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "numeroAutorizacion",
            "nombreAPresentarse": "No. de autorizacion ",
            "ejemplo": "EJ: 1231231231231231",
            "tooltip": "Ingrese el número de autorización",
            "minLength": false,
            "maxLength": 10,
            "min": false,
            "max": false,
            "patternMensaje": "MENSAJE_SOLO_NUMEROS",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "MASK_NUMEROS_ENTEROS",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosNumeroAutorizacion - NO BORRAR ESTA LINEA

        argumentos.mascara = MASK_NUMEROS_ENTEROS;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionNumeroAutorizacion = establecerMensajesDeValidacionComunes(
            argumentos.nombre, // Nombre del campo
            argumentos.nombreAPresentarse, // Nombre a presentarse
            argumentos.ejemplo, // Ejemplo
            argumentos.tooltip, // Tooltip
            argumentos.mascara, // Mascara
            argumentos.mascaraFuncion, // Funcion para eliminar la mascara
            argumentos.minLength, // minLength
            argumentos.maxLength, // maxLength
            argumentos.min, // min
            argumentos.max, // max
            argumentos.pattern, // pattern
            argumentos.patternMensaje); // patternMensaje

        this.mensajesValidacionNumeroAutorizacion.configuracionFormBuilder = {
            required: {
                activado: argumentos.required
            },
            email: {
                activado: argumentos.email
            },
            min: {
                activado: argumentos.min ? true : false
            },
            max: {
                activado: argumentos.max ? true : false
            },
            minlength: {
                activado: argumentos.minLength ? true : false
            },
            maxlength: {
                activado: argumentos.maxLength ? true : false
            },
            pattern: {
                activado: argumentos.pattern ? true : false
            }
        };

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionNumeroAutorizacion.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderTipoFactura() {

        // empiezaArgumentosTipoFactura - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "tipoFactura",
            "nombreAPresentarse": "Tipo de factura",
            "ejemplo": "EJ: Tipo Factura",
            "tooltip": "Escoja el tipo de factura",
            "minLength": false,
            "maxLength": false,
            "min": false,
            "max": false,
            "patternMensaje": "Error en Tipo Factura",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "select-many",
                "opcionesSelect": "Electrónica,Física"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosTipoFactura - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionTipoFactura = establecerMensajesDeValidacionComunes(
            argumentos.nombre, // Nombre del campo
            argumentos.nombreAPresentarse, // Nombre a presentarse
            argumentos.ejemplo, // Ejemplo
            argumentos.tooltip, // Tooltip
            argumentos.mascara, // Mascara
            argumentos.mascaraFuncion, // Funcion para eliminar la mascara
            argumentos.minLength, // minLength
            argumentos.maxLength, // maxLength
            argumentos.min, // min
            argumentos.max, // max
            argumentos.pattern, // pattern
            argumentos.patternMensaje); // patternMensaje

        this.mensajesValidacionTipoFactura.configuracionFormBuilder = {
            required: {
                activado: argumentos.required
            },
            email: {
                activado: argumentos.email
            },
            min: {
                activado: argumentos.min ? true : false
            },
            max: {
                activado: argumentos.max ? true : false
            },
            minlength: {
                activado: argumentos.minLength ? true : false
            },
            maxlength: {
                activado: argumentos.maxLength ? true : false
            },
            pattern: {
                activado: argumentos.pattern ? true : false
            }
        };

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionTipoFactura.configuracionFormBuilder);
    }

    // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionCabeceraCompra extends ObjetoMensajeValidacionInterfaz {
    configuracionFormBuilder?: ConfiguracionFormBuilder;
}
