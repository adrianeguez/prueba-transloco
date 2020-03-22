import {FormGroup} from '@angular/forms';
/* tslint:disable:quotemark*/
import {
  ConfiguracionFormBuilder,
  ObjetoMensajeValidacionInterfaz,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes, SOLO_NUMEROS
} from '@manticore-labs/ng-api';
import {SOLO_LETRAS_NUMEROS} from '../../../../../constantes/patrones';
import {MENSAJE_SOLO_NUMEROS, MENSAJE_SOLO_NUMEROS_LETRAS} from '../../../../../constantes/mensajes-patrones';

export class InformacionTributariaFormulario {
    formGroup: FormGroup;
    mensajesValidacionTipoIdentificacion: MensajesValidacionInformacionTributaria;
    mensajesValidacionDocumento: MensajesValidacionInformacionTributaria;
    mensajesValidacionRazonSocial: MensajesValidacionInformacionTributaria;
    mensajesValidacionDireccion: MensajesValidacionInformacionTributaria;
    mensajesValidacionTelefono: MensajesValidacionInformacionTributaria;
    mensajesValidacionCorreo: MensajesValidacionInformacionTributaria;
    mensajesValidacionTipoContribuyente: MensajesValidacionInformacionTributaria;
    mensajesValidacionContribuyenteEspecial: MensajesValidacionInformacionTributaria;
    mensajesValidacionObligadoContabilidad: MensajesValidacionInformacionTributaria;
    // contenidoPropiedad - NO BORRAR ESTA LINEA
    configuracionFormBuilder: ConfiguracionFormBuilder;

    // prettier-ignore
    constructor(
        public tipoIdentificacion: string,
        public documento: string,
        public razonSocial: string,
        public direccion: string,
        public telefono: string,
        public correo: string,
        public tipoContribuyente: string,
        public contribuyenteEspecial: number,
        public obligadoContabilidad: string,
        public id?: number,
        // contenidoConstructor - NO BORRAR ESTA LINEA
    ) {
        this.encerarConfiguracionFormBuilderTipoIdentificacion();

this.encerarConfiguracionFormBuilderDocumento();

this.encerarConfiguracionFormBuilderRazonSocial();

this.encerarConfiguracionFormBuilderDireccion();

this.encerarConfiguracionFormBuilderTelefono();

this.encerarConfiguracionFormBuilderCorreo();

this.encerarConfiguracionFormBuilderTipoContribuyente();

this.encerarConfiguracionFormBuilderContribuyenteEspecial();

this.encerarConfiguracionFormBuilderObligadoContabilidad();

// contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
    }


       private encerarConfiguracionFormBuilderTipoIdentificacion() {

        // empiezaArgumentosTipoIdentificacion - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "tipoIdentificacion",
            "nombreAPresentarse": "Tipo de documento",
            "ejemplo": "EJ: Tipo Identificacion",
            "tooltip": "Ingrese o seleccione el Tipo Identificación",
            "minLength": false,
            "maxLength": false,
            "min": false,
            "max": false,
            "patternMensaje": "Error en Tipo Identificacion",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "autocomplete",
                "autocompleteBusqueda": "TipoIdentificacion,nombre"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosTipoIdentificacion - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionTipoIdentificacion = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionTipoIdentificacion.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionTipoIdentificacion.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderDocumento() {

        // empiezaArgumentosDocumento - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "documento",
            "nombreAPresentarse": "# Documento",
            "ejemplo": "EJ: 1724158874001",
            "tooltip": "Ingrese el número del documento",
            "minLength": 1,
            "maxLength": 50,
            "min": false,
            "max": false,
            "patternMensaje": MENSAJE_SOLO_NUMEROS_LETRAS,
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosDocumento - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = SOLO_LETRAS_NUMEROS;

        this.mensajesValidacionDocumento = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionDocumento.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionDocumento.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderRazonSocial() {

        // empiezaArgumentosRazonSocial - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "razonSocial",
            "nombreAPresentarse": "Razón social",
            "ejemplo": "EJ: Manticore s.a",
            "tooltip": "Ingrese la razón social de la empresa",
            "minLength": 3,
            "maxLength": 150,
            "min": false,
            "max": false,
            "patternMensaje": "Error en Razon Social",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosRazonSocial - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionRazonSocial = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionRazonSocial.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionRazonSocial.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderDireccion() {

        // empiezaArgumentosDireccion - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "direccion",
            "nombreAPresentarse": "Dirección",
            "ejemplo": "EJ: Av. Amazonas N37-61",
            "tooltip": "Ingrese la dirección",
            "minLength": 1,
            "maxLength": 100,
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

       private encerarConfiguracionFormBuilderTelefono() {

        // empiezaArgumentosTelefono - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "telefono",
            "nombreAPresentarse": "Teléfono",
            "ejemplo": "EJ: 992998255",
            "tooltip": "Ingrese el teléfono",
            "minLength": 9,
            "maxLength": 10,
            "min": false,
            "max": false,
            "patternMensaje": MENSAJE_SOLO_NUMEROS,
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosTelefono - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = SOLO_NUMEROS;

        this.mensajesValidacionTelefono = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionTelefono.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionTelefono.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderCorreo() {

        // empiezaArgumentosCorreo - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": true,
            "nombre": "correo",
            "nombreAPresentarse": "Correo",
            "ejemplo": "EJ: manticore-labs@mail.com",
            "tooltip": "Ingrese el correo",
            "minLength": 5,
            "maxLength": 60,
            "min": false,
            "max": false,
            "patternMensaje": "Error en Correo",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosCorreo - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionCorreo = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionCorreo.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionCorreo.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderTipoContribuyente() {

        // empiezaArgumentosTipoContribuyente - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "tipoContribuyente",
            "nombreAPresentarse": "Tipo de Contribuyente",
            "ejemplo": "EJ: Tipo Contribuyente",
            "tooltip": "Seleccione el tipo de contribuyente",
            "minLength": false,
            "maxLength": false,
            "min": false,
            "max": false,
            "patternMensaje": "Error en Tipo Contribuyente",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "select-many",
                "opcionesSelect": "Sociedades,Persona Natural"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosTipoContribuyente - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionTipoContribuyente = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionTipoContribuyente.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionTipoContribuyente.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderContribuyenteEspecial() {

        // empiezaArgumentosContribuyenteEspecial - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": false,
            "email": false,
            "nombre": "contribuyenteEspecial",
            "nombreAPresentarse": "Contribuyente especial Nro",
            "ejemplo": "EJ: 24558",
            "tooltip": "Ingrese el númeo de contribuyente especial",
            "minLength": 3,
            "maxLength": 5,
            "min": false,
            "max": false,
            "patternMensaje": MENSAJE_SOLO_NUMEROS,
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosContribuyenteEspecial - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = SOLO_NUMEROS;

        this.mensajesValidacionContribuyenteEspecial = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionContribuyenteEspecial.configuracionFormBuilder = {
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

         // tslint:disable-next-line:max-line-length
        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionContribuyenteEspecial.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderObligadoContabilidad() {

        // empiezaArgumentosObligadoContabilidad - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "obligadoContabilidad",
            "nombreAPresentarse": "Obligado a contabilidad",
            "ejemplo": "EJ: Obligado Contabilidad",
            "tooltip": "Indique si esta Obligado a llevar Contabilidad",
            "minLength": false,
            "maxLength": false,
            "min": false,
            "max": false,
            "patternMensaje": "Error en Obligado Contabilidad",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "select-many",
                "opcionesSelect": "Si,No"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosObligadoContabilidad - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionObligadoContabilidad = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionObligadoContabilidad.configuracionFormBuilder = {
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

         // tslint:disable-next-line:max-line-length
        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionObligadoContabilidad.configuracionFormBuilder);
    }

    // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionInformacionTributaria extends ObjetoMensajeValidacionInterfaz {
    configuracionFormBuilder?: ConfiguracionFormBuilder;
}
