import { FormGroup } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {
  ConfiguracionFormBuilder,
  ObjetoMensajeValidacionInterfaz,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes,
  SOLO_NUMEROS,
} from '@manticore-labs/ng-api';
import {
  MENSAJE_RANGO_LATITUD,
  MENSAJE_RANGO_LONGITUD,
  MENSAJE_SOLO_NUMEROS,
} from '../../../../../../../constantes/mensajes-patrones';
import {
  RANGO_LATITUD_LOCALIZAIION,
  RANGO_LONGITUD_LOCALIZAIION,
} from '../../../../../../../constantes/patrones';
import {COORDENADAS_MASK} from '../../../constantes/mascara-coordenadas';

export class LocalizacionFormulario {
  formGroup: FormGroup;
  mensajesValidacionCoordenadaX: MensajesValidacionLocalizacion;
  mensajesValidacionCoordenadaY: MensajesValidacionLocalizacion;
  // contenidoPropiedad - NO BORRAR ESTA LINEA
  configuracionFormBuilder: ConfiguracionFormBuilder;

  constructor(
    public coordenadaX: string,
    public coordenadaY: string, // contenidoConstructor - NO BORRAR ESTA LINEA
  ) {
    this.encerarConfiguracionFormBuilderCoordenadaX();
    this.encerarConfiguracionFormBuilderCoordenadaY();
    // contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
  }

  private encerarConfiguracionFormBuilderCoordenadaX() {
    // empiezaArgumentosCoordenadaX - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'coordenadaX',
      nombreAPresentarse: 'Coordenada x',
      ejemplo: 'EJ: 2',
      tooltip: 'Ingrese coordenada x',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: MENSAJE_RANGO_LONGITUD,
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosCoordenadaX - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = RANGO_LONGITUD_LOCALIZAIION;

    this.mensajesValidacionCoordenadaX = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionCoordenadaX.configuracionFormBuilder = {
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
      this.mensajesValidacionCoordenadaX.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderCoordenadaY() {
    // empiezaArgumentosCoordenadaY - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'coordenadaY',
      nombreAPresentarse: 'Coordenada y',
      ejemplo: 'EJ: 1',
      tooltip: 'Ingrese coordenada y',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: MENSAJE_RANGO_LATITUD,
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosCoordenadaY - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = RANGO_LATITUD_LOCALIZAIION;

    this.mensajesValidacionCoordenadaY = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionCoordenadaY.configuracionFormBuilder = {
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
      this.mensajesValidacionCoordenadaY.configuracionFormBuilder,
    );
  }

  // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionLocalizacion
  extends ObjetoMensajeValidacionInterfaz {
  configuracionFormBuilder?: ConfiguracionFormBuilder;
}
