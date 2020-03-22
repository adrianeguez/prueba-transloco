import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LocalizacionInterface} from '../../../../../../compartido/mapa-modulo/interfaces/localizacion.interface';
import {InicializarMapa} from '../../../../../../compartido/mapa-modulo/servicios/open-layers/interfaces/inicializar-mapa';
import {OpenlayersService} from '../../../../../../compartido/mapa-modulo/servicios/open-layers/open.layers.service';
import {EdificioLocalizacionInterface} from 'src/app/compartido/mapa-modulo/interfaces/edificions.localizacion.interface';
// tslint:disable-next-line:max-line-length
import {LocalizacionRestService} from '../../../../../submodulo-empresa-front/servicios/rest/localizacion-rest.service';
import {EdificioInterface} from '../../../../../submodulo-empresa-front/interfaces/edificio.interface';
import {CargandoService} from 'man-lab-ng';

@Component({
  selector: 'app-mapa-establecimientos',
  templateUrl: './mapa-establecimientos.component.html',
  styleUrls: ['./mapa-establecimientos.component.scss']
})
export class MapaEstablecimientosComponent implements OnInit {
  map: any;
  informacionEdificio: EdificioLocalizacionInterface;
  consulta = {};

  constructor(
    public dialogo: MatDialogRef<MapaEstablecimientosComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      localizacion?: LocalizacionInterface,
      configuracionMapa?: InicializarMapa,
      idCurso?: number,
    },
    private readonly _openlayersService: OpenlayersService,
    private readonly _localizacionService: LocalizacionRestService,
    private readonly _cargandoService: CargandoService,
  ) {
  }

  protected obtenerIdsEdificios() {
    const edificios = this.data.configuracionMapa.edificios;
    return edificios.map(edificio => edificio.id);
  }

  ngOnInit() {
    this.consulta = {
      where: {
        id: this.obtenerIdsEdificios(),
      }
    };
  }

  escucharMapa(event) {
    if (event) {
      this.informacionEdificio = event.objetoImagen.edificio;
    } else {
      this.informacionEdificio = undefined;
    }
  }

  protected buscarEdificioEnLaLista(idEdificio: number) {
    const edificios = this.data.configuracionMapa.edificios as EdificioLocalizacionInterface[];
    const indice =  edificios.findIndex(
      (edificio: EdificioLocalizacionInterface) => {
        return +edificio.id === +idEdificio;
      }
    );
    return edificios[indice];
  }

  escucharFormulario(edificio: EdificioInterface) {
    if (edificio.id) {
      const datos = {
        entidadId: edificio.id,
        entidadNombre: 'edificio',
      };
      this._cargandoService.habilitarCargando();
      this._localizacionService.buscarLocalizacion(datos).subscribe(
        (respuestaConsulta: LocalizacionInterface) => {
          const coordenas = respuestaConsulta.localizacion.coordinates as number[];
          this._cargandoService.deshabilitarCargando();
          this.informacionEdificio = this.buscarEdificioEnLaLista(edificio.id);
          this._openlayersService.emitirPosicion(coordenas[0], coordenas[1]);
        }, error => {
          console.error(error);
        }
      );
    }

  }
}
