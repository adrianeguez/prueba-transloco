import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MovimientoRestService} from '../../../../servicios/rest/movimiento-rest.service';
import {ToasterService} from 'angular2-toaster';
import {MovimientoInterface} from '../../../../interfaces/movimiento.interface';
import {toastErrorConexionServidor, ToastErrorTrayendoDatos} from '../../../../../../constantes/mensajes-toaster';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {CargandoService} from 'man-lab-ng';
import {MovimientoEmpresaRestService} from '../../../../servicios/rest/movimiento-empresa-rest.service';
import {EmpresaMovimientoInterface} from '../../../../interfaces/empresa-movimiento.interface';

@Component({
  selector: 'ml-filter-movimiento',
  templateUrl: './filter-movimiento.component.html',
  styleUrls: ['./filter-movimiento.component.scss'],
})
export class FilterMovimientoComponent implements OnInit {
  @Input() tipoMovimiento;
  @Input() empresaId;

  skip = 0;

  @Output() movimientosEncontrados: EventEmitter<[EmpresaMovimientoInterface[], number]> = new EventEmitter();

  busqueda = '';

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _movimientoRestService: MovimientoRestService,
    private readonly _toasterService: ToasterService,
    private readonly _movimientoEmpresaRestService: MovimientoEmpresaRestService,
  ) {
  }

  ngOnInit() {
    this.buscarMovimientosPorTipo();
  }

  buscarMovimientosPorTipo() {
    let movimientos$;
    let consulta;
    if (this.busqueda === '') {
      consulta = {
        order: {'id': 'ASC'},
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
        relations: ['movimiento', 'movimiento.tipoMovimiento']
      };
      consulta.where = {
        empresa: this.empresaId,
      };
      movimientos$ = this._movimientoEmpresaRestService.findAll(
        `criterioBusqueda=` + JSON.stringify(consulta),
      );
    } else {
      consulta = {
        order: {'id': 'ASC'},
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
        relations: ['movimiento', 'movimiento.tipoMovimiento']
      };
      consulta.where = [
        {
          codigo: `Like("%25${this.busqueda}%25")`,
          empresa: this.empresaId,
        },
        {
          nombre: `Like("%25${this.busqueda}%25")`,
          empresa: this.empresaId,
        }
      ];
      movimientos$ = this._movimientoEmpresaRestService.findAll(
        `criterioBusqueda=` + JSON.stringify(consulta),
      );
    }
    movimientos$.subscribe(
      resultado => {
        this._cargandoService.deshabilitarCargando();
        resultado[0] = resultado[0].map(
          (movimientoEmpresa) => {
            movimientoEmpresa = movimientoEmpresa.movimiento;
            return movimientoEmpresa;
          }
        );
        this.movimientosEncontrados.emit(resultado);
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error({
          error,
          mensaje: 'Error consultando los tipos de movimiento'
        });
        this._toasterService.pop(ToastErrorTrayendoDatos);
      },
    );
  }

  buscarMovimiento() {
    this._cargandoService.habilitarCargando();
    this.buscarMovimientosPorTipo();
  }
}
