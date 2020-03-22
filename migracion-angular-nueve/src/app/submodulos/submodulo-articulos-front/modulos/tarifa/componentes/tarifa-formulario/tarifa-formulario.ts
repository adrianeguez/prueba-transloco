import { FormGroup } from '@angular/forms';
/* tslint:disable:quotemark*/
// tslint:disable-next-line: max-line-length
import {
  ConfiguracionFormBuilder,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes,
  ObjetoMensajeValidacionInterfaz,
} from '@manticore-labs/ng-api';
import { quitarMascaraNumero } from '../../../../funciones/mascara/quitar-mascara-numero';
import { quitarMascaraPorcentaje } from '../../../../funciones/mascara/quitar-mascara-porcentaje';
import { quitarMascaraPrecio } from '../../../../funciones/mascara/quitar-mascara-precio';
// tslint:disable-next-line: max-line-length
import {
  MENSAJE_SOLO_ENTEROS,
  MENSAJE_SOLO_LETRAS,
  MENSAJE_SOLO_NUMEROS,
  MENSAJE_SOLO_NUMEROS_LETRAS,
} from './../../../../../../constantes/mensajes-patrones';
import {
  SOLO_LETRAS,
  SOLO_LETRAS_ESPACIOS_NUMEROS_TILDE_ENIES,
  SOLO_LETRAS_NUMEROS,
} from './../../../../../../constantes/patrones';
import {
  MASK_NUMEROS_ENTEROS,
  PORCENTAJE_MASK_DECIMALES,
  PRECIO_MASK_DECIMALES,
} from './../../../../constantes/mascara';

export class TarifaFormulario {
  formGroup: FormGroup;
  mensajesValidacionNombre: MensajesValidacionTarifa;
  mensajesValidacionCodigoSri: MensajesValidacionTarifa;
  mensajesValidacionCodigo: MensajesValidacionTarifa;
  mensajesValidacionUnidadMedida: MensajesValidacionTarifa;
  mensajesValidacionCantidad: MensajesValidacionTarifa;
  mensajesValidacionValorPorcentaje: MensajesValidacionTarifa;
  mensajesValidacionValor: MensajesValidacionTarifa;
  // contenidoPropiedad - NO BORRAR ESTA LINEA
  configuracionFormBuilder: ConfiguracionFormBuilder;

  // prettier-ignore
  constructor(
        public nombre: string,
        public codigoSri: string,
        public codigo: string,
        public unidadMedida: string,
        public cantidad: string,
        public valorPorcentaje: string,
        public valor: string,
        // contenidoConstructor - NO BORRAR ESTA LINEA
    ) {
        this.encerarConfiguracionFormBuilderNombre();

this.encerarConfiguracionFormBuilderCodigoSri();

this.encerarConfiguracionFormBuilderCodigo();

this.encerarConfiguracionFormBuilderUnidadMedida();

this.encerarConfiguracionFormBuilderCantidad();

this.encerarConfiguracionFormBuilderValorPorcentaje();

this.encerarConfiguracionFormBuilderValor();

// contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
    }

  private encerarConfiguracionFormBuilderNombre() {
    // empiezaArgumentosNombre - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'nombre',
      nombreAPresentarse: 'Nombre *',
      ejemplo: 'EJ: IVA',
      tooltip: 'Ingrese el nombre de la tarifa',
      minLength: 3,
      maxLength: 60,
      min: false,
      max: false,
      patternMensaje: MENSAJE_SOLO_LETRAS,
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosNombre - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = SOLO_LETRAS_ESPACIOS_NUMEROS_TILDE_ENIES;

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
      argumentos.patternMensaje,
    ); // patternMensaje

    this.mensajesValidacionNombre.configuracionFormBuilder = {
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
      this.mensajesValidacionNombre.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderCodigoSri() {
    // empiezaArgumentosCodigoSri - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'codigoSri',
      nombreAPresentarse: 'Código SRI *',
      ejemplo: 'EJ: C001',
      tooltip: 'Ingrese el código SRI de la tarifa',
      minLength: 1,
      maxLength: 10,
      min: false,
      max: false,
      patternMensaje: MENSAJE_SOLO_NUMEROS_LETRAS,
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosCodigoSri - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = SOLO_LETRAS_NUMEROS;

    this.mensajesValidacionCodigoSri = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionCodigoSri.configuracionFormBuilder = {
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
      this.mensajesValidacionCodigoSri.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderCodigo() {
    // empiezaArgumentosCodigo - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'codigo',
      nombreAPresentarse: 'Código',
      ejemplo: 'EJ: C45W',
      tooltip: 'Ingrese el código de la tarifa',
      minLength: 1,
      maxLength: 10,
      min: false,
      max: false,
      patternMensaje: MENSAJE_SOLO_NUMEROS_LETRAS,
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosCodigo - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = SOLO_LETRAS_NUMEROS;

    this.mensajesValidacionCodigo = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionCodigo.configuracionFormBuilder = {
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
      this.mensajesValidacionCodigo.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderUnidadMedida() {
    // empiezaArgumentosUnidadMedida - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'unidadMedida',
      nombreAPresentarse: 'Unidad medida',
      ejemplo: 'EJ: litros, Oz',
      tooltip: 'Ingrese la unidad medida de la tarifa',
      minLength: 1,
      maxLength: 10,
      min: false,
      max: false,
      patternMensaje: MENSAJE_SOLO_LETRAS,
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosUnidadMedida - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = SOLO_LETRAS;

    this.mensajesValidacionUnidadMedida = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionUnidadMedida.configuracionFormBuilder = {
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
      this.mensajesValidacionUnidadMedida.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderCantidad() {
    // empiezaArgumentosCantidad - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'cantidad',
      nombreAPresentarse: 'Cantidad',
      ejemplo: 'EJ: 9',
      tooltip: 'Ingrese la cantidad de la tarifa',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: MENSAJE_SOLO_ENTEROS,
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'MASK_NUMEROS_ENTEROS',
      mascaraCurrency: 'false',
      mascaraFuncion: 'quitarMascaraNumero',
      pattern: 'false',
    };
    // terminaArgumentosCantidad - NO BORRAR ESTA LINEA

    argumentos.mascara = MASK_NUMEROS_ENTEROS;
    argumentos.mascaraFuncion = quitarMascaraNumero;
    argumentos.pattern = false;

    this.mensajesValidacionCantidad = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionCantidad.configuracionFormBuilder = {
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
      this.mensajesValidacionCantidad.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderValorPorcentaje() {
    // empiezaArgumentosValorPorcentaje - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'valorPorcentaje',
      nombreAPresentarse: 'Valor porcentaje',
      ejemplo: 'EJ: 28.11%',
      tooltip: 'Ingrese el valor porcentaje de la tarifa',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: MENSAJE_SOLO_NUMEROS,
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'PORCENTAJE_MASK_DECIMALES',
      mascaraCurrency: 'false',
      mascaraFuncion: 'quitarMascaraPorcentaje',
      pattern: 'false',
    };
    // terminaArgumentosValorPorcentaje - NO BORRAR ESTA LINEA

    argumentos.mascara = PORCENTAJE_MASK_DECIMALES;
    argumentos.mascaraFuncion = quitarMascaraPorcentaje;
    argumentos.pattern = false;

    this.mensajesValidacionValorPorcentaje = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionValorPorcentaje.configuracionFormBuilder = {
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
      this.mensajesValidacionValorPorcentaje.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderValor() {
    // empiezaArgumentosValor - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'valor',
      nombreAPresentarse: 'Valor',
      ejemplo: 'EJ: 14.5524',
      tooltip: 'Ingrese el valor de la tarifa',
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

  // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionTarifa extends ObjetoMensajeValidacionInterfaz {
  configuracionFormBuilder?: ConfiguracionFormBuilder;
}
