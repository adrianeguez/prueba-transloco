import {Component, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';
import {PedidoCursoInterface} from '../../../interfaces/pedido-curso.interface';
import {PedidoCursoRestService} from '../../../servicios/rest/pedido-curso-rest.service';
import {
  CONFIGURACION_PEDIDO,
  ConfiguracionFormluarioPedido
} from '../../../componentes/pedido-formulario/pedido-formulario.component';
import {StripeRestService} from '../../../../stripe/servicios/rest/stripe.rest.service';
import {stripe} from '../../../../../../../../environments/environment';
import {DatosPedidoStripeInterface} from '../../../interfaces/datos-pedido-stripe.interface';
import * as moment from 'moment';
import {TranslocoService} from '@ngneat/transloco';
import {crearToasterGeneral} from '../../../../../funciones/crear-toaster-general';
import {FormularioStripeInterface} from '../../../../stripe/constantes/formulario-stripe.interface';
import {DatosUsuarioPedidoInterface} from '../../../interfaces/datos-usuario-pedido.interface';

@Component({
  selector: 'app-crear-editar-pedido-curso',
  templateUrl: './crear-editar-pedido-curso.component.html',
  styleUrls: ['./crear-editar-pedido-curso.component.scss']
})
export class CrearEditarPedidoCursoComponent extends FormularioModal<PedidoCursoInterface,
  ConfiguracionFormluarioPedido,
  PedidoCursoRestService>
  implements OnInit {
  formularioValido;
  pagoValido = false;
  cliente;
  @Output() intentoPago;
  cargarPago = false;

  constructor(
    public dialogo: MatDialogRef<CrearEditarPedidoCursoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      pedidoCurso: PedidoCursoInterface,
      producto,
      precio,
      horarioServicio,
      usuario,
      idUsuario
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _pedidoCursoRestService: PedidoCursoRestService,
    private readonly _stripeRestService: StripeRestService,
    private _translocoService: TranslocoService,
  ) {
    super(
      _pedidoCursoRestService,
      _cargandoService,
      _toasterService,
      data.pedidoCurso,
    );
  }

  ngOnInit(): void {
    if (this.data.pedidoCurso) {
      this.encerarConfiguracionPedido();
    } else {
      const datos: DatosUsuarioPedidoInterface = {
        usuario: {
          name: this.data.idUsuario,
        },
        precio: +this.data.precio
      };
      this.iniciarCliente(datos);
      this.encerarConfiguracionDisabled();
    }
  }

  private iniciarCliente(datos) {
    this._stripeRestService.recibirCliente(datos)
      .subscribe(
        (respuesta: DatosPedidoStripeInterface) => {
          if (respuesta) {
            this.cliente = respuesta;
            this.tieneMetodoPago(respuesta.metodosPago);
          }
        }, error => {
          console.error({error, mensaje: 'No recibe cliente', data: datos});
          this._toasterService.pop(
            crearToasterGeneral(this._translocoService, 'error', 'generales.toaster.toastErrorClienteStripe')
          );
        }
      );
  }

  private tieneMetodoPago(arregloMetodosPago) {
    if (arregloMetodosPago.length > 0) {
      this.intentoPago = arregloMetodosPago;
    }
    this.cargarPago = true;
  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_PEDIDO();
    this.configuracionDisabled.Curso.valor = this.data.producto.articulo.curso.nombre;
    this.configuracionDisabled.Curso.disabled = true;
    this.configuracionDisabled.Valor.valor = this.data.precio;
    this.configuracionDisabled.Valor.disabled = true;
    this.configuracionDisabled.Nombres.valor = this.data.usuario.nombres;
    this.configuracionDisabled.Apellidos.valor = this.data.usuario.apellidos;

    if (this.data.horarioServicio === undefined) {
      this.configuracionDisabled.HorarioServicio.hidden = true;
      this.configuracionDisabled.HorarioServicio.valor = this.data.usuario.id;
    } else {
      this.configuracionDisabled.HorarioServicio.valor = this.data.horarioServicio.horario.descripcion;
      this.configuracionDisabled.HorarioServicio.disabled = true;
    }

    establecerValoresConfiguracionAbstractControl(
      this.configuracionDisabled,
      {},
    );
  }

  private encerarConfiguracionPedido() {
    this.configuracionDisabled = CONFIGURACION_PEDIDO();
    // @ts-ignore
    this.configuracionDisabled.Curso.valor = this.data.pedidoCurso.horarioServicio.servicioPorEstablecimiento.articuloPorEmpresa.articulo.curso.nombre;
    this.configuracionDisabled.Curso.disabled = true;
    // @ts-ignore
    this.configuracionDisabled.Valor.valor = this.data.pedidoCurso.horarioServicio.servicioPorEstablecimiento.precio;
    this.configuracionDisabled.Valor.disabled = true;
    this.configuracionDisabled.Nombres.valor = this.data.pedidoCurso.datosUsuario.nombres;
    this.configuracionDisabled.Nombres.disabled = true;
    this.configuracionDisabled.Apellidos.valor = this.data.pedidoCurso.datosUsuario.apellidos;
    this.configuracionDisabled.Apellidos.disabled = true;
    // @ts-ignore
    this.configuracionDisabled.HorarioServicio.valor = this.data.pedidoCurso.horarioServicio.horario.descripcion;
    this.configuracionDisabled.HorarioServicio.disabled = true;

    const opcionEditar = Object.assign(
      {},
      this.data.pedidoCurso,
    );
    establecerValoresConfiguracionAbstractControl(
      this.configuracionDisabled,
      opcionEditar,
    );
  }

  formularioPagar(evento: FormularioStripeInterface) {
    this.pagoValido = true;
    if (evento.precargada) {
      this.intentoPago = {
        payment_method: evento.idMetodoPago
      };
    } else {
      this.intentoPago = {
        payment_method: {
          card: evento.card,
        }
      };
      if (evento.guardar) {
        this.intentoPago.setup_future_usage = 'off_session';
      }
      if (this.registroCrearEditar !== undefined) {
        this.intentoPago.payment_method.billing_details = {
          name: `${this.registroCrearEditar.nombres} ${this.registroCrearEditar.apellidos}`
        };
      } else {
        this.intentoPago.payment_method.billing_details = {
          name: `${this.data.usuario.nombres} ${this.data.usuario.apellidos}`
        };
      }
    }
  }

  validarFormulario(cronogramaCabecera: any): void {
    super.validarFormulario(cronogramaCabecera);
    if (this.pagoValido) {
      this.formularioValido = true;
    }
  }

  prepararRegistroParaEnvio(registro) {
    this.registroCrearEditar = registro;
    return this.registroCrearEditar;
  }

  async pagar() {
    this.cargandoService.habilitarCargando();
    const intentoPago = await stripe.confirmCardPayment(
      this.cliente.clientSecret,
      this.intentoPago,
    );
    if (intentoPago.error) {
      this.cargandoService.deshabilitarCargando();
      console.error({error: intentoPago.error, mensaje: 'Error realizando pago', data: this.intentoPago});
      this._toasterService.pop(
        crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorPagar')
      );
      this.dialogo.close();
    } else {
      this._toasterService.pop(
        crearToasterGeneral(this._translocoService, 'success', 'generales.toasters.toastExitoPagar')
      );
      this.crearPedido(intentoPago);
      this.cargandoService.deshabilitarCargando();
    }
  }

  crearPedido(intento: string): void {
    this.cargandoService.habilitarCargando();
    if (this.data.horarioServicio) {
      const registroCrearPedido: PedidoCursoInterface = {
        horarioServicio: this.data.horarioServicio,
        datosUsuario: this.data.usuario,
        fecha: moment().format('YYYY-MM-DD')
      };
      this._pedidoCursoRestService.create(
        registroCrearPedido
      )
        .subscribe(
          () => {
            this.cargandoService.deshabilitarCargando();
            this.dialogo.close(intento);
          }, error => {
            this._toasterService.pop(
              crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorCrearVacio')
            );
            this.cargandoService.deshabilitarCargando();
            this.reversar(intento);
            this.dialogo.close();
          }
        );
    } else {
      // console.log('aqui poner lógica pedido detalle');
      const cabeceraPedidoCursoOnline = {
        tipoMovimiento: 1,
        idCliente: this.data.usuario.id,
        idEmpresa: this.data.producto.empresa.id
      };
      const detallePedidoCursoOnline = {
        tipoMovimiento: 1,
        articulo: this.data.producto.articulo,
        cantidad: 1,
        cantidadPromocion: 0,
        valorUnitario: this.data.precio,
        descuento: []
      };
      // console.log(cabeceraPedidoCursoOnline, detallePedidoCursoOnline);
      this.dialogo.close(intento);

    }

  }

  private reversar(intentoPago) {
    this._stripeRestService.reversarTarjeta(intentoPago)
      .subscribe(
        respuesta => {
          this._toasterService.pop(
            crearToasterGeneral(this._translocoService, 'success', 'generales.toasters.toastExitoReverso')
          );
        },
        errorStripe => {
          console.error({error: errorStripe, mensaje: 'Error reversando', data: intentoPago});
        }
      );
  }
}
