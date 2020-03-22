import { FormGroup } from '@angular/forms';
/* tslint:disable:quotemark*/
import {
  ConfiguracionFormBuilder,
  ObjetoMensajeValidacionInterfaz,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes,
} from '@manticore-labs/ng-api';

export class RutaVendedorFormulario {
  formGroup: FormGroup;
  mensajesValidacionLugar: MensajesValidacionRutaVendedor;
  mensajesValidacionNombre: MensajesValidacionRutaVendedor;
  mensajesValidacionBodega: MensajesValidacionRutaVendedor;
  // contenidoPropiedad - NO BORRAR ESTA LINEA
  configuracionFormBuilder: ConfiguracionFormBuilder;

  // prettier-ignore
  constructor(
        public lugar: string,
        public nombre: string,
        public bodega: string,
        public id?: number,
        // contenidoConstructor - NO BORRAR ESTA LINEA
    ) {
        this.encerarConfiguracionFormBuilderLugar();

this.encerarConfiguracionFormBuilderNombre();

this.encerarConfiguracionFormBuilderBodega();

// contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
    }

  private encerarConfiguracionFormBuilderLugar() {
    // empiezaArgumentosLugar - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'lugar',
      nombreAPresentarse: 'Lugar *',
      ejemplo: 'EJ: Lugar',
      tooltip: 'Ingrese el Lugar',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en el lugar',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'autocomplete',
        autocompleteBusqueda: 'Lugar,nombre',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
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
      argumentos.patternMensaje,
    ); // patternMensaje

    this.mensajesValidacionLugar.configuracionFormBuilder = {
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
      this.mensajesValidacionLugar.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderNombre() {
    // empiezaArgumentosNombre - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'nombre',
      nombreAPresentarse: 'Zona *',
      ejemplo: 'EJ: Nombre',
      tooltip: 'Ingrese el nombre de la zona',
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

  private encerarConfiguracionFormBuilderBodega() {
    // empiezaArgumentosBodega - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'bodega',
      nombreAPresentarse: 'Bodega *',
      ejemplo: 'EJ: Bodega',
      tooltip: 'Ingrese la bodega',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en la bodega',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'autocomplete',
        autocompleteBusqueda: 'Bodega,nombre',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
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
      argumentos.patternMensaje,
    ); // patternMensaje

    this.mensajesValidacionBodega.configuracionFormBuilder = {
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
      this.mensajesValidacionBodega.configuracionFormBuilder,
    );
  }

  // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionRutaVendedor
  extends ObjetoMensajeValidacionInterfaz {
  configuracionFormBuilder?: ConfiguracionFormBuilder;
}
