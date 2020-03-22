import { FormGroup } from '@angular/forms';
/* tslint:disable:quotemark*/
// tslint:disable-next-line: max-line-length
import {
  ConfiguracionFormBuilder,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes,
  ObjetoMensajeValidacionInterfaz,
} from '@manticore-labs/ng-api';
import { quitarMascaraPrecio } from '../../../../funciones/mascara/quitar-mascara-precio';
import { MENSAJE_SOLO_NUMEROS } from './../../../../../../constantes/mensajes-patrones';
import { PRECIO_MASK_DECIMALES } from './../../../../constantes/mascara';

export class PrecioFormulario {
  formGroup: FormGroup;
  mensajesValidacionValor: MensajesValidacionPrecio;
  mensajesValidacionValorIncentivo: MensajesValidacionPrecio;
  mensajesValidacionEsPrincipal: MensajesValidacionPrecio;
  // contenidoPropiedad - NO BORRAR ESTA LINEA
  configuracionFormBuilder: ConfiguracionFormBuilder;

  // prettier-ignore
  constructor(
        public valor: string,
        public valorIncentivo: string,
        public esPrincipal: string,
        // contenidoConstructor - NO BORRAR ESTA LINEA
    ) {
        this.encerarConfiguracionFormBuilderValor();

this.encerarConfiguracionFormBuilderValorIncentivo();

this.encerarConfiguracionFormBuilderEsPrincipal();

// contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
    }

  private encerarConfiguracionFormBuilderValor() {
    // empiezaArgumentosValor - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'valor',
      nombreAPresentarse: 'Precio *',
      ejemplo: 'EJ: 15.00',
      tooltip: 'Ingrese el precio del articulo',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: MENSAJE_SOLO_NUMEROS,
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'PRECIO_MASK_DECIMALES',
      mascaraCurrency: 'false',
      mascaraFuncion: 'quitarMascaraPrecio',
      pattern: 'false',
    };
    // terminaArgumentosValor - NO BORRAR ESTA LINEA

    argumentos.mascara = PRECIO_MASK_DECIMALES;
    argumentos.mascaraFuncion = quitarMascaraPrecio;
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
      argumentos.patternMensaje,
    ); // patternMensaje

    this.mensajesValidacionValor.configuracionFormBuilder = {
      required: {
        activado: argumentos.required,
      },
      email: {
        activado: argumentos.email,
      },
      min: {
        activado: argumentos.min ? true : false,
      },
      max: {
        activado: argumentos.max ? true : false,
      },
      minlength: {
        activado: argumentos.minLength ? true : false,
      },
      maxlength: {
        activado: argumentos.maxLength ? true : false,
      },
      pattern: {
        activado: argumentos.pattern ? true : false,
      },
    };

    this.configuracionFormBuilder = encerarConfiguracionFormBuilder(
      this.mensajesValidacionValor.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderValorIncentivo() {
    // empiezaArgumentosValorIncentivo - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'valorIncentivo',
      nombreAPresentarse: 'Valor incentivo',
      ejemplo: 'EJ: 15.00',
      tooltip: 'Ingrese el valor incentivo del articulo',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: MENSAJE_SOLO_NUMEROS,
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'PRECIO_MASK_DECIMALES',
      mascaraCurrency: 'false',
      mascaraFuncion: 'quitarMascaraPrecio',
      pattern: 'false',
    };
    // terminaArgumentosValorIncentivo - NO BORRAR ESTA LINEA

    argumentos.mascara = PRECIO_MASK_DECIMALES;
    argumentos.mascaraFuncion = quitarMascaraPrecio;
    argumentos.pattern = false;

    this.mensajesValidacionValorIncentivo = establecerMensajesDeValidacionComunes(
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
      argumentos.patternMensaje,
    ); // patternMensaje

    this.mensajesValidacionValorIncentivo.configuracionFormBuilder = {
      required: {
        activado: argumentos.required,
      },
      email: {
        activado: argumentos.email,
      },
      min: {
        activado: argumentos.min ? true : false,
      },
      max: {
        activado: argumentos.max ? true : false,
      },
      minlength: {
        activado: argumentos.minLength ? true : false,
      },
      maxlength: {
        activado: argumentos.maxLength ? true : false,
      },
      pattern: {
        activado: argumentos.pattern ? true : false,
      },
    };

    this.configuracionFormBuilder = encerarConfiguracionFormBuilder(
      this.mensajesValidacionValorIncentivo.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderEsPrincipal() {
    // empiezaArgumentosEsPrincipal - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'esPrincipal',
      nombreAPresentarse: 'Es principal *',
      ejemplo: 'EJ: Es Principal',
      tooltip: 'Ingrese Es Principal',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en es principal',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'select-many',
        opcionesSelect: 'Si,No',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosEsPrincipal - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionEsPrincipal = establecerMensajesDeValidacionComunes(
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
      argumentos.patternMensaje,
    ); // patternMensaje

    this.mensajesValidacionEsPrincipal.configuracionFormBuilder = {
      required: {
        activado: argumentos.required,
      },
      email: {
        activado: argumentos.email,
      },
      min: {
        activado: argumentos.min ? true : false,
      },
      max: {
        activado: argumentos.max ? true : false,
      },
      minlength: {
        activado: argumentos.minLength ? true : false,
      },
      maxlength: {
        activado: argumentos.maxLength ? true : false,
      },
      pattern: {
        activado: argumentos.pattern ? true : false,
      },
    };

    this.configuracionFormBuilder = encerarConfiguracionFormBuilder(
      this.mensajesValidacionEsPrincipal.configuracionFormBuilder,
    );
  }

  // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionPrecio extends ObjetoMensajeValidacionInterfaz {
  configuracionFormBuilder?: ConfiguracionFormBuilder;
}
