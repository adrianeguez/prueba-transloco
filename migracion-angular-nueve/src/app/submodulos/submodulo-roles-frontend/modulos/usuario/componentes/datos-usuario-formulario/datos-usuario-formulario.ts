import {FormGroup} from '@angular/forms';
/* tslint:disable:quotemark*/
import {
  ConfiguracionFormBuilder,
  ObjetoMensajeValidacionInterfaz,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes, CEDULA_MASCARA, quitarMaskCedula, CELULAR_MASK, quitarMascaraCelular
} from '@manticore-labs/ng-api';
import {SOLO_LETRAS_ESPACIOS_TILDES_ENIES} from '@manticore-labs/ng-api/build/main/lib/mascaras/patrones/solo-letras-espacios-tildes-enie';
import {MASCARA_TELEFONO} from '../../../../../submodulo-front-comun/constantes/mascara-telefono';

export class DatosUsuarioFormulario {
    formGroup: FormGroup;
    mensajesValidacionNombres: MensajesValidacionDatosUsuario;
    mensajesValidacionApellidos: MensajesValidacionDatosUsuario;
    mensajesValidacionIdentificacionPais: MensajesValidacionDatosUsuario;
    mensajesValidacionEmail: MensajesValidacionDatosUsuario;
    mensajesValidacionDireccion: MensajesValidacionDatosUsuario;
    mensajesValidacionCelular: MensajesValidacionDatosUsuario;
    // contenidoPropiedad - NO BORRAR ESTA LINEA
    configuracionFormBuilder: ConfiguracionFormBuilder;

    // prettier-ignore
    constructor(
        public nombres: string,
        public apellidos: string,
        public identificacionPais: string,
        public email: string,
        public direccion: string,
        public celular: string,
        // contenidoConstructor - NO BORRAR ESTA LINEA
    ) {
        this.encerarConfiguracionFormBuilderNombres();

this.encerarConfiguracionFormBuilderApellidos();

this.encerarConfiguracionFormBuilderIdentificacionPais();

this.encerarConfiguracionFormBuilderEmail();

this.encerarConfiguracionFormBuilderDireccion();

this.encerarConfiguracionFormBuilderCelular();

// contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
    }


       private encerarConfiguracionFormBuilderNombres() {

        // empiezaArgumentosNombres - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "nombres",
            "nombreAPresentarse": "Nombres",
            "ejemplo": "EJ: Luis Alberto",
            "tooltip": "Ingrese nombres",
            "minLength": 3,
            "maxLength": 70,
            "min": false,
            "max": false,
            "patternMensaje": "Solo se aceptan letras.",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "SOLO_LETRAS_ESPACIOS_TILDES_ENIES"
        };
        // terminaArgumentosNombres - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = SOLO_LETRAS_ESPACIOS_TILDES_ENIES;

        this.mensajesValidacionNombres = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionNombres.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionNombres.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderApellidos() {

        // empiezaArgumentosApellidos - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "apellidos",
            "nombreAPresentarse": "Apellidos",
            "ejemplo": "EJ: Almeida Salinas",
            "tooltip": "Ingrese apellidos",
            "minLength": 3,
            "maxLength": 70,
            "min": false,
            "max": false,
            "patternMensaje": "Solo se aceptan letras.",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "SOLO_LETRAS_ESPACIOS_TILDES_ENIES"
        };
        // terminaArgumentosApellidos - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = SOLO_LETRAS_ESPACIOS_TILDES_ENIES;

        this.mensajesValidacionApellidos = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionApellidos.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionApellidos.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderIdentificacionPais() {

        // empiezaArgumentosIdentificacionPais - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "identificacionPais",
            "nombreAPresentarse": "Cédula",
            "ejemplo": "EJ: 171717171-8",
            "tooltip": "Ingrese una cédula",
            "minLength": false,
            "maxLength": false,
            "min": false,
            "max": false,
            "patternMensaje": "Error en Identificacion Pais",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "CEDULA_MASCARA",
            "mascaraCurrency": "false",
            "mascaraFuncion": "quitarMaskCedula",
            "pattern": "false"
        };
        // terminaArgumentosIdentificacionPais - NO BORRAR ESTA LINEA

        argumentos.mascara = CEDULA_MASCARA;
        argumentos.mascaraFuncion = quitarMaskCedula;
        argumentos.pattern = false;

        this.mensajesValidacionIdentificacionPais = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionIdentificacionPais.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionIdentificacionPais.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderEmail() {

        // empiezaArgumentosEmail - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": false,
            "email": true,
            "nombre": "email",
            "nombreAPresentarse": "Correo",
            "ejemplo": "EJ: correo@correo.com",
            "tooltip": "Ingrese correo electrónico",
            "minLength": false,
            "maxLength": false,
            "min": false,
            "max": false,
            "patternMensaje": "Error en Email",
            "tipoControl": {
                "tipoCampoHtml": "email",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosEmail - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionEmail = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionEmail.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionEmail.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderDireccion() {

        // empiezaArgumentosDireccion - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": false,
            "email": false,
            "nombre": "direccion",
            "nombreAPresentarse": "Dirección",
            "ejemplo": "EJ: Av Amazonas",
            "tooltip": "Ingrese dirección",
            "minLength": 5,
            "maxLength": 50,
            "min": false,
            "max": false,
            "patternMensaje": "Error en Direccion",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosDireccion - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionDireccion = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionDireccion.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionDireccion.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderCelular() {

        // empiezaArgumentosCelular - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "celular",
            "nombreAPresentarse": "Celular",
            "ejemplo": "EJ: 0998722414",
            "tooltip": "Ingrese celular",
            "minLength": false,
            "maxLength": false,
            "min": false,
            "max": false,
            "patternMensaje": "Error en Celular",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosCelular - NO BORRAR ESTA LINEA

        argumentos.mascara = MASCARA_TELEFONO;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionCelular = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionCelular.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionCelular.configuracionFormBuilder);
    }

    // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionDatosUsuario extends ObjetoMensajeValidacionInterfaz {
    configuracionFormBuilder?: ConfiguracionFormBuilder;
}
