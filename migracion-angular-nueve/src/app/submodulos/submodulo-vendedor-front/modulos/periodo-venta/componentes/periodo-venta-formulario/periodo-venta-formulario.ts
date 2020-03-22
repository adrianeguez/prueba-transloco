import { FormGroup } from '@angular/forms';
import {
  ConfiguracionFormBuilder,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes,
  ObjetoMensajeValidacionInterfaz,
} from '@manticore-labs/ng-api';
import { MASK_NUMEROS_DECIMALES } from '../../../../constantes/mascara';
import { quitarMascaraNumero } from '../../../../funciones/mascara/quitar-mascara-numero';

export class PeriodoVentaFormulario {
  formGroup: FormGroup;
  mensajesValidacionNombre: MensajesValidacionPeriodoVenta;
  mensajesValidacionFechaInicio: MensajesValidacionPeriodoVenta;
  mensajesValidacionFechaFin: MensajesValidacionPeriodoVenta;
  mensajesValidacionMeta: MensajesValidacionPeriodoVenta;
  mensajesValidacionDescripcion: MensajesValidacionPeriodoVenta;
  // contenidoPropiedad - NO BORRAR ESTA LINEA
  configuracionFormBuilder: ConfiguracionFormBuilder;

  // prettier-ignore
  constructor(
        public nombre: string,
        public fechaInicio: string,
        public fechaFin: string,
        public meta: string,
        public descripcion: string,
        // contenidoConstructor - NO BORRAR ESTA LINEA
    ) {
        this.encerarConfiguracionFormBuilderNombre();

        this.encerarConfiguracionFormBuilderFechaInicio();

        this.encerarConfiguracionFormBuilderFechaFin();

        this.encerarConfiguracionFormBuilderMeta();

        this.encerarConfiguracionFormBuilderDescripcion();

        // contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
    }

  private encerarConfiguracionFormBuilderNombre() {
    // empiezaArgumentosNombre - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'nombre',
      nombreAPresentarse: 'Periodo *',
      ejemplo: 'EJ: octubre 2019',
      tooltip: 'Ingrese el nombre del periodo de venta',
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

  private encerarConfiguracionFormBuilderFechaInicio() {
    // empiezaArgumentosFechaInicio - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'fechaInicio',
      nombreAPresentarse: 'Fecha inicio *',
      ejemplo: 'EJ: 2018-03-03',
      tooltip: 'Ingrese la fecha de inicio del periodo',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en la fecha de inicio',
      tipoControl: {
        tipoCampoHtml: 'Date',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosFechaInicio - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionFechaInicio = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionFechaInicio.configuracionFormBuilder = {
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
      this.mensajesValidacionFechaInicio.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderFechaFin() {
    // empiezaArgumentosFechaFin - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'fechaFin',
      nombreAPresentarse: 'Fecha fin *',
      ejemplo: 'EJ: 2018-03-03',
      tooltip: 'Ingrese la fecha fin del periodo de venta',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en la fecha de fin',
      tipoControl: {
        tipoCampoHtml: 'Date',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosFechaFin - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionFechaFin = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionFechaFin.configuracionFormBuilder = {
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
      this.mensajesValidacionFechaFin.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderMeta() {
    // empiezaArgumentosMeta - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'meta',
      nombreAPresentarse: 'Meta',
      ejemplo: 'EJ: 1500',
      tooltip: 'Ingrese la meta del periodo de venta',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en la meta',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'MASK_NUMEROS_DECIMALES',
      mascaraCurrency: 'false',
      mascaraFuncion: 'quitarMascaraNumero',
      pattern: 'false',
    };
    // terminaArgumentosMeta - NO BORRAR ESTA LINEA

    argumentos.mascara = MASK_NUMEROS_DECIMALES;
    argumentos.mascaraFuncion = quitarMascaraNumero;
    argumentos.pattern = false;

    this.mensajesValidacionMeta = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionMeta.configuracionFormBuilder = {
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
      this.mensajesValidacionMeta.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderDescripcion() {
    // empiezaArgumentosDescripcion - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'descripcion',
      nombreAPresentarse: 'Descripción',
      ejemplo: 'EJ: Descripcion',
      tooltip: 'Ingrese la descripción del periodo de venta',
      minLength: 7,
      maxLength: 60,
      min: false,
      max: false,
      patternMensaje: 'Error en la descripción',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosDescripcion - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

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
      argumentos.patternMensaje,
    ); // patternMensaje

    this.mensajesValidacionDescripcion.configuracionFormBuilder = {
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
      this.mensajesValidacionDescripcion.configuracionFormBuilder,
    );
  }

  // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionPeriodoVenta
  extends ObjetoMensajeValidacionInterfaz {
  configuracionFormBuilder?: ConfiguracionFormBuilder;
}
