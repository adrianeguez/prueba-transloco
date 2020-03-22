import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  InformacionTributariaRestService,
  RespuestaBuscarEmpresaOInformacionTributariaPorCedulaRucOPasaporte,
} from '../../../../../submodulo-empresa-front/servicios/rest/informacion-tributaria-rest.service';
import { ToasterService } from 'angular2-toaster';
import {
  toastErrorMostrar,
  ToastErrorTrayendoDatos,
} from '../../../../../../constantes/mensajes-toaster';
import { CargandoService } from 'man-lab-ng';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {InformacionTributariaInterface} from '../../../../../submodulo-empresa-front/interfaces/informacion-tributaria.interface';
// tslint:disable-next-line:max-line-length
import {ModalCrearEditarInformacionTributariaComponent} from '../../../modales/modal-crear-editar-informacion-tributaria/modal-crear-editar-informacion-tributaria/modal-crear-editar-informacion-tributaria.component';
import {EmpresaInterface} from '../../../../../submodulo-empresa-front/interfaces/empresa.interface';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'ml-filter-cliente',
  templateUrl: './filter-cliente.component.html',
  styleUrls: ['./filter-cliente.component.scss'],
})
export class FilterClienteComponent implements OnInit {
  @Input() clienteOProveedor;

  @Input() esVenta: boolean;

  @Input() informacionTributaria: InformacionTributariaInterface;

  skip = 0;

  @Output()
  seEncontraronEmpresasOInformacionTributaria: EventEmitter<
    [RespuestaBuscarEmpresaOInformacionTributariaPorCedulaRucOPasaporte[] | any[], number]
    > = new EventEmitter();

  busqueda = {
    cedulaRucPasaporte: '',
  };

  constructor(
    private readonly _informacionTributariaRestService: InformacionTributariaRestService,
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    public matDialog: MatDialog,
  ) {}

  ngOnInit() {
    if (this.informacionTributaria) {
      this.seEncontraronEmpresasOInformacionTributaria.emit(
        [[this.informacionTributaria], 1]
      );
    } else {
      this.buscarClienteOProveedorPorCedulaRucOPasaporte();
    }
  }

  buscarCedulaRucOPasporte() {
    let respuestaCedulaRucPasaporte$;
    let consulta;
    if (this.busqueda.cedulaRucPasaporte === '') {
      consulta = {
        skip: this.skip,
        take: 4,
        relations: ['empresa', 'tipoIdentificacion'],
        order: {
          id: 'DESC',
        }
      };
      respuestaCedulaRucPasaporte$ = this._informacionTributariaRestService
        .findAll(
          `criterioBusqueda=` + JSON.stringify(consulta)
        );
    } else {
      respuestaCedulaRucPasaporte$ = this._informacionTributariaRestService
        .buscarEmpresaOInformacionTributariaPorCedulaRucOPasaporte(
          this.busqueda.cedulaRucPasaporte,
        );
    }
    respuestaCedulaRucPasaporte$.subscribe(
      respuesta => {
        this.informacionTributaria = null;
        this._cargandoService.deshabilitarCargando();
        this.seEncontraronEmpresasOInformacionTributaria.emit(respuesta);
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error({
          error,
          mensaje: 'Error consultando por cedula ruc o pasaporte',
        });
        this._toasterService.pop(ToastErrorTrayendoDatos);
      },
    );
  }

  buscarClienteOProveedorPorCedulaRucOPasaporte() {
    this._cargandoService.habilitarCargando();
    this.buscarCedulaRucOPasporte();
  }

  abrirModalCrearInformacionTributaria() {
    const dialogRef = this.matDialog.open(ModalCrearEditarInformacionTributariaComponent, {
      width: '1000px',
      data: { esVenta: this.esVenta},
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((informacionTributariaCreada: InformacionTributariaInterface) => {
        if (informacionTributariaCreada) {
          this.seEncontraronEmpresasOInformacionTributaria.emit(
            [[informacionTributariaCreada], 1]
          );
        }
      },
      error => {
        console.error(error);
      });
  }
}
