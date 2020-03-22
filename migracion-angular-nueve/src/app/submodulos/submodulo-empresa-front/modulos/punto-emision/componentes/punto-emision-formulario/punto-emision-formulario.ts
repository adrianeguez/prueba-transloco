import { FormGroup } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {
  ConfiguracionFormBuilder,
  ObjetoMensajeValidacionInterfaz,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes,
  SOLO_NUMEROS,
} from '@manticore-labs/ng-api';
import { SOLO_LETRAS_NUMEROS } from '../../../../../../constantes/patrones';
import {
  MENSAJE_SOLO_NUMEROS,
  MENSAJE_SOLO_NUMEROS_LETRAS,
} from '../../../../../../constantes/mensajes-patrones';

export class PuntoEmisionFormulario {
  formGroup: FormGroup;
  mensajesValidacionNombre: MensajesValidacionPuntoEmision;
  mensajesValidacionCodigo: MensajesValidacionPuntoEmision;
  mensajesValidacionSecuencialActual: MensajesValidacionPuntoEmision;
  mensajesValidacionEnUso: MensajesValidacionPuntoEmision;
  mensajesValidacionBodega: MensajesValidacionPuntoEmision;
  // contenidoPropiedad - NO BORRAR ESTA LINEA
  configuracionFormBuilder: ConfiguracionFormBuilder;

  constructor(
    public nombre: string,
    public codigo: string,
    public secuencialActual: string,
    public enUso: string, // contenidoConstructor - NO BORRAR ESTA LINEA
    public bodega: string,
    public id?: number,
  ) {
    this.encerarConfiguracionFormBuilderNombre();
    this.encerarConfiguracionFormBuilderCodigo();
    this.encerarConfiguracionFormBuilderSecuencialActual();
    this.encerarConfiguracionFormBuilderEnUso();
    this.encerarConfiguracionFormBuilderBodega();

    // contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
  }

  private encerarConfiguracionFormBuilderNombre() {
    // empiezaArgumentosNombre - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'nombre',
      nombreAPresentarse: 'Nombre',
      ejemplo: 'EJ:  punto de emisión 1 Manticore',
      tooltip: 'Ingrese el nombre del punto de emisión',
      minLength: 1,
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

  private encerarConfiguracionFormBuilderCodigo() {
    // empiezaArgumentosCodigo - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'codigo',
      nombreAPresentarse: 'Código',
      ejemplo: 'EJ: PE0001',
      tooltip: 'Ingrese el código del punto de emisión',
      minLength: 1,
      maxLength: 30,
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

  private encerarConfiguracionFormBuilderSecuencialActual() {
    // empiezaArgumentosSecuencialActual - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'secuencialActual',
      nombreAPresentarse: 'Secuencial actual',
      ejemplo: 'EJ: 123456789',
      tooltip: 'Ingrese el secuencial actual del punto de emisión',
      minLength: 1,
      maxLength: 30,
      min: false,
      max: false,
      patternMensaje: MENSAJE_SOLO_NUMEROS,
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosSecuencialActual - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = SOLO_NUMEROS;

    this.mensajesValidacionSecuencialActual = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionSecuencialActual.configuracionFormBuilder = {
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
      this.mensajesValidacionSecuencialActual.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderEnUso() {
    // empiezaArgumentosEnUso - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'enUso',
      nombreAPresentarse: 'En uso',
      ejemplo: 'EJ: En Uso',
      tooltip: 'Indique si está en uso',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en en uso',
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
    // terminaArgumentosEnUso - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionEnUso = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionEnUso.configuracionFormBuilder = {
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
      this.mensajesValidacionEnUso.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderBodega() {

    // empiezaArgumentosBodega - NO BORRAR ESTA LINEA
    const argumentos: any = {
      'required': true,
      'email': false,
      'nombre': 'bodega',
      'nombreAPresentarse': 'Bodega',
      'ejemplo': 'EJ: Bodega',
      'tooltip': 'Seleccione la bodega',
      'minLength': false,
      'maxLength': false,
      'min': false,
      'max': false,
      'patternMensaje': 'Error en la bodega',
      'tipoControl': {
        'tipoCampoHtml': 'text',
        'tipo': 'autocomplete',
        'autocompleteBusqueda': 'Bodega,nombre'
      },
      'mascara': 'false',
      'mascaraCurrency': 'false',
      'mascaraFuncion': 'false',
      'pattern': 'false'
    };
    // terminaArgumentosBodega - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionBodega = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionBodega.configuracionFormBuilder = {
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

    this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionBodega.configuracionFormBuilder);
  }

  // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionPuntoEmision
  extends ObjetoMensajeValidacionInterfaz {
  configuracionFormBuilder?: ConfiguracionFormBuilder;
}
