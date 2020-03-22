import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LugarInterface} from '../../../interfaces/lugar-interface';
import {RutaRestService} from '../../../servicios/rest/ruta-rest.service';
import {RutaGestionRutaComponent} from '../../../modulos/ruta/rutas/ruta-gestion-ruta/ruta-gestion-ruta.component';
import {ToasterService} from 'angular2-toaster';
import {EdificioRestService} from '../../../../submodulo-empresa-front/servicios/rest/edificio-rest.service';
import {
  toastErrorCrear,
  toastExitoCrear, toastExitoEditar,
} from '../../../../../constantes/mensajes-toaster';
import {CargandoService} from 'man-lab-ng';
import {EdiCliRutaRestService} from '../../../servicios/rest/edi-cli-ruta-rest.service';
import {EdiCliRutaInterface} from '../../../interfaces/edi-cli-ruta.interface';
import {generarToasterWarningConMensaje} from '../../../constantes/mensajes-toast';

@Component({
  selector: 'ml-modal-asignar-zona-empresa',
  templateUrl: './modal-asignar-zona-empresa.component.html',
  styleUrls: ['./modal-asignar-zona-empresa.component.scss'],
})
export class ModalAsignarZonaEmpresaComponent implements OnInit {
  descripcion: string;
  arregloZonas = [];
  lugarSeleccionada: LugarInterface;
  nombreLugarOZona: string;
  busqueda: string;
  idZonaSeleccionada: number;
  idEdificoSeleccionado: number;
  empresa;

  constructor(
    public dialogo: MatDialogRef<RutaGestionRutaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { registro: number; idEmpresa: number | string, idEmpresaPadre: number | string },
    private readonly _toasterService: ToasterService,
    readonly _cargandoService: CargandoService,
    private readonly _rutaRestService: RutaRestService,
    private readonly _edificioRestService: EdificioRestService,
    private readonly _ediCliRutaRestService: EdiCliRutaRestService,
  ) {
  }

  ngOnInit() {
    this.descripcion = 'Seleccione la zona';
  }

  seteoCiudadSeleccionada(lugar) {
    this.empresa = this.data.idEmpresaPadre;
    if (lugar) {
      this.lugarSeleccionada = lugar;
      this.nombreLugarOZona = this.lugarSeleccionada.nombre;
      this.arregloZonas = [];
      const busqueda = {
        where: {
          lugar: this.lugarSeleccionada.id,
          empresa: this.data.idEmpresa,
        },
      };
      this._rutaRestService
        .findAll('criterioBusqueda=' + JSON.stringify(busqueda))
        .subscribe(r => {
          if (r[0].length > 0) {
            this.arregloZonas = r[0].map(respuesta => {
              const zona = {label: respuesta.nombre, value: respuesta};
              return zona;
            });
          }
        });
    }
  }

  seteoZonaSeleccionada(zona) {
    this.idEdificoSeleccionado = this.data.registro;
    this.nombreLugarOZona = zona.nombre;
    if (zona) {
      this.idZonaSeleccionada = zona;
    }
  }

  metodoCrearZonaEdicio() {
    const ruta = this.idZonaSeleccionada;
    const ediCliRuta = {
      empresa: this.data.idEmpresaPadre,
      ruta,
      edificioCliente: this.idEdificoSeleccionado,
    };

    const buscarRuta = {
      empresa: this.data.idEmpresaPadre,
      edificioCliente: this.idEdificoSeleccionado,
    };
    this._ediCliRutaRestService.findAll('criterioBusqueda=' + JSON.stringify(buscarRuta))
      .subscribe(r => {
        if (r[1] > 0) {
          this._ediCliRutaRestService.updateOne(r[0][0].id, {ruta: this.idZonaSeleccionada})
          // tslint:disable-next-line:no-shadowed-variable
            .subscribe(r => {
              this._cargandoService.deshabilitarCargando();
              this._edificioRestService.updateOne(this.idEdificoSeleccionado, {ruta: this.idZonaSeleccionada})
              // tslint:disable-next-line:no-shadowed-variable
                .subscribe(r => {
                  this._toasterService.pop(toastExitoEditar);
                  this.dialogo.close(r);
                });
            }, error => {
              this._cargandoService.deshabilitarCargando();
              console.error(error);
              this._toasterService.pop(toastErrorCrear);
            });
        } else {
          this._ediCliRutaRestService.create(ediCliRuta)
            .subscribe(
              () => {
                this._cargandoService.deshabilitarCargando();
                this._edificioRestService.updateOne(this.idEdificoSeleccionado, {ruta: this.idZonaSeleccionada})
                // tslint:disable-next-line:no-shadowed-variable
                  .subscribe(r => {
                    this._toasterService.pop(toastExitoCrear);
                    this.dialogo.close(r);
                  });
              }, error => {
                this._cargandoService.deshabilitarCargando();
                console.error(error);
                this._toasterService.pop(toastErrorCrear);
              });
        }
      });
  }
}
