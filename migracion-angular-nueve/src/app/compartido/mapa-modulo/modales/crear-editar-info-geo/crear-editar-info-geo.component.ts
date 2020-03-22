import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToasterService} from 'angular2-toaster';
import {CargandoService} from 'man-lab-ng';
import {LocalizacionInterface} from '../../interfaces/localizacion.interface';
import {InicializarMapa} from '../../servicios/open-layers/interfaces/inicializar-mapa';
import {LocalizacionRestService} from '../../servicios/rest/localizacion-rest.service';

@Component({
  selector: 'app-crear-editar-info-geo',
  templateUrl: './crear-editar-info-geo.component.html',
  styleUrls: ['./crear-editar-info-geo.component.scss']
})
export class CrearEditarInfoGeoComponent implements OnInit {
  poligonoValido = false;
  idLocalizacion: any;
  informacionGeografica;
  constructor(
    public dialogo: MatDialogRef<CrearEditarInfoGeoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      localizacion?: LocalizacionInterface,
      configuracionMapa?: InicializarMapa,
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _localizacionRestService: LocalizacionRestService,
  ) {
  }

  ngOnInit() {
  }

  cerrarModal() {
    this.dialogo.close();
  }

  editarOCrear() {
    const registro: LocalizacionInterface = JSON.parse(JSON.stringify(this.data.localizacion));
    registro.localizacion.coordinates = this.informacionGeografica;
    registro.localizacion.type = this.data.localizacion.localizacion.type;
    if (registro.id) {
      this._localizacionRestService.editarLocalizacion({id: this.idLocalizacion, localizacion: registro}).subscribe(
        (respuesta) => {
          this._toasterService.pop('success', 'Información Geográfica actualizada', 'La información se ha actualizado con exito');
          this.dialogo.close(true);
        },
        error => {
          console.error(
            {
              error,
              data: registro,
            }
          );
          this._toasterService.pop('error', 'Error al actualizar', 'Revise si la información geográfica es válida');
        }
      );
    } else {
      this._localizacionRestService.create({localizacion: registro}).subscribe(
        (respuesta) => {
          this._toasterService.pop('success', 'Información Geográfica Guardada', 'La información se ha guardado con exito');
          this.dialogo.close(false);
        },
        error => {
          console.error(
            {
              error,
              data: registro,
            }
          );
          this._toasterService.pop('error', 'Error al guardar', 'Revise si la información geográfica es válida');
        }
      );
    }
  }

  escucharMapa(event) {
    this.poligonoValido = !!event;
    if (this.poligonoValido) {
      this.informacionGeografica = event;
    }
  }
}
