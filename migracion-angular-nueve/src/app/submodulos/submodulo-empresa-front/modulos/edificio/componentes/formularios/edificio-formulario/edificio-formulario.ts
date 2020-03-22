import { FormGroup } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {
  ConfiguracionFormBuilder,
  ObjetoMensajeValidacionInterfaz,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes,
  SOLO_NUMEROS,
} from '@manticore-labs/ng-api';
// tslint:disable-next-line:max-line-length
import { SOLO_LETRAS_ESPACIOS_TILDES_ENIES } from '@manticore-labs/ng-api/build/module/lib/mascaras/patrones/solo-letras-espacios-tildes-enie';
import {
  MENSAJE_SOLO_LETRAS,
  MENSAJE_SOLO_NUMEROS,
} from '../../../../../../../constantes/mensajes-patrones';

export class EdificioFormulario {
  formGroup: FormGroup;
  mensajesValidacionNombre: MensajesValidacionEdificio;
  mensajesValidacionEsMatriz: MensajesValidacionEdificio;
  mensajesValidacionTelefono: MensajesValidacionEdificio;
  mensajesValidacionExtension: MensajesValidacionEdificio;
  mensajesValidacionWhatsapp: MensajesValidacionEdificio;
  mensajesValidacionNombreResponsable: MensajesValidacionEdificio;
  // contenidoPropiedad - NO BORRAR ESTA LINEA
  configuracionFormBuilder: ConfiguracionFormBuilder;

  constructor(
    public nombre: string,
    public esMatriz: string,
    public telefono: string,
    public extension: string,
    public whatsapp: string,
    public nombreResponsable: string, // contenidoConstructor - NO BORRAR ESTA LINEA
  ) {
    this.encerarConfiguracionFormBuilderNombre();
    this.encerarConfiguracionFormBuilderEsMatriz();
    this.encerarConfiguracionFormBuilderTelefono();
    this.encerarConfiguracionFormBuilderExtension();
    this.encerarConfiguracionFormBuilderWhatsapp();
    this.encerarConfiguracionFormBuilderNombreResponsable();
    // contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
  }

  private encerarConfiguracionFormBuilderNombre() {
    // empiezaArgumentosNombre - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'nombre',
      nombreAPresentarse: 'Nombre',
      ejemplo: 'EJ: Manticore',
      tooltip: 'Ingrese nombre de la empresa',
      minLength: 3,
      maxLength: 150,
      min: false,
      max: false,
      patternMensaje: 'Error en Nombre',
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

  private encerarConfiguracionFormBuilderEsMatriz() {
    // empiezaArgumentosEsMatriz - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'esMatriz',
      nombreAPresentarse: 'Es matriz',
      ejemplo: 'EJ: Es Matriz',
      tooltip: 'Seleccione si es matriz',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en Es Matriz',
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
    // terminaArgumentosEsMatriz - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionEsMatriz = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionEsMatriz.configuracionFormBuilder = {
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
      this.mensajesValidacionEsMatriz.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderTelefono() {
    // empiezaArgumentosTelefono - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'telefono',
      nombreAPresentarse: 'Teléfono',
      ejemplo: 'EJ: 22677427',
      tooltip: 'Ingrese el teléfono del edificio',
      minLength: 7,
      maxLength: 9,
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
      argumentos.patternMensaje,
    ); // patternMensaje

    this.mensajesValidacionTelefono.configuracionFormBuilder = {
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
      this.mensajesValidacionTelefono.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderExtension() {
    // empiezaArgumentosExtension - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'extension',
      nombreAPresentarse: 'Extensión',
      ejemplo: 'EJ: 22677427',
      tooltip: 'Ingrese la extensión del edificio',
      minLength: 3,
      maxLength: 5,
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
    // terminaArgumentosExtension - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = SOLO_NUMEROS;

    this.mensajesValidacionExtension = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionExtension.configuracionFormBuilder = {
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
      this.mensajesValidacionExtension.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderWhatsapp() {
    // empiezaArgumentosWhatsapp - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'whatsapp',
      nombreAPresentarse: 'Whatsapp',
      ejemplo: 'EJ: 593985810896',
      tooltip: 'Ingrese el whatsapp del edificio',
      minLength: 12,
      maxLength: 12,
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
    // terminaArgumentosWhatsapp - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = SOLO_NUMEROS;

    this.mensajesValidacionWhatsapp = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionWhatsapp.configuracionFormBuilder = {
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
      this.mensajesValidacionWhatsapp.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderNombreResponsable() {
    // empiezaArgumentosNombreResponsable - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'nombreResponsable',
      nombreAPresentarse: 'Nombre Responsable',
      ejemplo: 'EJ: Adrián Alvarado',
      tooltip: 'Ingrese el nombre del responsable del edificio',
      minLength: 3,
      maxLength: 70,
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
    // terminaArgumentosNombreResponsable - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = SOLO_LETRAS_ESPACIOS_TILDES_ENIES;

    this.mensajesValidacionNombreResponsable = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionNombreResponsable.configuracionFormBuilder = {
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
      this.mensajesValidacionNombreResponsable.configuracionFormBuilder,
    );
  }

  // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionEdificio extends ObjetoMensajeValidacionInterfaz {
  configuracionFormBuilder?: ConfiguracionFormBuilder;
}
