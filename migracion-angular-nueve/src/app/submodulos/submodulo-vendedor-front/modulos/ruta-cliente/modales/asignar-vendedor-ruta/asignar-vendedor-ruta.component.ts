import {element} from 'protractor';
import {DatosVendedorRestService} from '../../../../servicios/rest/datos-vendedor-rest.service';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {RutaClienteRestService} from '../../../../servicios/rest/ruta-cliente-rest.service';
import {RutaAsignacionVendedorEmpresaComponent} from '../../rutas/ruta-asignacion-vendedor-empresa/ruta-asignacion-vendedor-empresa.component';
import {CargandoService} from 'man-lab-ng';
import {VendedorRutaClienteRestService} from '../../../../servicios/rest/vendedor-ruta-cliente-rest.service';

@Component({
  selector: 'ml-asignar-vendedor-ruta',
  templateUrl: './asignar-vendedor-ruta.component.html',
  styleUrls: ['./asignar-vendedor-ruta.component.scss'],
})
export class AsignarVendedorRutaComponent implements OnInit {
  arregloVendedores = new Array(4);
  nombreEmpresa: any;
  nombreEdificio: any;

  constructor(
    public dialogo: MatDialogRef<RutaAsignacionVendedorEmpresaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      empresa: string;
      edificio: string;
      idEdificio: number | string;
      idEmpresa: number | string;
      vendedores: any[];
      rutaCliente: any;
    },
    private readonly _rutaClienteRestService: RutaClienteRestService,
    private readonly _cargandoService: CargandoService,
    private readonly _datosVendedorRestService: DatosVendedorRestService,
    private readonly _vendedorRutaClienteRestService: VendedorRutaClienteRestService,
  ) {
  }

  ngOnInit() {
    this.nombreEmpresa = this.data.empresa.toUpperCase();
    this.nombreEdificio = this.data.edificio.toUpperCase();
  }

  seteoVendedores(event) {
    this.arregloVendedores = event;
  }

  metodoCrearVendedoresAsignacion() {
    this._cargandoService.habilitarCargando();
    const existenVendedodresAsignados = this.arregloVendedores.length > 0;
    if (existenVendedodresAsignados) {
      const arregloVendedoresEdifico = this.arregloVendedores.map(r => {
        const vendedorEdificio = {
          rutaCliente: this.data.rutaCliente,
          datosVendedor: r.id,
          habilitado: true,
        };
        return vendedorEdificio;
      });
      this._vendedorRutaClienteRestService
        .create(arregloVendedoresEdifico)
        .subscribe(
          (r: any) => {
            r.map(
              // tslint:disable-next-line: no-shadowed-variable
              async element => {
                try {
                  element.habilitado = +element.habilitado;
                  const vendedor = await this._datosVendedorRestService
                    .findOne(element.datosVendedor)
                    .toPromise();
                  element.datosVendedor = vendedor;
                  this._cargandoService.deshabilitarCargando();
                  return element;
                } catch (error) {
                  this._cargandoService.deshabilitarCargando();
                  console.error(error);
                }
              },
            );
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close(r);
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
          },
        );
    }
  }
}
