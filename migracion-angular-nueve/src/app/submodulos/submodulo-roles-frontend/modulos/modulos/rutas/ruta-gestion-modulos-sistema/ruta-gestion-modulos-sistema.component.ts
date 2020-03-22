import { Component, OnInit } from '@angular/core';
import {RUTAS_MODULOS_SISTEMA} from '../definicion-rutas/rutas-modulos-sistema';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {ModulosSistemaRestService} from '../../../../servicios/rest/modulos-sistema-rest.service';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { MatDialog } from '@angular/material/dialog';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {CrearEditarModulosSistemaComponent} from '../../modales/crear-editar-modulos-sistema/crear-editar-modulos-sistema.component';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {ModulosSistemaInterface} from '../../../../interfaces/modulos-sistema.interface';
import {toastErrorEditar, toastExitoEditar} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'app-ruta-gestion-modulos-sistema',
  templateUrl: './ruta-gestion-modulos-sistema.component.html',
  styleUrls: ['./ruta-gestion-modulos-sistema.component.scss']
})
export class RutaGestionModulosSistemaComponent
  extends RutaConMigasDePanTablaBusqueda<ModulosSistemaInterface,
    ModulosSistemaRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {field: 'nombreModulo', header: 'Nombre'},
    {habilitado: 'habilitado', header: 'Estado'},
    {field: 'id', header: 'Acciones'},
  ];
  habilitado: boolean;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _modulosSistemaRestService: ModulosSistemaRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _modulosSistemaRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
    );
    this.tipoBusqueda = 'findAll';
    this.queryParams.relations = [];
    this.queryParams.order = {
      id: 'DESC',
    };
  }

  ngOnInit() {
    this.ruta = RUTAS_MODULOS_SISTEMA.rutaGestionModulosSistema(false, true, [
      // aqui ids si son necesarios
    ]).ruta;
    this.queryParams.where = {
    };
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_MODULOS_SISTEMA.rutaGestionModulosSistema(false, true),
    ];
    this.habilitado = true;
    this.establecerMigas(rutas);
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
  }

  buscarPorIdentificadorONombre(busqueda: string) {
    if (busqueda === '') {
      this.queryParams.relations = [];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    } else {
      this.queryParams.relations = [];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = [
        {
          nombreModulo: `Like("%25${busqueda}%25")`,
        }
      ];
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  abrirModalCrearModulosSistema(registro?) {
    if (registro) {
      this.establecerRegistroActual(registro.id);
    }
    const dialogRef = this.dialog.open(CrearEditarModulosSistemaComponent, {
      width: '700px',
      data: {
        moduloSistema: registro,
        // mas campos que se manden al modal
      },
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: ModulosSistemaInterface) => {
      if (registroCreado) {
        if (!registro) {
          this.values.unshift(registroCreado);
        } else {
          const indice = this.values.indexOf(registro);
          this.values[indice] = registroCreado;
        }
      }
    });
  }

  actualizarEstadoNombreModuloSistema(registro) {
    this.optionalParams = {registroActual: undefined};
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const habilitado = registro.habilitado ? false : true;
    this._modulosSistemaRestService
      .updateOne(registro.id, {habilitado})
      .subscribe(
        (registroActualizado: any) => {
          this._cargandoService.deshabilitarCargando();
          this.values[indice].habilitado = registroActualizado.habilitado;
          this._toasterService.pop(toastExitoEditar);
        },
        error => {
          console.error({
            error,
            mensaje: 'Error actualizando estado',
          });
          this._toasterService.pop(toastErrorEditar);
        },
      );
  }
}
