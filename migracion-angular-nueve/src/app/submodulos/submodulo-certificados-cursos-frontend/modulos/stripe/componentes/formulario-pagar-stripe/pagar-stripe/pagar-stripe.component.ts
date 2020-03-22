import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
// import {loadStripe} from '@stripe';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {establecerValoresConfiguracionAbstractControl} from '@manticore-labs/ng-api';
import {StripeRestService} from '../../../servicios/rest/stripe.rest.service';
import {stripe} from '../../../../../../../../environments/environment';
import {TIPOS_TARJETAS} from '../../../constantes/tipos-tarjetas';
import {debounceTime} from 'rxjs/operators';
import {TranslocoService} from '@ngneat/transloco';
import {crearToasterGeneral} from '../../../../../funciones/crear-toaster-general';
import {FormularioStripeInterface} from '../../../constantes/formulario-stripe.interface';

@Component({
  selector: 'ml-pagar-stripe',
  templateUrl: './pagar-stripe.component.html',
  styleUrls: ['./pagar-stripe.component.scss']
})
export class PagarStripeComponent
  implements OnInit {
  formularioValido = false;
  @Output() tarjetaValida: EventEmitter<FormularioStripeInterface> = new EventEmitter();
  @Input() metodosPago = [];
  cardElement;
  card;
  tiposTarjetas = TIPOS_TARJETAS;
  guardarTarjeta = false;
  rutaTraduccion;

  constructor(
    public dialogo: MatDialogRef<PagarStripeComponent>,
    @Inject(MAT_DIALOG_DATA)
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    protected readonly _translocoService: TranslocoService,
  ) {
  }

  ngOnInit(): void {
    this.rutaTraduccion = 'submoduloCertificadosCuros.stripeModulo.componentes.pagarStripe';
    this.escucharCardForm();
  }

  escucharCardForm() {
    this._cargandoService.habilitarCargando();
    const elements = stripe.elements();
    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    this.cardElement = elements.create('card', {style: style});
    this.cardElement.mount('#card-element');
    this._cargandoService.deshabilitarCargando();
    this.cardElement.on('change',
      (card) => {
        this.formularioValido = card.complete;
        if (this.formularioValido && card.brand !== 'unknown') {
          setTimeout(
            () => {
              this._toasterService.pop(
                crearToasterGeneral(this._translocoService, 'success', 'generales.toasters.toastExitoTarjeta')
              );
              this.tarjetaValida.emit({card: this.cardElement, guardar: this.guardarTarjeta});
            },
            4000
          );
        }
      }
    );
  }

  enviarTarjeta(tarjeta) {
    this.formularioValido = true;
    this.tarjetaValida.emit({precargada: true, idMetodoPago: tarjeta.id});
  }
}
