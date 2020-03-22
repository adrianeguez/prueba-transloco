import {FormGroup} from '@angular/forms';
/* tslint:disable:quotemark*/
import {
    ConfiguracionFormBuilder,
    ObjetoMensajeValidacionInterfaz,
    encerarConfiguracionFormBuilder,
    establecerMensajesDeValidacionComunes
} from '@manticore-labs/ng-api';

export class TipoSistemaFormulario {
    formGroup: FormGroup;
    mensajesValidacionTipo: MensajesValidacionTipoSistema;
    mensajesValidacionValor: MensajesValidacionTipoSistema;
    // contenidoPropiedad - NO BORRAR ESTA LINEA
    configuracionFormBuilder: ConfiguracionFormBuilder;

    // prettier-ignore
    constructor(
        public tipo: string,
        public valor: string,
        // contenidoConstructor - NO BORRAR ESTA LINEA
    ) {
        this.encerarConfiguracionFormBuilderTipo();

this.encerarConfiguracionFormBuilderValor();

// contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
    }


       private encerarConfiguracionFormBuilderTipo() {

        // empiezaArgumentosTipo - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "tipo",
            "nombreAPresentarse": "Tipo sistema",
            "ejemplo": "EJ: Ingreso",
            "tooltip": "Seleccione el tipo sistema",
            "minLength": false,
            "maxLength": false,
            "min": false,
            "max": false,
            "patternMensaje": "Error en el tipo sistema",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "select-many",
                "opcionesSelect": "Ingreso,Egreso"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosTipo - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionTipo = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionTipo.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionTipo.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderValor() {

        // empiezaArgumentosValor - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "valor",
            "nombreAPresentarse": "Valor",
            "ejemplo": "EJ: Ingreso de dinero",
            "tooltip": "Ingrese el valor",
            "minLength": 3,
            "maxLength": 100,
            "min": false,
            "max": false,
            "patternMensaje": "Error en el valor",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosValor - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
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

interface MensajesValidacionTipoSistema extends ObjetoMensajeValidacionInterfaz {
    configuracionFormBuilder?: ConfiguracionFormBuilder;
}
