import {Component, Input, OnInit} from '@angular/core';
import {EdificioLocalizacionInterface} from '../../../../../../compartido/mapa-modulo/interfaces/edificions.localizacion.interface';
import {DireccionInterface} from '../../../../../submodulo-empresa-front/interfaces/direccion.interface';
import {EstablecimientoInterface} from '../../../../../submodulo-empresa-front/interfaces/establecimiento.interface';
import {RUTAS_HORARIO_SERVICIO} from '../../../../../submodulo-empresa-front/modulos/horario-servicio/rutas/definicion-rutas/rutas-horario-servicio';
import {Router} from '@angular/router';

@Component({
  selector: 'ml-edficio-detalle',
  templateUrl: './edficio-detalle.component.html',
  styleUrls: ['./edficio-detalle.component.scss']
})
export class EdficioDetalleComponent implements OnInit {
  @Input()
  idCurso: number;
  @Input()
  edificio: EdificioLocalizacionInterface;
  direccion: DireccionInterface;
  establecimientos: EstablecimientoInterface[];
  constructor(
    private readonly _router: Router,
  ) { }
  ngOnInit() {
    this.direccion = this.edificio.direccion as DireccionInterface;
    this.establecimientos = this.edificio.establecimientos;
  }

  irAHorarioEstablecimiento(establecimiento) {
    const rutaHorarioEstablecimientoCurso = RUTAS_HORARIO_SERVICIO
      .rutaHorarioEstablecimientoCurso(
        false,
        true,
        [
          this.idCurso,
          establecimiento.id
        ]
      ).ruta;
    this._router.navigate(
      rutaHorarioEstablecimientoCurso);
  }

}
