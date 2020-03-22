import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CargandoService} from 'man-lab-ng';
import {Toast, ToasterService} from 'angular2-toaster';
import {ServicioRestService} from '../../../servicios/rest/servicios.rest.service';
import {TranslocoService} from '@ngneat/transloco';
import {MensajesToasterInterface} from '../../../../../../../interfaces/mensajesToaster.Interface';

@Component({
  selector: 'app-crear-editar-servicio-establecimiento',
  templateUrl: './crear-editar-servicio.component.html',
  styleUrls: ['./crear-editar-servicio.component.scss']
})
export class CrearEditarServicioEstablecimientoComponent implements OnInit {
  articulosSeleccionados;
  articuloEnTabla: boolean;
  traduccionesToaster: MensajesToasterInterface;

  constructor(
    public dialogo: MatDialogRef<CrearEditarServicioEstablecimientoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      idEmpresa,
      idEstablecimiento,
      articulosEnTabla,
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _servicioEstablecimientoRestService: ServicioRestService,
    protected readonly _translocoService: TranslocoService,
  ) {
  }

  ngOnInit() {
    this.articuloEnTabla = false;
    this._translocoService.selectTranslateObject('generales.toasters').subscribe(
      (traduccion) => {
        this.traduccionesToaster = traduccion;
      }
    );
  }

  obtenerArticuloSeleccionado(eventoArticulo) {
    this._cargandoService.habilitarCargando();
    this.articulosSeleccionados = eventoArticulo;
    this.verificarArticuloEnTabla(this.data.articulosEnTabla, this.articulosSeleccionados);
    this._cargandoService.deshabilitarCargando();
  }

  verificarArticuloEnTabla(arreglo, arregloAñadido) {
    this.articuloEnTabla = arreglo.some(
      (articulo) => {
        return arregloAñadido.some(
          servicioAñadido => {
            return servicioAñadido.id === articulo.articuloPorEmpresa.articulo.id;
          }
        );
      });
  }

  aceptarArticuloSeleccionado() {
    if (this.articuloEnTabla) {
      this._toasterService.pop(this.traduccionesToaster.toastErrorServicio as Toast);
    } else {
      const insertarServicioEstablecimiento = [];
      this.articulosSeleccionados.forEach(
        articulo => {
          const servicioEstablecimiento = {
            habilitado: 1,
            articuloPorEmpresa: {
              id: articulo.articuloPorEmpresa[0].id,
              articulo: articulo
            },
            establecimiento: this.data.idEstablecimiento,
            precios: []
          };
          insertarServicioEstablecimiento.push(servicioEstablecimiento);
        }
      );

      this._cargandoService.habilitarCargando();
      this._servicioEstablecimientoRestService.create(insertarServicioEstablecimiento)
        .subscribe(
          respuesta => {
            this._toasterService.pop(this.traduccionesToaster.toastExitoCrearVacio as Toast);
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close(respuesta);
          },
          error => {
            console.error(error);
            this._toasterService.pop(this.traduccionesToaster.toastErrorCrearVacio as Toast);
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close();
          },
        );
    }
  }
}

