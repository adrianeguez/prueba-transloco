import {FormGroup} from '@angular/forms';
/* tslint:disable:quotemark*/
import {
  ConfiguracionFormBuilder,
  ObjetoMensajeValidacionInterfaz,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes, SOLO_NUMEROS,
} from '@manticore-labs/ng-api';
import {MENSAJE_SOLO_ENTEROS} from '../../../../../constantes/mensajes-patrones';
import {MASK_NUMEROS_DECIMALES} from '../../../../submodulo-pedido-front/constantes/mascaras';
import {quitarMascaraNumero} from '../../../../submodulo-pedido-front/funciones/mascaras/quitar-mascara-numero';

export class ArticuloBodegaFormulario {
    formGroup: FormGroup;
    mensajesValidacionArticuloEmpresa: MensajesValidacionArticuloBodega;
    mensajesValidacionMinimo: MensajesValidacionArticuloBodega;
    mensajesValidacionMaximo: MensajesValidacionArticuloBodega;
    mensajesValidacionMinimoAlerta: MensajesValidacionArticuloBodega;
    mensajesValidacionInventarioInicialCantidad: MensajesValidacionArticuloBodega;
    mensajesValidacionInventarioInicialDinero: MensajesValidacionArticuloBodega;
    // contenidoPropiedad - NO BORRAR ESTA LINEA
    configuracionFormBuilder: ConfiguracionFormBuilder;

    // prettier-ignore
    constructor(
        public articuloEmpresa: string,
        public minimo: string,
        public maximo: string,
        public minimoAlerta: string,
        public inventarioInicialCantidad: string,
        public inventarioInicialDinero: string,
        public id?: number,
        // contenidoConstructor - NO BORRAR ESTA LINEA
    ) {
        this.encerarConfiguracionFormBuilderArticuloEmpresa();

this.encerarConfiguracionFormBuilderMinimo();

this.encerarConfiguracionFormBuilderMaximo();

this.encerarConfiguracionFormBuilderMinimoAlerta();

this.encerarConfiguracionFormBuilderInventarioInicialCantidad();

this.encerarConfiguracionFormBuilderInventarioInicialDinero();

// contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
    }


       private encerarConfiguracionFormBuilderArticuloEmpresa() {

        // empiezaArgumentosArticuloEmpresa - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "articuloEmpresa",
            "nombreAPresentarse": "Artículo",
            "ejemplo": "EJ: Articulo Empresa",
            "tooltip": "Ingrese el artículo empresa",
            "minLength": false,
            "maxLength": 7,
            "min": false,
            "max": false,
            "patternMensaje": "Error en el artículo empresa",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "autocomplete",
                "autocompleteBusqueda": "ArticuloPorEmpresa,articulo.codigo"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosArticuloEmpresa - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = false;

        this.mensajesValidacionArticuloEmpresa = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionArticuloEmpresa.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionArticuloEmpresa.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderMinimo() {

        // empiezaArgumentosMinimo - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "minimo",
            "nombreAPresentarse": " Stock minímo",
            "ejemplo": "EJ: 20",
            "tooltip": "Ingrese el stock mínimo",
            "minLength": false,
            "maxLength": 7,
            "min": false,
            "max": false,
            "patternMensaje": MENSAJE_SOLO_ENTEROS,
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosMinimo - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = SOLO_NUMEROS;

        this.mensajesValidacionMinimo = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionMinimo.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionMinimo.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderMaximo() {

        // empiezaArgumentosMaximo - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "maximo",
            "nombreAPresentarse": " Stock maximo",
            "ejemplo": "EJ: 100",
            "tooltip": "Ingrese el stock máximo",
            "minLength": false,
            "maxLength": 7,
            "min": false,
            "max": false,
            "patternMensaje": MENSAJE_SOLO_ENTEROS,
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosMaximo - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = SOLO_NUMEROS;

        this.mensajesValidacionMaximo = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionMaximo.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionMaximo.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderMinimoAlerta() {

        // empiezaArgumentosMinimoAlerta - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "minimoAlerta",
            "nombreAPresentarse": "Stock Minímo Alerta",
            "ejemplo": "EJ: 25",
            "tooltip": "Ingrese el stock mínimo alerta",
            "minLength": false,
            "maxLength": 7,
            "min": false,
            "max": false,
            "patternMensaje": MENSAJE_SOLO_ENTEROS,
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosMinimoAlerta - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = SOLO_NUMEROS;

        this.mensajesValidacionMinimoAlerta = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionMinimoAlerta.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionMinimoAlerta.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderInventarioInicialCantidad() {

        // empiezaArgumentosInventarioInicialCantidad - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "inventarioInicialCantidad",
            "nombreAPresentarse": "Cantidad en número",
            "ejemplo": "EJ: 40",
            "tooltip": "Ingrese la cantidad inicial de inventario",
            "minLength": false,
            "maxLength": 7,
            "min": false,
            "max": false,
            "patternMensaje": MENSAJE_SOLO_ENTEROS,
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "false",
            "mascaraCurrency": "false",
            "mascaraFuncion": "false",
            "pattern": "false"
        };
        // terminaArgumentosInventarioInicialCantidad - NO BORRAR ESTA LINEA

        argumentos.mascara = false;
        argumentos.mascaraFuncion = false;
        argumentos.pattern = SOLO_NUMEROS;

        this.mensajesValidacionInventarioInicialCantidad = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionInventarioInicialCantidad.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionInventarioInicialCantidad.configuracionFormBuilder);
    }

       private encerarConfiguracionFormBuilderInventarioInicialDinero() {

        // empiezaArgumentosInventarioInicialDinero - NO BORRAR ESTA LINEA
        const argumentos: any = {
            "required": true,
            "email": false,
            "nombre": "inventarioInicialDinero",
            "nombreAPresentarse": "Cantidad en dinero",
            "ejemplo": "EJ: 50$",
            "tooltip": "Ingrese el dinero inicial de inventario",
            "minLength": false,
            "maxLength": 7,
            "min": false,
            "max": false,
            "patternMensaje": "Error en el inventario inicial de dinero",
            "tipoControl": {
                "tipoCampoHtml": "text",
                "tipo": "input-text"
            },
            "mascara": "MASK_NUMEROS_DECIMALES",
            "mascaraCurrency": "false",
            "mascaraFuncion": "quitarMascaraNumero",
            "pattern": "false"
        };
        // terminaArgumentosInventarioInicialDinero - NO BORRAR ESTA LINEA
        argumentos.mascara = false;
        argumentos.mascaraFuncion = quitarMascaraNumero;
        argumentos.pattern = false;

        this.mensajesValidacionInventarioInicialDinero = establecerMensajesDeValidacionComunes(
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

        this.mensajesValidacionInventarioInicialDinero.configuracionFormBuilder = {
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

        this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionInventarioInicialDinero.configuracionFormBuilder);
    }

    // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionArticuloBodega extends ObjetoMensajeValidacionInterfaz {
    configuracionFormBuilder?: ConfiguracionFormBuilder;
}
