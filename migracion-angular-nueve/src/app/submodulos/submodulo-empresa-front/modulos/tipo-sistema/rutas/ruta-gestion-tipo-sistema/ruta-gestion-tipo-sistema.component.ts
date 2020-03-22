import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {MatDialog} from '@angular/material/dialog';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {CrearEditarTipoSistemaComponent} from '../../modales/crear-editar-tipo-sistema/crear-editar-tipo-sistema.component';
import {TipoSistemaInterface} from '../../interfaces/tipo-sistema.interface';
import {TipoSistemaRestService} from '../../servicios/tipo-sistema.service';
import {RUTAS_TIPO_SISTEMA} from '../definicion-rutas/rutas-tipo-sistema';

@Component({
  selector: 'app-ruta-gestion-tipo-sistema',
  templateUrl: './ruta-gestion-tipo-sistema.component.html',
  styleUrls: ['./ruta-gestion-tipo-sistema.component.scss']
})
export class RutaGestionTipoSistemaComponent
  extends RutaConMigasDePanTablaBusqueda<TipoSistemaInterface,
    TipoSistemaRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {field: 'tipo', header: 'Tipo'},
    {field: 'valor', header: 'Valor'},
    {field: 'id', header: 'Acciones'},
  ];
  habilitado: boolean;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _tipoSistemaRestService: TipoSistemaRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _tipoSistemaRestService,
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
 // #region: para activated
    this.ruta = RUTAS_TIPO_SISTEMA.rutaGestionTipoSistema(false, true, [
      // aqui ids si son necesarios
    ]).ruta;
    this.queryParams.where = {
    };
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_TIPO_SISTEMA.rutaGestionTipoSistema(false, true),
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
          tipo: `Like("%25${busqueda}%25")`,
        }
      ];
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  abrirModalCrearTipoSistema(registro?) {
    if (registro) {
      this.establecerRegistroActual(registro.id);
    }
    const dialogRef = this.dialog.open(CrearEditarTipoSistemaComponent, {
      width: '700px',
      data: {
        tipoSistema: registro,
       // mas campos que se manden al modal
      },
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: TipoSistemaInterface) => {
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
}

