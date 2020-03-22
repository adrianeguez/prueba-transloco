import {FormGroup} from '@angular/forms';
/* tslint:disable:quotemark*/
import {
    ConfiguracionFormBuilder,
    ObjetoMensajeValidacionInterfaz,
    encerarConfiguracionFormBuilder,
    establecerMensajesDeValidacionComunes
} from '@manticore-labs/ng-api';

export class NombrePermisoFormulario {
    formGroup: FormGroup;
    mensajesValidacionNombre: MensajesValidacionNombrePermiso;
    mensajesValidacionNombreModulo: MensajesValidacionNombrePermiso;
    // contenidoPropiedad - NO BORRAR ESTA LINEA
    configuracionFormBuilder: ConfiguracionFormBuilder;

    // prettier-ignore
    constructor(
        public nombre: string,
        public nombreModulo: string,
        // contenidoConstructor - NO BORRAR ESTA LINEA
    ) {
        this.encerarConfiguracionFormBuilderNombre();

this.encerarConfiguracionFormBuilderNombreModulo();

// contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
    }


       private encerarConfiguracionFormBuilderNombre() {

        // empiezaArgumentosNombre - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "nombre",
            "nombreAPresentarse": "Nombre",
            "ejemplo": "EJ: Puede editar usuario",
            "tooltip": "Ingrese nombre del permiso",
            "minLength": 4,
            "maxLength": 30,
            "min": false,
            "max": false,
            "patternMensaje": "Error en Nombre",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosNombre - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionNombre = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionNombre.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionNombre.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderNombreModulo() {

        // empiezaArgumentosNombreModulo - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "nombreModulo",
            "nombreAPresentarse": "Nombre módulo",
            "ejemplo": "EJ: Empresa",
            "tooltip": "Ingrese nombre del módulo",
            "minLength": 3,
            "maxLength": 80,
            "min": false,
            "max": false,
            "patternMensaje": "Error en Nombre Modulo",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosNombreModulo - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionNombreModulo = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionNombreModulo.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionNombreModulo.configuracionFormBuilder);
    }

    // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionNombrePermiso extends ObjetoMensajeValidacionInterfaz {
    configuracionFormBuilder?: ConfiguracionFormBuilder;
}
