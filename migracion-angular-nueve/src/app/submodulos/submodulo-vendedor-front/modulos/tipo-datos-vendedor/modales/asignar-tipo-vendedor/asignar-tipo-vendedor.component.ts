import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'angular2-toaster';
import { RutaGestionDatosVendedorComponent } from '../../../datos-vendedor/rutas/ruta-gestion-datos-vendedor/ruta-gestion-datos-vendedor.component';
import { DatosVendedorInterface } from '../../../../interfaces/datos-vendedor-interface';
import { DatosVendedorRestService } from '../../../../servicios/rest/datos-vendedor-rest.service';
import { TipoVendedorRestService } from '../../../../servicios/rest/tipo-vendedor-rest.service';
import { CargandoService } from 'man-lab-ng';
import {toastErrorCrear, toastExitoCrear} from '../../../../../../constantes/mensajes-toaster';
import {TipoDatosVenRestService} from '../../../../servicios/rest/tipo-datos-ven-rest.service';
import {generarToasterErrorConMensaje, generarToasterWarningConMensaje} from '../../../../constantes/mensajes-toast';

@Component({
  selector: 'ml-asignar-tipo-vendedor',
  templateUrl: './asignar-tipo-vendedor.component.html',
  styleUrls: ['./asignar-tipo-vendedor.component.scss'],
})
export class AsignarTipoVendedorComponent implements OnInit {
  descripcion: string;
  tipoVendedorSeleccionado: number;

  constructor(
    public dialogo: MatDialogRef<RutaGestionDatosVendedorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      idEmpresa: number | string;
      idVendedor: number | string;
    },
    private readonly _toasterService: ToasterService,
    private readonly _datosVendedorRestService: DatosVendedorRestService,
    private readonly _cargandoService: CargandoService,
    private readonly  _tipoDatosVendedorRestService: TipoDatosVenRestService,
  ) {}

  ngOnInit() {
    this.descripcion = 'Seleccione el tipo de vendedor';
  }

  seteoTipoVendedorSeleccionado(evento) {
    this.tipoVendedorSeleccionado = evento.id;
  }

  metodoActualizarTipoVendedor() {
    this._tipoDatosVendedorRestService.create({
      habilitado: true,
      datosVendedor: this.data.idVendedor,
      tipoVendedor: this.tipoVendedorSeleccionado,
    }).subscribe(r => {
      r.habilitado = +r.habilitado;
      this._cargandoService.deshabilitarCargando();
      this._toasterService.pop(toastExitoCrear);
      this.dialogo.close(r);
    },
      err => {
        this._cargandoService.deshabilitarCargando();
        console.error(err);
        this._toasterService.pop(generarToasterErrorConMensaje('Error creando, talvez el tipo vendedor ya se encuentra asignado'));
      },
    );


  }
}






