import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'angular2-toaster';
import {
  toastErrorCrear,
  toastExitoCrear,
} from '../../../../../../constantes/mensajes-toaster';
import { DatosVendedorRestService } from '../../../../servicios/rest/datos-vendedor-rest.service';
import { EscalaVendedorPorPeriodoRestService } from '../../../../servicios/rest/escala-vendedor-por-periodo-rest.service';
import { RutaGestionEscalaVendedorComponent } from '../../../escala-vendedor/rutas/ruta-gestion-escala-vendedor/ruta-gestion-escala-vendedor.component';
import { generarToasterErrorConMensaje } from '../../../../constantes/mensajes-toast';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-asignar-escala-vendedor',
  templateUrl: './asignar-escala-vendedor.component.html',
  styleUrls: ['./asignar-escala-vendedor.component.scss'],
})
export class AsignarEscalaVendedorComponent implements OnInit {
  descripcion: string;
  escalaVendedorSeleccionado: number;

  constructor(
    public dialogo: MatDialogRef<RutaGestionEscalaVendedorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { registro: number; idEmpresa: number | string },
    private readonly _toasterService: ToasterService,
    private readonly _escalaVendedorPorPeriodoRestService: EscalaVendedorPorPeriodoRestService,
    private readonly _datosVendedorRestService: DatosVendedorRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {
    this.descripcion = 'Seleccione la escala de vendedor';
  }

  seteoEscalaVendedorSeleccionado(evento) {
    this.escalaVendedorSeleccionado = evento;
  }

  metodoCrearEscalaVendedor() {
    const nuevaEscala = {
      idPeriodoVendedor: this.data.registro,
      idEscala: this.escalaVendedorSeleccionado,
      habilitado: true,
    };
    this._escalaVendedorPorPeriodoRestService
      .buscarYCrearEscalaPeriodoVendedor(nuevaEscala)
      .subscribe(
        r => {
          if (r) {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoCrear);
            this.dialogo.close(r);
          } else {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(
              generarToasterErrorConMensaje('Error ya se encuentra asignado'),
            );
          }
        },
        err => {
          this._cargandoService.deshabilitarCargando();
          console.error(err);
          this._toasterService.pop(toastErrorCrear);
        },
      );
  }
}
