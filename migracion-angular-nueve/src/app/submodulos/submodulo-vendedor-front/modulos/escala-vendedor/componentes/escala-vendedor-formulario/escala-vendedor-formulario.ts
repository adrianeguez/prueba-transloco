import { FormGroup } from '@angular/forms';
import {
  ConfiguracionFormBuilder,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes,
  ObjetoMensajeValidacionInterfaz,
} from '@manticore-labs/ng-api';
import {
  MASK_NUMEROS_DECIMALES,
  PORCENTAJE_MASK_DECIMALES, PRECIO_MASK_DECIMALES,
} from '../../../../constantes/mascara';
import { quitarMascaraNumero } from '../../../../funciones/mascara/quitar-mascara-numero';
import { quitarMascaraPorcentaje } from '../../../../funciones/mascara/quitar-mascara-porcentaje';
import {quitarMascaraPrecio} from '../../../../funciones/mascara/quitar-mascara-precio';

export class EscalaVendedorFormulario {
  formGroup: FormGroup;
  mensajesValidacionNombre: MensajesValidacionEscalaVendedor;
  mensajesValidacionMinimo: MensajesValidacionEscalaVendedor;
  mensajesValidacionMaximo: MensajesValidacionEscalaVendedor;
  mensajesValidacionPorcentajeIndividual: MensajesValidacionEscalaVendedor;
  mensajesValidacionPorcentajeMultiple: MensajesValidacionEscalaVendedor;
  // contenidoPropiedad - NO BORRAR ESTA LINEA
  configuracionFormBuilder: ConfiguracionFormBuilder;

  // prettier-ignore
  constructor(
        public nombre: string,
        public minimo: string,
        public maximo: string,
        public porcentajeIndividual: string,
        public porcentajeMultiple: string,
        // contenidoConstructor - NO BORRAR ESTA LINEA
    ) {
        this.encerarConfiguracionFormBuilderNombre();

        this.encerarConfiguracionFormBuilderMinimo();

        this.encerarConfiguracionFormBuilderMaximo();

        this.encerarConfiguracionFormBuilderPorcentajeIndividual();

        this.encerarConfiguracionFormBuilderPorcentajeMultiple();

        // contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
    }

  private encerarConfiguracionFormBuilderNombre() {
    // empiezaArgumentosNombre - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'nombre',
      nombreAPresentarse: 'Nombre *',
      ejemplo: 'EJ: Escala 1',
      tooltip: 'Ingrese el nombre de la escala vendedor',
      minLength: 3,
      maxLength: 60,
      min: false,
      max: false,
      patternMensaje: 'Error en el nombre',
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

  private encerarConfiguracionFormBuilderMinimo() {
    // empiezaArgumentosMinimo - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'minimo',
      nombreAPresentarse: 'Mínimo *',
      ejemplo: 'EJ: 10',
      tooltip: 'Ingrese el mínimo valor de la escala',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en el mínimo',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'PRECIO_MASK_DECIMALES',
      mascaraCurrency: 'false',
      mascaraFuncion: 'quitarMascaraPrecio',
      pattern: 'false',
    };
    // terminaArgumentosMinimo - NO BORRAR ESTA LINEA

    argumentos.mascara = PRECIO_MASK_DECIMALES;
    argumentos.mascaraFuncion = quitarMascaraPrecio;
    argumentos.pattern = false;

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
      argumentos.patternMensaje,
    ); // patternMensaje

    this.mensajesValidacionMinimo.configuracionFormBuilder = {
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
      this.mensajesValidacionMinimo.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderMaximo() {
    // empiezaArgumentosMaximo - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'maximo',
      nombreAPresentarse: 'Máximo *',
      ejemplo: 'EJ: 100',
      tooltip: 'Ingrese el máximo valor de la escala vendedor',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en el máximo',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'PRECIO_MASK_DECIMALES',
      mascaraCurrency: 'false',
      mascaraFuncion: 'quitarMascaraPrecio',
      pattern: 'false',
    };
    // terminaArgumentosMaximo - NO BORRAR ESTA LINEA

    argumentos.mascara = PRECIO_MASK_DECIMALES;
    argumentos.mascaraFuncion = quitarMascaraPrecio;
    argumentos.pattern = false;

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
      argumentos.patternMensaje,
    ); // patternMensaje

    this.mensajesValidacionMaximo.configuracionFormBuilder = {
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
      this.mensajesValidacionMaximo.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderPorcentajeIndividual() {
    // empiezaArgumentosPorcentajeIndividual - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'porcentajeIndividual',
      nombreAPresentarse: 'Porcentaje individual',
      ejemplo: 'EJ: 5',
      tooltip: 'Ingrese el porcentaje individual de la escala vendedor',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en el porcentaje individual',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'PORCENTAJE_MASK_DECIMALES',
      mascaraCurrency: 'false',
      mascaraFuncion: 'quitarMascaraPorcentaje',
      pattern: 'false',
    };
    // terminaArgumentosPorcentajeIndividual - NO BORRAR ESTA LINEA

    argumentos.mascara = PORCENTAJE_MASK_DECIMALES;
    argumentos.mascaraFuncion = quitarMascaraPorcentaje;
    argumentos.pattern = false;

    this.mensajesValidacionPorcentajeIndividual = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionPorcentajeIndividual.configuracionFormBuilder = {
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
    // tslint:disable-next-line: max-line-length
    this.configuracionFormBuilder = encerarConfiguracionFormBuilder(
      this.mensajesValidacionPorcentajeIndividual.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderPorcentajeMultiple() {
    // empiezaArgumentosPorcentajeMultiple - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'porcentajeMultiple',
      nombreAPresentarse: 'Porcentaje múltiple',
      ejemplo: 'EJ: 10',
      tooltip: 'Ingrese el porcentaje múltiple de la escala vendedor',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en el porcentaje múltiple',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'PORCENTAJE_MASK_DECIMALES',
      mascaraCurrency: 'false',
      mascaraFuncion: 'quitarMascaraPorcentaje',
      pattern: 'false',
    };
    // terminaArgumentosPorcentajeMultiple - NO BORRAR ESTA LINEA

    argumentos.mascara = PORCENTAJE_MASK_DECIMALES;
    argumentos.mascaraFuncion = quitarMascaraPorcentaje;
    argumentos.pattern = false;

    this.mensajesValidacionPorcentajeMultiple = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionPorcentajeMultiple.configuracionFormBuilder = {
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
      this.mensajesValidacionPorcentajeMultiple.configuracionFormBuilder,
    );
  }

  // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionEscalaVendedor
  extends ObjetoMensajeValidacionInterfaz {
  configuracionFormBuilder?: ConfiguracionFormBuilder;
}
