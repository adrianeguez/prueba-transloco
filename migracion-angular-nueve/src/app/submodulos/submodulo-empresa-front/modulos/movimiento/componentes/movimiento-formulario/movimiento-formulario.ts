import { FormGroup } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {
  ConfiguracionFormBuilder,
  ObjetoMensajeValidacionInterfaz,
  encerarConfiguracionFormBuilder,
  establecerMensajesDeValidacionComunes,
  SOLO_NUMEROS,
} from '@manticore-labs/ng-api';
import { MENSAJE_SOLO_NUMEROS } from 'src/app/constantes/mensajes-patrones';

export class MovimientoFormulario {
  formGroup: FormGroup;
  mensajesValidacionNombre: MensajesValidacionMovimiento;
  mensajesValidacionCodigo: MensajesValidacionMovimiento;
  mensajesValidacionDescripcion: MensajesValidacionMovimiento;
  mensajesValidacionNumero: MensajesValidacionMovimiento;
  mensajesValidacionNumeroInventario: MensajesValidacionMovimiento;
  mensajesValidacionNombreReferencia: MensajesValidacionMovimiento;
  mensajesValidacionFormaNumerar: MensajesValidacionMovimiento;
  mensajesValidacionFactorStock: MensajesValidacionMovimiento;
  mensajesValidacionAfectaCostoPromedio: MensajesValidacionMovimiento;
  mensajesValidacionAfectaCostoUltimo: MensajesValidacionMovimiento;
  mensajesValidacionAfectaCostoUltimaTransaccion: MensajesValidacionMovimiento;
  mensajesValidacionCobrarIVA: MensajesValidacionMovimiento;
  mensajesValidacionRetencionIVA: MensajesValidacionMovimiento;
  mensajesValidacionRetencionRenta: MensajesValidacionMovimiento;
  mensajesValidacionFormaValorarInventario: MensajesValidacionMovimiento;
  mensajesValidacionAfectaDatosUltimaCompra: MensajesValidacionMovimiento;
  mensajesValidacionAfectaDatosUltimaVenta: MensajesValidacionMovimiento;
  // contenidoPropiedad - NO BORRAR ESTA LINEA
  configuracionFormBuilder: ConfiguracionFormBuilder;

  constructor(
    public nombre: string,
    public codigo: string,
    public descripcion: string,
    public numero: string,
    public numeroInventario: string,
    public nombreReferencia: string,
    public formaNumerar: string,
    public factorStock: string,
    public afectaCostoPromedio: string,
    public afectaCostoUltimo: string,
    public afectaCostoUltimaTransaccion: string,
    public cobrarIVA: string,
    public retencionIVA: string,
    public retencionRenta: string,
    public formaValorarInventario: string,
    public afectaDatosUltimaCompra: string,
    public afectaDatosUltimaVenta: string, // contenidoConstructor - NO BORRAR ESTA LINEA
  ) {
    this.encerarConfiguracionFormBuilderNombre();
    this.encerarConfiguracionFormBuilderCodigo();
    this.encerarConfiguracionFormBuilderDescripcion();
    this.encerarConfiguracionFormBuilderNumero();
    this.encerarConfiguracionFormBuilderNumeroInventario();
    this.encerarConfiguracionFormBuilderNombreReferencia();
    this.encerarConfiguracionFormBuilderFormaNumerar();
    this.encerarConfiguracionFormBuilderFactorStock();
    this.encerarConfiguracionFormBuilderAfectaCostoPromedio();
    this.encerarConfiguracionFormBuilderAfectaCostoUltimo();
    this.encerarConfiguracionFormBuilderAfectaCostoUltimaTransaccion();
    this.encerarConfiguracionFormBuilderCobrarIVA();
    this.encerarConfiguracionFormBuilderRetencionIVA();
    this.encerarConfiguracionFormBuilderRetencionRenta();
    this.encerarConfiguracionFormBuilderFormaValorarInventario();
    this.encerarConfiguracionFormBuilderAfectaDatosUltimaCompra();
    this.encerarConfiguracionFormBuilderAfectaDatosUltimaVenta();
    // contenidoEjecucionConstructor - NO BORRAR ESTA LINEA
  }

  private encerarConfiguracionFormBuilderNombre() {
    // empiezaArgumentosNombre - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'nombre',
      nombreAPresentarse: 'Nombre',
      ejemplo: 'EJ: Egreso por ajuste',
      tooltip: 'Ingrese el nombre del movimiento',
      minLength: 1,
      maxLength: 30,
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
      ejemplo: 'EJ: 1',
      tooltip: 'Ingrese el código del movimiento',
      minLength: 1,
      maxLength: 3,
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
    // terminaArgumentosCodigo - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = SOLO_NUMEROS;

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

  private encerarConfiguracionFormBuilderDescripcion() {
    // empiezaArgumentosDescripcion - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'descripcion',
      nombreAPresentarse: 'descripción',
      ejemplo: 'EJ: egreso',
      tooltip: 'Ingrese la descripción del movimiento',
      minLength: 3,
      maxLength: 50,
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

  private encerarConfiguracionFormBuilderNumero() {
    // empiezaArgumentosNumero - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'numero',
      nombreAPresentarse: 'Numero',
      ejemplo: 'EJ: 1234',
      tooltip: 'Ingrese el número del movimiento',
      minLength: 1,
      maxLength: 4,
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
    // terminaArgumentosNumero - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = SOLO_NUMEROS;

    this.mensajesValidacionNumero = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionNumero.configuracionFormBuilder = {
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
      this.mensajesValidacionNumero.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderNumeroInventario() {
    // empiezaArgumentosNumeroInventario - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'numeroInventario',
      nombreAPresentarse: 'Numero de inventario',
      ejemplo: 'EJ: 1234',
      tooltip: 'Ingrese el número de inventario del movimiento',
      minLength: 1,
      maxLength: false,
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
    // terminaArgumentosNumeroInventario - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = SOLO_NUMEROS;

    this.mensajesValidacionNumeroInventario = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionNumeroInventario.configuracionFormBuilder = {
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
      this.mensajesValidacionNumeroInventario.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderNombreReferencia() {
    // empiezaArgumentosNombreReferencia - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'nombreReferencia',
      nombreAPresentarse: 'Nombre de referencia',
      ejemplo: 'EJ: egreso',
      tooltip: 'Ingrese el nombre de la referencia del movimiento',
      minLength: 1,
      maxLength: 30,
      min: false,
      max: false,
      patternMensaje: 'Error en el nombre de referencia',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'input-text',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosNombreReferencia - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionNombreReferencia = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionNombreReferencia.configuracionFormBuilder = {
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
      this.mensajesValidacionNombreReferencia.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderFormaNumerar() {
    // empiezaArgumentosFormaNumerar - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'formaNumerar',
      nombreAPresentarse: 'Forma de numerar',
      ejemplo: 'EJ: Forma Numerar',
      tooltip: 'Elija la forma de numerar el movimiento',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en la forma numerar',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'select-many',
        opcionesSelect: 'automático,manual',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosFormaNumerar - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionFormaNumerar = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionFormaNumerar.configuracionFormBuilder = {
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
      this.mensajesValidacionFormaNumerar.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderFactorStock() {
    // empiezaArgumentosFactorStock - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'factorStock',
      nombreAPresentarse: 'Factor de stock',
      ejemplo: 'EJ: Factor Stock',
      tooltip: 'Elija el factor de stock para el movimiento',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en el factor stock',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'select-many',
        opcionesSelect: '1,0, -1',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosFactorStock - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionFactorStock = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionFactorStock.configuracionFormBuilder = {
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
      this.mensajesValidacionFactorStock.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderAfectaCostoPromedio() {
    // empiezaArgumentosAfectaCostoPromedio - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'afectaCostoPromedio',
      nombreAPresentarse: 'Afecta al costo promedio',
      ejemplo: 'EJ: Afecta Costo Promedio',
      tooltip: 'Indique si el movimiento afecta al costo promedio',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en afecta al costo promedio',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'select-many',
        opcionesSelect: 'si, no',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosAfectaCostoPromedio - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionAfectaCostoPromedio = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionAfectaCostoPromedio.configuracionFormBuilder = {
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

    // tslint:disable-next-line:max-line-length
    this.configuracionFormBuilder = encerarConfiguracionFormBuilder(
      this.mensajesValidacionAfectaCostoPromedio.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderAfectaCostoUltimo() {
    // empiezaArgumentosAfectaCostoUltimo - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'afectaCostoUltimo',
      nombreAPresentarse: 'Afecta al costo último',
      ejemplo: 'EJ: Afecta Costo Ultimo',
      tooltip: 'Indique si el movimiento afecta al costo último',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en afecta al costo último',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'select-many',
        opcionesSelect: 'si, no',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosAfectaCostoUltimo - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionAfectaCostoUltimo = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionAfectaCostoUltimo.configuracionFormBuilder = {
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
      this.mensajesValidacionAfectaCostoUltimo.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderAfectaCostoUltimaTransaccion() {
    // empiezaArgumentosAfectaCostoUltimaTransaccion - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: false,
      email: false,
      nombre: 'afectaCostoUltimaTransaccion',
      nombreAPresentarse: 'Afecta al costo última transacción',
      ejemplo: 'EJ: Afecta Costo Ultima Transaccion',
      tooltip: 'Indique si el movimiento afecta al costo última transacción',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en afecta al costo última transacción',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'select-many',
        opcionesSelect: 'si, no',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosAfectaCostoUltimaTransaccion - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionAfectaCostoUltimaTransaccion = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionAfectaCostoUltimaTransaccion.configuracionFormBuilder = {
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

    // tslint:disable-next-line:max-line-length
    this.configuracionFormBuilder = encerarConfiguracionFormBuilder(
      this.mensajesValidacionAfectaCostoUltimaTransaccion
        .configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderCobrarIVA() {
    // empiezaArgumentosCobrarIVA - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'cobrarIVA',
      nombreAPresentarse: 'Cobrar IVA',
      ejemplo: 'EJ: Cobrar I V A',
      tooltip: 'Indique si el movimiento cobra IVA',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en cobrar IVA',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'select-many',
        opcionesSelect: 'si, no',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosCobrarIVA - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionCobrarIVA = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionCobrarIVA.configuracionFormBuilder = {
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
      this.mensajesValidacionCobrarIVA.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderRetencionIVA() {
    // empiezaArgumentosRetencionIVA - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'retencionIVA',
      nombreAPresentarse: 'Retención IVA',
      ejemplo: 'EJ: Retencion I V A',
      tooltip: 'Indique si el movimiento tiene retención de IVA',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en retención IVA',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'select-many',
        opcionesSelect: 'si, no',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosRetencionIVA - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionRetencionIVA = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionRetencionIVA.configuracionFormBuilder = {
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
      this.mensajesValidacionRetencionIVA.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderRetencionRenta() {
    // empiezaArgumentosRetencionRenta - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'retencionRenta',
      nombreAPresentarse: 'Retención renta',
      ejemplo: 'EJ: Retencion Renta',
      tooltip: 'Indique si el movimiento tiene retención de venta',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en retención de venta',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'select-many',
        opcionesSelect: 'si, no',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosRetencionRenta - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionRetencionRenta = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionRetencionRenta.configuracionFormBuilder = {
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
      this.mensajesValidacionRetencionRenta.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderFormaValorarInventario() {
    // empiezaArgumentosFormaValorarInventario - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'formaValorarInventario',
      nombreAPresentarse: 'Forma de valorar inventario',
      ejemplo: 'EJ: Forma Valorar Inventario',
      tooltip: 'Elija la forma de valorar el inventario',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en forma de valorar el inventario',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'select-many',
        opcionesSelect: '1,0, -1',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosFormaValorarInventario - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionFormaValorarInventario = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionFormaValorarInventario.configuracionFormBuilder = {
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

    // tslint:disable-next-line:max-line-length
    this.configuracionFormBuilder = encerarConfiguracionFormBuilder(
      this.mensajesValidacionFormaValorarInventario.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderAfectaDatosUltimaCompra() {
    // empiezaArgumentosAfectaDatosUltimaCompra - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'afectaDatosUltimaCompra',
      nombreAPresentarse: 'Afecta datos de última compra',
      ejemplo: 'EJ: Afecta Datos Ultima Compra',
      tooltip: 'Indique si el movimiento afecta los datos de última compra',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en afecta los datos de última compra',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'select-many',
        opcionesSelect: 'si, no',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosAfectaDatosUltimaCompra - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionAfectaDatosUltimaCompra = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionAfectaDatosUltimaCompra.configuracionFormBuilder = {
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

    // tslint:disable-next-line:max-line-length
    this.configuracionFormBuilder = encerarConfiguracionFormBuilder(
      this.mensajesValidacionAfectaDatosUltimaCompra.configuracionFormBuilder,
    );
  }

  private encerarConfiguracionFormBuilderAfectaDatosUltimaVenta() {
    // empiezaArgumentosAfectaDatosUltimaVenta - NO BORRAR ESTA LINEA
    const argumentos: any = {
      required: true,
      email: false,
      nombre: 'afectaDatosUltimaVenta',
      nombreAPresentarse: 'Afecta datos de última venta',
      ejemplo: 'EJ: Afecta Datos Ultima Venta',
      tooltip: 'Indique si el movimiento afecta los datos de la última venta',
      minLength: false,
      maxLength: false,
      min: false,
      max: false,
      patternMensaje: 'Error en afecta los datos de última venta',
      tipoControl: {
        tipoCampoHtml: 'text',
        tipo: 'select-many',
        opcionesSelect: 'si, no',
      },
      mascara: 'false',
      mascaraCurrency: 'false',
      mascaraFuncion: 'false',
      pattern: 'false',
    };
    // terminaArgumentosAfectaDatosUltimaVenta - NO BORRAR ESTA LINEA

    argumentos.mascara = false;
    argumentos.mascaraFuncion = false;
    argumentos.pattern = false;

    this.mensajesValidacionAfectaDatosUltimaVenta = establecerMensajesDeValidacionComunes(
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

    this.mensajesValidacionAfectaDatosUltimaVenta.configuracionFormBuilder = {
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

    // tslint:disable-next-line:max-line-length
    this.configuracionFormBuilder = encerarConfiguracionFormBuilder(
      this.mensajesValidacionAfectaDatosUltimaVenta.configuracionFormBuilder,
    );
  }

  // contenidoFuncion - NO BORRAR ESTA LINEA
}

interface MensajesValidacionMovimiento extends ObjetoMensajeValidacionInterfaz {
  configuracionFormBuilder?: ConfiguracionFormBuilder;
}
