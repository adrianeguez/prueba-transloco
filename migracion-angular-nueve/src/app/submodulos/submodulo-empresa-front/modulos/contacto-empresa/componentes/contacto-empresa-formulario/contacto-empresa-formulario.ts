import { FormGroup } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {
  ConfiguracionFormBuilder,
  ObjetoMensajeValidacionInterfaz,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes,
} from '@manticore-labs/ng-api';

export class ContactoEmpresaFormulario {
  formGroup: FormGroup;
  mensajesValidacionDatosUsuario: MensajesValidacionContactoEmpresa;
  mensajesValidacionNombres: MensajesValidacionContactoEmpresa;
  mensajesValidacionApellidos: MensajesValidacionContactoEmpresa;
  mensajesValidacionTipoCargo: MensajesValidacionContactoEmpresa;
  mensajesValidacionObservacion: MensajesValidacionContactoEmpresa;
  mensajesValidacionEsOperario: MensajesValidacionContactoEmpresa;
  mensajesValidacionEsAdminPtoEmi: MensajesValidacionContactoEmpresa;
  // contenidoPropiedad - NO BORRAR ESTA LINEA
  configuracionFormBuilder: ConfiguracionFormBuilder;

  constructor(
    public datosUsuario: string,
    public nombres: string,
    public apellidos: string,
    public tipoCargo: string,
    public observacion: string,
    public esOperario: string,
    public esAdminPtoEmi: string,
    public id?: number, // contenidoConstructor - NO BORRAR ESTA LINEA
  ) {
    this.encerarConfiguracionFormBuilderDatosUsuario();
    this.encerarConfiguracionFormBuilderNombres();
    this.encerarConfiguracionFormBuilderApellidos();
    this.encerarConfiguracionFormBuilderTipoCargo();
    this.encerarConfiguracionFormBuilderObservacion();
    this.encerarConfiguracionFormBuilderEsOperario();
    this.encerarConfiguracionFormBuilderEsAdminPtoEmi();
    // contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
  }

  private encerarConfiguracionFormBuilderDatosUsuario() {
    // empiezaArgumentosDatosUsuario - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'datosUsuario',
      nombreAPresentarse: 'Usuario',
      ejemplo: 'Busque un usuario por cédula o apellidos',
      tooltip: 'Seleccione un usuario',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en los datos de usuario',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'autocomplete',
        autocompleteBusqueda: 'DatosUsuario,identificacionPais',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosDatosUsuario - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionDatosUsuario = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionDatosUsuario.configuracionFormBuilder = {
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
      this.mensajesValidacionDatosUsuario.configuracionFormBuilder,
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
      tooltip: 'Nombres del usuario seleccionado',
      minLength: 4,
      maxLength: 50,
      min: false,
      max: false,
      patternMensaje: 'Error en nombres del usuario seleccionado',
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
      tooltip: 'Apellidos del usuario seleccionado',
      minLength: 4,
      maxLength: 50,
      min: false,
      max: false,
      patternMensaje: 'Error en apellidos del usuario seleccionado',
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
      patternMensaje: 'Error en tipo de cargo',
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

  private encerarConfiguracionFormBuilderObservacion() {
    // empiezaArgumentosObservacion - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'observacion',
      nombreAPresentarse: 'Observación',
      ejemplo: 'EJ: tiempo completo',
      tooltip: 'Ingrese una observación del contacto',
      minLength: 4,
      maxLength: 100,
      min: false,
      max: false,
      patternMensaje: 'Error en observación',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosObservacion - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionObservacion = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionObservacion.configuracionFormBuilder = {
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
      this.mensajesValidacionObservacion.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderEsOperario() {
    // empiezaArgumentosEsOperario - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'esOperario',
      nombreAPresentarse: 'Es operario',
      ejemplo: 'EJ: Es Operario',
      tooltip: 'Seleccione si es Operario',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en es operario',
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
    // terminaArgumentosEsOperario - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionEsOperario = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionEsOperario.configuracionFormBuilder = {
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
      this.mensajesValidacionEsOperario.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderEsAdminPtoEmi() {

    // empiezaArgumentosEsAdminPtoEmi - NO BORRAR ESTA LINEA
    const argumentos: any = {
      'required': true,
      'email': false,
      'nombre': 'esAdminPtoEmi',
      'nombreAPresentarse': 'Es administrador',
      'ejemplo': 'EJ: Es Admin Pto Emi',
      'tooltip': 'Indique si es administrador',
      'minLength': false,
      'maxLength': false,
      'min': false,
      'max': false,
      'patternMensaje': 'Error en es administrador de punto de emisión',
      'tipoControl': {
        'tipoCampoHtml': 'text',
        'tipo': 'select-many',
        'opcionesSelect': 'Si,No'
      },
      'mascara': 'false',
      'mascaraCurrency': 'false',
      'mascaraFuncion': 'false',
      'pattern': 'false'
    };
    // terminaArgumentosEsAdminPtoEmi - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionEsAdminPtoEmi = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionEsAdminPtoEmi.configuracionFormBuilder = {
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

    this.configuracionFormBuilder = encerarConfiguracionFormBuilder(this.mensajesValidacionEsAdminPtoEmi.configuracionFormBuilder);
  }
  // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionContactoEmpresa
  extends ObjetoMensajeValidacionInterfaz {
  configuracionFormBuilder?: ConfiguracionFormBuilder;
}
