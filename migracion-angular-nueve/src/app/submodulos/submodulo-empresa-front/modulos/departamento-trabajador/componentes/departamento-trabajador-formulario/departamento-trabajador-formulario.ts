import { FormGroup } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {
  ConfiguracionFormBuilder,
  ObjetoMensajeValidacionInterfaz,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes,
} from '@manticore-labs/ng-api';

export class DepartamentoTrabajadorFormulario {
  formGroup: FormGroup;
  mensajesValidacionContactoEmpresa: MensajesValidacionDepartamentoTrabajador;
  mensajesValidacionNombres: MensajesValidacionDepartamentoTrabajador;
  mensajesValidacionApellidos: MensajesValidacionDepartamentoTrabajador;
  mensajesValidacionTipoCargo: MensajesValidacionDepartamentoTrabajador;
  mensajesValidacionDescripcion: MensajesValidacionDepartamentoTrabajador;
  // contenidoPropiedad - NO BORRAR ESTA LINEA
  configuracionFormBuilder: ConfiguracionFormBuilder;

  constructor(
    public contactoEmpresa: string,
    public nombres: string,
    public apellidos: string,
    public tipoCargo: string,
    public descripcion: string,
    public id?: number, // contenidoConstructor - NO BORRAR ESTA LINEA
  ) {
    this.encerarConfiguracionFormBuilderContactoEmpresa();
    this.encerarConfiguracionFormBuilderNombres();
    this.encerarConfiguracionFormBuilderApellidos();
    this.encerarConfiguracionFormBuilderTipoCargo();
    this.encerarConfiguracionFormBuilderDescripcion();
    // contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
  }

  private encerarConfiguracionFormBuilderContactoEmpresa() {
    // empiezaArgumentosContactoEmpresa - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'contactoEmpresa',
      nombreAPresentarse: 'Contacto',
      ejemplo: 'EJ: 1716895227',
      tooltip: 'Seleccione un contacto de la empresa',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en contacto empresa',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'autocomplete',
        autocompleteBusqueda: 'ContactoEmpresa,datosUsuario.identificacionPais',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosContactoEmpresa - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionContactoEmpresa = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionContactoEmpresa.configuracionFormBuilder = {
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
      this.mensajesValidacionContactoEmpresa.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderNombres() {
    // empiezaArgumentosNombres - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'nombres',
      nombreAPresentarse: 'Nombres',
      ejemplo: 'EJ: Andrés David',
      tooltip: 'Nombres del contacto seleccionado',
      minLength: 4,
      maxLength: 50,
      min: false,
      max: false,
      patternMensaje: 'Error en nombres del contacto seleccionado',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosNombres - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionNombres = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionNombres.configuracionFormBuilder = {
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
      this.mensajesValidacionNombres.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderApellidos() {
    // empiezaArgumentosApellidos - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'apellidos',
      nombreAPresentarse: 'Apellidos',
      ejemplo: 'EJ: Olmedo López',
      tooltip: 'Apellidos del contacto seleccionado',
      minLength: 4,
      maxLength: 50,
      min: false,
      max: false,
      patternMensaje: 'Error en apellidos del contacto seleccionado',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosApellidos - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionApellidos = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionApellidos.configuracionFormBuilder = {
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
      this.mensajesValidacionApellidos.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderTipoCargo() {
    // empiezaArgumentosTipoCargo - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'tipoCargo',
      nombreAPresentarse: 'Tipo de cargo',
      ejemplo: 'EJ: vendedor',
      tooltip: 'Seleccione un tipo de cargo',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en el tipo cargo',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'autocomplete',
        autocompleteBusqueda: 'TipoCargo,nombre',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosTipoCargo - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionTipoCargo = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionTipoCargo.configuracionFormBuilder = {
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
      this.mensajesValidacionTipoCargo.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderDescripcion() {
    // empiezaArgumentosDescripcion - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'descripcion',
      nombreAPresentarse: 'Descripción',
      ejemplo: 'EJ: trabajador a medio tiempo',
      tooltip: 'Ingrese una descripción del trabajador',
      minLength: 3,
      maxLength: 100,
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

interface MensajesValidacionDepartamentoTrabajador
  extends ObjetoMensajeValidacionInterfaz {
  configuracionFormBuilder?: ConfiguracionFormBuilder;
}
