import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PermisoNombreRestService } from '../../../../servicios/rest/permiso-nombre-rest.service';
import { ESTADOS } from '../../../../../../enums/estados';
import { NombrePermisoInterface } from '../../../../interfaces/nombre-permiso-interface';
import { CargandoService } from 'man-lab-ng';
import {ModulosSistemaInterface} from '../../../../interfaces/modulos-sistema.interface';
import {ModulosSistemaRestService} from '../../../../servicios/rest/modulos-sistema-rest.service';

@Component({
  selector: 'ml-filter-permiso',
  templateUrl: './filter-permiso.component.html',
  styleUrls: ['./filter-permiso.component.sass'],
})
export class FilterPermisoComponent implements OnInit {
  estados = ESTADOS;
  @Input() rol: number;
  @Output() permisosNombreEncontrados: EventEmitter<
    NombrePermisoInterface[]
    > = new EventEmitter();
  habilitarBuscarModulo = false;
  @Input() permitirBusquedaEstados = true;
  moduloEncontrado: ModulosSistemaInterface;
  modulos: ModulosSistemaInterface[];
  constructor(
    private readonly _permisoNombreRestService: PermisoNombreRestService,
    private readonly _cargandoService: CargandoService,
    private readonly _moduloSistemaRestService: ModulosSistemaRestService,
  ) {}
  ngOnInit() {
    if (this.rol) {
      this.habilitarBuscarModulo = true;
    }
  }
  buscarModulos(busqueda: any) {
    this.moduloEncontrado = undefined;
    let consulta;
    let busqueda$;
    if (busqueda.query) {
      consulta = {
        where: {
          nombreModulo: `Like("%25${busqueda.query}%25")`
        }
      };
      busqueda$ = this._moduloSistemaRestService.findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
    } else {
      busqueda$ = this._moduloSistemaRestService.findAll();
    }

    busqueda$
      .subscribe(
        (modulos: [ModulosSistemaInterface[], number]) => {
          this.modulos = modulos[0];
        },
        err => {
          console.error('error al buscar modulos');
        }
      );
  }

  emitirModuloSeleccionado(registro: any) {
    console.log('selecciono', this.rol, registro);
    if (registro) {
      this.buscarNombresPermisoPorRol(registro.id, this.rol );
    } else {
      this.permisosNombreEncontrados.emit([]);
    }
  }

  buscarNombresPermisoPorRol(modulo, rol) {
    this._permisoNombreRestService
      .obtenerNombrePermisoPorRol(modulo, rol)
      .subscribe(
        (nombresPermiso: NombrePermisoInterface[]) => {
          console.log('nombres permiso a enviar', nombresPermiso);
          this.permisosNombreEncontrados.emit(nombresPermiso);
        },
        err => {
          console.error('error buscando nombres permsio');
        }
      );
  }
}
