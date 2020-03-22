import { FormGroup } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {
  ConfiguracionFormBuilder,
  ObjetoMensajeValidacionInterfaz,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes,
} from '@manticore-labs/ng-api';
import {
  NO_ESPACIOS_BN_BLANCO,
  SOLO_LETRAS_NUMEROS,
} from '../../../../../../../constantes/patrones';
import {
  MENSAJE_NO_ESPACIOS_BLANCO,
  MENSAJE_SOLO_NUMEROS_LETRAS,
} from '../../../../../../../constantes/mensajes-patrones';

export class DireccionFormulario {
  formGroup: FormGroup;
  mensajesValidacionNumeroCalle: MensajesValidacionDireccion;
  mensajesValidacionCallePrincipal: MensajesValidacionDireccion;
  mensajesValidacionCalleSecundaria: MensajesValidacionDireccion;
  mensajesValidacionNombreEdificio: MensajesValidacionDireccion;
  mensajesValidacionPiso: MensajesValidacionDireccion;
  mensajesValidacionLugar: MensajesValidacionDireccion;
  mensajesValidacionReferencia: MensajesValidacionDireccion;
  // contenidoPropiedad - NO BORRAR ESTA LINEA
  configuracionFormBuilder: ConfiguracionFormBuilder;

  constructor(
    public numeroCalle: string,
    public callePrincipal: string,
    public calleSecundaria: string,
    public nombreEdificio: string,
    public piso: string,
    public lugar: string,
    public referencia: string,
    public id?: number,
    // contenidoConstructor - NO BORRAR ESTA LINEA
  ) {
    this.encerarConfiguracionFormBuilderNumeroCalle();
    this.encerarConfiguracionFormBuilderCallePrincipal();
    this.encerarConfiguracionFormBuilderCalleSecundaria();
    this.encerarConfiguracionFormBuilderNombreEdificio();
    this.encerarConfiguracionFormBuilderPiso();
    this.encerarConfiguracionFormBuilderLugar();
    this.encerarConfiguracionFormBuilderReferencia();
    // contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
  }

  private encerarConfiguracionFormBuilderNumeroCalle() {
    // empiezaArgumentosNumeroCalle - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'numeroCalle',
      nombreAPresentarse: 'N° calle',
      ejemplo: 'EJ: N12-96',
      tooltip: 'Ingrese el número de la calle',
      minLength: 1,
      maxLength: 10,
      min: false,
      max: false,
      patternMensaje: MENSAJE_NO_ESPACIOS_BLANCO,
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosNumeroCalle - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = NO_ESPACIOS_BN_BLANCO;

    this.mensajesValidacionNumeroCalle = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionNumeroCalle.configuracionFormBuilder = {
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
      this.mensajesValidacionNumeroCalle.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderCallePrincipal() {
    // empiezaArgumentosCallePrincipal - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'callePrincipal',
      nombreAPresentarse: 'Calle principal',
      ejemplo: 'EJ: Av. 6 de Diciembre ',
      tooltip: 'Ingrese la calle principal',
      minLength: 1,
      maxLength: 100,
      min: false,
      max: false,
      patternMensaje: 'Error en la calle principal',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosCallePrincipal - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionCallePrincipal = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionCallePrincipal.configuracionFormBuilder = {
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
      this.mensajesValidacionCallePrincipal.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderCalleSecundaria() {
    // empiezaArgumentosCalleSecundaria - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'calleSecundaria',
      nombreAPresentarse: 'Calle secundaria',
      ejemplo: 'EJ: Av. 6 de Diciembre ',
      tooltip: 'Ingrese la calle secundaria',
      minLength: 1,
      maxLength: 100,
      min: false,
      max: false,
      patternMensaje: 'Error en la calle secundaria',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosCalleSecundaria - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionCalleSecundaria = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionCalleSecundaria.configuracionFormBuilder = {
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
      this.mensajesValidacionCalleSecundaria.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderNombreEdificio() {
    // empiezaArgumentosNombreEdificio - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'nombreEdificio',
      nombreAPresentarse: 'Nombre edificio',
      ejemplo: 'EJ: Edificio Quito ',
      tooltip: 'Ingrese el nombre del edificio',
      minLength: 1,
      maxLength: 50,
      min: false,
      max: false,
      patternMensaje: 'Error en el nombre del edificio',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosNombreEdificio - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionNombreEdificio = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionNombreEdificio.configuracionFormBuilder = {
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
      this.mensajesValidacionNombreEdificio.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderPiso() {
    // empiezaArgumentosPiso - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'piso',
      nombreAPresentarse: 'Piso',
      ejemplo: 'EJ: P1',
      tooltip: 'Ingrese el piso',
      minLength: 1,
      maxLength: 3,
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
    // terminaArgumentosPiso - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = SOLO_LETRAS_NUMEROS;

    this.mensajesValidacionPiso = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionPiso.configuracionFormBuilder = {
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
      this.mensajesValidacionPiso.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderLugar() {

    // empiezaArgumentosLugar - NO BORRAR ESTA LINEA
    const argumentos: any = {
      'required': true,
      'email': false,
      'nombre': 'lugar',
      'nombreAPresentarse': 'Lugar',
      'ejemplo': 'EJ: Lugar',
      'tooltip': 'Ingrese el lugar',
      'minLength': false,
      'maxLength': false,
      'min': false,
      'max': false,
      'patternMensaje': 'Error en el lugar',
      'tipoControl': {
        'tipoCampoHtml': 'text',
        'tipo': 'autocomplete',
        'autocompleteBusqueda': 'Lugar,nombre'
      },
      'mascara': 'false',
      'mascaraCurrency': 'false',
      'mascaraFuncion': 'false',
      'pattern': 'false'
    };
    // terminaArgumentosLugar - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionLugar = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionLugar.configuracionFormBuilder = {
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

    this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionLugar.configuracionFormBuilder);
  }

  private encerarConfiguracionFormBuilderReferencia() {
    // empiezaArgumentosReferencia - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'referencia',
      nombreAPresentarse: 'Referencia',
      ejemplo: 'EJ: Al frente de un parque',
      tooltip: 'Ingrese la referencia',
      minLength: 3,
      maxLength: 60,
      min: false,
      max: false,
      patternMensaje: 'Error en la referencia',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosReferencia - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionReferencia = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionReferencia.configuracionFormBuilder = {
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
      this.mensajesValidacionReferencia.configuracionFormBuilder,
    );
  }

  // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionDireccion extends ObjetoMensajeValidacionInterfaz {
  configuracionFormBuilder?: ConfiguracionFormBuilder;
}
