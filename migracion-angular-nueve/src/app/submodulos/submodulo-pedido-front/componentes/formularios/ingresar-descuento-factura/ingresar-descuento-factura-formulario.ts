import {FormGroup} from '@angular/forms';
/* tslint:disable:quotemark*/
import {
  ConfiguracionFormBuilder,
  ObjetoMensajeValidacionInterfaz,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes, SOLO_ENTEROS_O_DECIMALES__POSITIVOS
} from '@manticore-labs/ng-api';
import {MASK_NUMEROS_DECIMALES, MASK_NUMERO_PORCENTUAL, MASK_DESCUENTO_PORCENTUAL} from '../../../constantes/mascaras';
import {quitarMascaraNumero} from '../../../funciones/mascaras/quitar-mascara-numero';

export class IngresarDescuentoFacturaFormulario {
    formGroup: FormGroup;
    mensajesValidacionMotivo: MensajesValidacionIngresarDescuentoFactura;
    mensajesValidacionDescuentoPorcentual: MensajesValidacionIngresarDescuentoFactura;
    mensajesValidacionValor: MensajesValidacionIngresarDescuentoFactura;
    // contenidoPropiedad - NO BORRAR ESTA LINEA
    configuracionFormBuilder: ConfiguracionFormBuilder;

    // prettier-ignore
    constructor(
        public motivo: string,
        public descuentoPorcentual: string,
        public valor: string,
        // contenidoConstructor - NO BORRAR ESTA LINEA
    ) {
        this.encerarConfiguracionFormBuilderMotivo();

this.encerarConfiguracionFormBuilderDescuentoPorcentual();

this.encerarConfiguracionFormBuilderValor();

// contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
    }


       private encerarConfiguracionFormBuilderMotivo() {

        // empiezaArgumentosMotivo - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": false,
            "email": false,
            "nombre": "motivo",
            "nombreAPresentarse": "Motivo del descuento",
            "ejemplo": "EJ: Descuento debido a ...",
            "tooltip": "Ingrese el motivo para el descuento",
            "minLength": false,
            "maxLength": false,
            "min": false,
            "max": false,
            "patternMensaje": "Error en Motivo",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosMotivo - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionMotivo = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionMotivo.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionMotivo.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderDescuentoPorcentual() {

        // empiezaArgumentosDescuentoPorcentual - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "descuentoPorcentual",
            "nombreAPresentarse": "% Descuento",
            "ejemplo": "EJ: 12%",
            "tooltip": "Ingrese el valor porcentual del descuento",
            "minLength": false,
            "maxLength": false,
            "min": false,
            "max": false,
            "patternMensaje": "Error en Descuento Porcentual",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
          "mascara": "MASK_NUMERO_PORCENTUAL",
          "mascaraCurrency": "false",
          "mascaraFuncion": "quitarMascaraNumero",
        };
        // terminaArgumentosDescuentoPorcentual - NO BORRAR ESTA LINEA

        argumentos.mascara = MASK_DESCUENTO_PORCENTUAL;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionDescuentoPorcentual = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionDescuentoPorcentual.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(
          this.mensajesValidacionDescuentoPorcentual.configuracionFormBuilder
        );
    }

       private encerarConfiguracionFormBuilderValor() {

        // empiezaArgumentosValor - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "valor",
            "nombreAPresentarse": "$ Descuento",
            "ejemplo": "EJ: 5",
            "tooltip": "Ingrese el valor del descuento",
            "minLength": false,
            "maxLength": false,
            "min": false,
            "max": false,
            "patternMensaje": "Error en Valor",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
          "mascara": "MASK_NUMEROS_DECIMALES",
          "mascaraCurrency": "false",
          "mascaraFuncion": "quitarMascaraNumero",
        };
        // terminaArgumentosValor - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = quitarMascaraNumero;
        argumentos.pattern = false;

        this.mensajesValidacionValor = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionValor.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionValor.configuracionFormBuilder);
    }

    // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionIngresarDescuentoFactura extends ObjetoMensajeValidacionInterfaz {
    configuracionFormBuilder?: ConfiguracionFormBuilder;
}
