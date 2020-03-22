import {FormGroup} from '@angular/forms';
/* tslint:disable:quotemark*/
import {
  ConfiguracionFormBuilder,
  ObjetoMensajeValidacionInterfaz,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes, SOLO_NUMEROS
} from '@manticore-labs/ng-api';
import {MENSAJE_SOLO_NUMEROS_LETRAS_ESPACIOS} from '../../../../../../constantes/mensajes-patrones';
import {SOLO_LETRAS_ESPACIOS_NUMEROS_TILDE_ENIES} from '../../../../../../constantes/patrones';


export class PreguntaFormulario {
    formGroup: FormGroup;
    mensajesValidacionDescripcion: MensajesValidacionPregunta;
    mensajesValidacionValor: MensajesValidacionPregunta;
    mensajesValidacionTratarDeNuevo: MensajesValidacionPregunta;
    // contenidoPropiedad - NO BORRAR ESTA LINEA
    configuracionFormBuilder: ConfiguracionFormBuilder;

    // prettier-ignore
    constructor(
        public descripcion: string,
        public valor: any,
        public tratarDeNuevo: string,
        // contenidoConstructor - NO BORRAR ESTA LINEA
    ) {
        this.encerarConfiguracionFormBuilderDescripcion();

this.encerarConfiguracionFormBuilderValor();

this.encerarConfiguracionFormBuilderTratarDeNuevo();

// contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
    }


       private encerarConfiguracionFormBuilderDescripcion() {

        // empiezaArgumentosDescripcion - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "descripcion",
            "nombreAPresentarse": "nombre",
            "ejemplo": "ejemplo",
            "tooltip": "ayuda",
            "minLength": 10,
            "maxLength": 255,
            "min": false,
            "max": false,
            "patternMensaje": "patternMensaje" ,
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosDescripcion - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = SOLO_LETRAS_ESPACIOS_NUMEROS_TILDE_ENIES;

        this.mensajesValidacionDescripcion = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionDescripcion.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionDescripcion.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderValor() {

        // empiezaArgumentosValor - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": false,
            "email": false,
            "nombre": "valor",
            "nombreAPresentarse": "nombre",
            "ejemplo": "ejemplo",
            "tooltip": "ayuda",
            "minLength": false,
            "maxLength": false,
            "min": 1,
            "max": false,
            "patternMensaje": "patternMensaje" ,
            "tipoControl": {
                "tipoCampoHtml": "number",
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
        argumentos.pattern = SOLO_NUMEROS;
        argumentos.min = 1;

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

       private encerarConfiguracionFormBuilderTratarDeNuevo() {

        // empiezaArgumentosTratarDeNuevo - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "tratarDeNuevo",
            "nombreAPresentarse": "nombre",
            "ejemplo": "ejemplo",
            "tooltip": "ayuda",
            "minLength": false,
            "maxLength": false,
            "min": false,
            "max": false,
            "patternMensaje": "patternMensaje" ,
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "select-many",
                "opcionesSelect": "Yes,No"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosTratarDeNuevo - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionTratarDeNuevo = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionTratarDeNuevo.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionTratarDeNuevo.configuracionFormBuilder);
    }

    // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionPregunta extends ObjetoMensajeValidacionInterfaz {
    configuracionFormBuilder?: ConfiguracionFormBuilder;
}
