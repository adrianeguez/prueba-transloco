import { FormGroup } from '@angular/forms';
/* tslint:disable:quotemark*/
import {
  ConfiguracionFormBuilder,
  ObjetoMensajeValidacionInterfaz,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes,
} from '@manticore-labs/ng-api';
// tslint:disable-next-line:max-line-length
import { SOLO_LETRAS_ESPACIOS_TILDES_ENIES } from '@manticore-labs/ng-api/build/main/lib/mascaras/patrones/solo-letras-espacios-tildes-enie';

export class RolFormulario {
  formGroup: FormGroup;
  mensajesValidacionNombre: MensajesValidacionRol;
  // contenidoPropiedad - NO BORRAR ESTA LINEA
  configuracionFormBuilder: ConfiguracionFormBuilder;

  // prettier-ignore
  constructor(
        public nombre: string,
        // contenidoConstructor - NO BORRAR ESTA LINEA
    ) {
        this.encerarConfiguracionFormBuilderNombre();

// contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
    }

  private encerarConfiguracionFormBuilderNombre() {
    // empiezaArgumentosNombre - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'nombre',
      nombreAPresentarse: 'Nombre',
      ejemplo: 'EJ: Admin',
      tooltip: 'Ingrese nombre del rol',
      minLength: 4,
      maxLength: 30,
      min: false,
      max: false,
      patternMensaje: 'Solo se aceptan letras.',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'SOLO_LETRAS_ESPACIOS_TILDES_ENIES',
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

  // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionRol extends ObjetoMensajeValidacionInterfaz {
  configuracionFormBuilder?: ConfiguracionFormBuilder;
}
