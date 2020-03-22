import {Component, OnInit} from '@angular/core';
import {PedidoCursoInterface} from '../../interfaces/pedido-curso.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {MatDialog} from '@angular/material/dialog';
import {PedidoCursoRestService} from '../../servicios/rest/pedido-curso-rest.service';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_SERVICIO_ESTABLECIMIENTO} from '../../../../../submodulo-empresa-front/modulos/servicio-establecimiento/rutas/definicion-rutas/definicion-rutas-servicio-establecimiento';
import {RUTAS_PEDIDO_CURSO} from '../definicion-rutas/rutas-pedido-curso';

@Component({
  selector: 'app-ruta-realizar-pedido',
  templateUrl: './ruta-realizar-pedido.component.html',
  styleUrls: ['./ruta-realizar-pedido.component.scss']
})
// tslint:disable-next-line:max-line-length
export class RutaRealizarPedidoComponent
  extends RutaConMigasDePanTablaBusqueda<PedidoCursoInterface,
    PedidoCursoRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {field: 'id', header: 'Acciones'},
  ];

  habilitar: boolean;
  idEmpresa: number;
  idCurso: number;
  idEstablecimiento: number;
  idHorario: number;


  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _RestService: PedidoCursoRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _RestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
    );
    //
    this.tipoBusqueda = 'findAll';
    this.queryParams.order = {
      id: 'DESC',
    };
  }

  ngOnInit() {
    this.habilitar = false;

    // this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(
      (parametros: {
        idEmpresa,
        idCurso,
        idEstablecimiento,
        idHorario
      }) => {
        this.idEmpresa = +parametros.idEmpresa;
        this.idCurso = +parametros.idCurso;
        this.idEstablecimiento = +parametros.idEstablecimiento;
        this.idHorario = +parametros.idHorario;

        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          // declarar rutas para migas de pan en orden
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.inicioModuloEmprsa(false, true),
          RUTAS_CURSO.rutaMenuMisCursos(false, true, [this.idEmpresa]),
          RUTAS_SERVICIO_ESTABLECIMIENTO.rutaMenuServicio(false, true, [this.idEmpresa, this.idCurso]),
// ARREGLAR CON HORARIO SERVICIOS!!!!!!!!
          // RUTAS_HORARIOS.rutaMenuHorario(false, true, [
          //   this.idEmpresa,
          //   this.idCurso,
          //   this.idEstablecimiento
          // ]),
          RUTAS_PEDIDO_CURSO.rutaRealizarPedido(false, true, [
            this.idEmpresa,
            this.idCurso,
            this.idEstablecimiento,
            this.idHorario
          ])
        ];
        this.habilitar = true;
        this.establecerMigas(rutas);
      }
    );
    this.queryParams.where = {};
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
// condicion where
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
      this.queryParams.where = {};
      // {
      //   // marca: `Like("%25${busqueda}%25")`,
      //
      // } ejemplo where con like
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  irA(rowData) {
    this._router.navigate([
      // rutas
    ]);
  }
}
