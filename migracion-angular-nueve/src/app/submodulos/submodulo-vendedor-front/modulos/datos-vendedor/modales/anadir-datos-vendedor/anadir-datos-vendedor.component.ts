import {Component, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RutaGestionDatosVendedorComponent} from '../../rutas/ruta-gestion-datos-vendedor/ruta-gestion-datos-vendedor.component';
import {ToasterService} from 'angular2-toaster';
import {DatosVendedorRestService} from '../../../../servicios/rest/datos-vendedor-rest.service';
import {CargandoService} from 'man-lab-ng';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {toastErrorCrear, toastExitoCrear} from '../../../../../../constantes/mensajes-toaster';
import {TipoDatosVenRestService} from '../../../../servicios/rest/tipo-datos-ven-rest.service';
import {generarToasterErrorConMensaje} from '../../../../constantes/mensajes-toast';

@Component({
  selector: 'app-anadir-datos-vendedor',
  templateUrl: './anadir-datos-vendedor.component.html',
  styleUrls: ['./anadir-datos-vendedor.component.scss'],
})
export class AnadirDatosVendedorComponent implements OnInit {

  columnas = [
    {field: 'nombres', header: 'Nombres'},
    {field: 'apellidos', header: 'Apellidos'},
    {field: 'identificacionPais', header: 'Identificación'},
    {field: 'tipoCargo', header: 'Cargo'},
  ];

  rows = NUMERO_FILAS_TABLAS;
  contactosEmpresaSeleccinados = [];
  contactosEmpresa = [];
  descripcion;
  tipoVendedor;
  vendedoresCreados;

  constructor(
    public dialogo: MatDialogRef<RutaGestionDatosVendedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idEmpresa: number | string },
    private readonly _toasterService: ToasterService,
    private readonly _datosVendedorRestService: DatosVendedorRestService,
    private readonly _tipoDatosVendRestService: TipoDatosVenRestService,
    private readonly _cargandoService: CargandoService,
  ) {
  }

  ngOnInit() {
    this.descripcion = 'Seleccione el tipo vendedor y los vendedores a crear.';
  }

  seteoContactosEmpresa(evento) {
    this.contactosEmpresa = evento;
  }

  seteoTipoVendedorSeleccionado(evento) {
    this.tipoVendedor = evento.id;
  }

  metodoCrearVendedor() {
    const arregloDatosVendedorCrear = this.contactosEmpresaSeleccinados
      .map(respuesta => {
        const fechaTemporal = new Date();
        const fechaIngreso = `${fechaTemporal.getFullYear()}-${fechaTemporal.getMonth() + 1}-${fechaTemporal.getDate()}`;
        const datosVendedor = {
          nombreVendedor: respuesta.datosUsuario.nombres,
          apellidoVendedor: respuesta.datosUsuario.apellidos,
          documento: respuesta.datosUsuario.identificacionPais,
          fechaIngreso: fechaIngreso,
          fechaSalida: null,
          habilitado: true,
          empresaId: this.data.idEmpresa,
          userId: respuesta.datosUsuario.user_id,
          contactoEmpresa: respuesta.id,
        };
        return datosVendedor;
      });
    if (this.tipoVendedor && arregloDatosVendedorCrear) {
      this._datosVendedorRestService.create(arregloDatosVendedorCrear)
        .subscribe(
          respuesta => {
            this.vendedoresCreados = respuesta;
            this.vendedoresCreados
              .forEach(resp => {
                this._tipoDatosVendRestService
                  .create({
                    habilitado: true,
                    datosVendedor: resp.id,
                    tipoVendedor: this.tipoVendedor,
                  }).subscribe(
                  () => {
                    resp.habilitado = +resp.habilitado;
                    this.dialogo.close(this.vendedoresCreados);
                  },
                  err => {
                    this._cargandoService.deshabilitarCargando();
                    console.error(err);
                    this._toasterService.pop(toastErrorCrear);
                  }
                );
              });
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(generarToasterErrorConMensaje('Error creando, talvez el/los vendedores ya se encuentran registrados'));
          },
        );
    }
  }
}

