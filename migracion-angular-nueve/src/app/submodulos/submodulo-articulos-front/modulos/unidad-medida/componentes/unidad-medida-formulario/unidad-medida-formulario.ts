import { FormGroup } from '@angular/forms';
/* tslint:disable:quotemark*/
// tslint:disable-next-line: max-line-length
import {
  ConfiguracionFormBuilder,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes,
  ObjetoMensajeValidacionInterfaz,
} from '@manticore-labs/ng-api';
// tslint:disable-next-line: max-line-length
import { SOLO_LETRAS_ESPACIOS_TILDES_ENIES } from '@manticore-labs/ng-api/build/main/lib/mascaras/patrones/solo-letras-espacios-tildes-enie';
import { MENSAJE_SOLO_LETRAS } from '../../../../../../constantes/mensajes-patrones';
import { SOLO_LETRAS } from './../../../../../../constantes/patrones';

export class UnidadMedidaFormulario {
  formGroup: FormGroup;
  mensajesValidacionNombre: MensajesValidacionUnidadMedida;
  mensajesValidacionAbreviacion: MensajesValidacionUnidadMedida;
  // contenidoPropiedad - NO BORRAR ESTA LINEA
  configuracionFormBuilder: ConfiguracionFormBuilder;

  // prettier-ignore
  constructor(
        public nombre: string,
        public abreviacion: string,
        // contenidoConstructor - NO BORRAR ESTA LINEA
    ) {
        this.encerarConfiguracionFormBuilderNombre();

this.encerarConfiguracionFormBuilderAbreviacion();

// contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
    }

  private encerarConfiguracionFormBuilderNombre() {
    // empiezaArgumentosNombre - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'nombre',
      nombreAPresentarse: 'Nombre *',
      ejemplo: 'EJ: Gramos',
      tooltip: 'Ingrese el nombre de la unidad de medida',
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
    argumentos.pattern = SOLO_LETRAS_ESPACIOS_TILDES_ENIES;

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

  private encerarConfiguracionFormBuilderAbreviacion() {
    // empiezaArgumentosAbreviacion - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'abreviacion',
      nombreAPresentarse: 'Abreviación *',
      ejemplo: 'EJ: gr',
      tooltip: 'Ingrese la abreviación de la unidad de medida',
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
    // terminaArgumentosAbreviacion - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = SOLO_LETRAS;

    this.mensajesValidacionAbreviacion = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionAbreviacion.configuracionFormBuilder = {
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
      this.mensajesValidacionAbreviacion.configuracionFormBuilder,
    );
  }

  // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionUnidadMedida
  extends ObjetoMensajeValidacionInterfaz {
  configuracionFormBuilder?: ConfiguracionFormBuilder;
}
