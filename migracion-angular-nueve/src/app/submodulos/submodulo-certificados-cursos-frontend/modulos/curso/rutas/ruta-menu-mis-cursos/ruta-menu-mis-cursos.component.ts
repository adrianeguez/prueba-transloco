import { Component, OnInit } from '@angular/core';
import { MigaDePanInterface, RutaConMigasDePanTablaBusqueda } from '@manticore-labs/ng-api';
import { ActivatedRoute, Router } from '@angular/router';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { RUTAS_CLIENTE } from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';
import { RUTAS_CURSO } from '../definicion-rutas/definicion-rutas-curso';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from 'angular2-toaster';
import { CursoUsuarioRestService } from '../../servicios/rest/curso-usuario.rest.service';
import { CursoUsuarioInterface } from '../../interfaces/curso-usuario.interface';
import { Auth0Service } from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';
import { RUTAS_MODULO_CURSO } from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import { RUTAS_SERVICIO_ESTABLECIMIENTO } from '../../../../../submodulo-empresa-front/modulos/servicio-establecimiento/rutas/definicion-rutas/definicion-rutas-servicio-establecimiento';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { TranslocoService } from '@ngneat/transloco';
import { MapaEstablecimientosComponent } from '../../modales/mapa-establecimientos/mapa-establecimientos.component';
import { InicializarMapa } from '../../../../../../compartido/mapa-modulo/servicios/open-layers/interfaces/inicializar-mapa';
import { LocalizacionRestService } from '../../../../../../compartido/mapa-modulo/servicios/rest/localizacion-rest.service';
import { ServicioRestService } from 'src/app/submodulos/submodulo-empresa-front/modulos/servicio-establecimiento/servicios/rest/servicios.rest.service';
import { CursoInterface } from '../../interfaces/curso.interface';
import { EdificioLocalizacionInterface } from 'src/app/compartido/mapa-modulo/interfaces/edificions.localizacion.interface';

@Component({
  selector: 'app-ruta-menu-mis-cursos',
  templateUrl: './ruta-menu-mis-cursos.component.html',
  styleUrls: ['./ruta-menu-mis-cursos.component.scss']
})
export class RutaMenuMisCursosComponent
  extends RutaConMigasDePanTablaBusqueda<CursoUsuarioInterface,
  CursoUsuarioRestService,
  ToasterService>
  implements OnInit {
  columnas = [
    {
      field: 'curso.nombre',
      header: 'Nombre',
      llaveATraducir: 'nombre',
      traduccion: ''
    },
    {
      field: 'curso.descripcion',
      header: 'Descripcion',
      llaveATraducir: 'descripcion',
      traduccion: ''
    },
    {
      field: 'progreso',
      header: 'Progreso',
      llaveATraducir: 'progreso',
      traduccion: ''
    },
    {
      field: 'estado',
      header: 'Estado',
      llaveATraducir: 'estado',
      traduccion: ''
    },
    {
      field: 'id',
      header: 'Acciones',
      llaveATraducir: 'acciones',
      traduccion: ''
    }];
  rutaTraduccion: string;
  idUsuario: number;
  habilitar: boolean;
  configuracionMapa: InicializarMapa = {
    latitud: 0,
    longitud: 0,
    zoom: 14,
    tipo: 'Point',
    nombreMapa: 'mapa',
    intervalo: '3000',
    imagenPuntoUsuario: false,
    mostrarEscala: true,
    mostrarPuntoUsuario: false,
    mostrarIrAPuntoUsuario: true,
    mostrarBarraEdicion: false,
    configuracionBarraEdicion: {
      Offset: false,
      DrawPolygon: false,
      DrawPoint: false,
      DrawLine: false,
      Info: false,
      Split: false,
      FillAttribute: false,
      DrawRegular: false,
      DrawHole: false,
      Delete: false,
      Select: false,
      Transform: false,
      Undo: false,
      Redo: false,
    }
  };

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _cursoUsuarioRestService: CursoUsuarioRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
    private readonly _auth0Service: Auth0Service,
    protected translocoService: TranslocoService,
    protected _localizacionRestService: LocalizacionRestService,
    private readonly _servicioEstablecimiento: ServicioRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _cursoUsuarioRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      translocoService,
      'submoduloCertificadosCuros.moduloCurso.rutas.rutaMisCursos'
    );
    //
    this.tipoBusqueda = 'findAll';
    this.queryParams.order = {
      id: 'DESC',
    };
    this.idUsuario = +this._auth0Service.empresasEnLasQueTrabaja[0].datoUsuario.id;
    this.traducirColumnas('tablas');
  }

  ngOnInit() {
    this.habilitar = false;
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(
      () => {
        this.ruta = RUTAS_CURSO.rutaMenuMisCursos(
          false,
          true,
          []).ruta;
        this.habilitar = true;
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          // declarar rutas para migas de pan en orden
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_CLIENTE.rutaInicio(false, true),
          RUTAS_CURSO.rutaMenuInicioUsuarioCurso(false, true),
          RUTAS_CURSO.rutaMenuMisCursos(false, true),
        ];
        this.establecerMigas(rutas);
      }
    );
    this.queryParams.where = {
      curso: {},
      datosUsuario: { id: this.idUsuario },
    };
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
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
        curso: {
          nombre: `Like(\"%25${busqueda}%25\")`
        },
        datosUsuario: { id: this.idUsuario },
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
      this.queryParams.where = {
        curso: {
          nombre: `Like(\"%25${busqueda}%25\")`
        },
        datosUsuario: { id: this.idUsuario },
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  irA(rowData) {
    const rutaModuloCurso = RUTAS_MODULO_CURSO.rutaMenuModuloCurso(
      false,
      true,
      [
        rowData.id, // idCurso
      ]
    ).ruta;
    this._router.navigate(
      rutaModuloCurso,
    );
  }

  irAEstablecimientos(rowData) {
    const rutaEstablecimientosCurso = RUTAS_SERVICIO_ESTABLECIMIENTO.rutaEstablecimientosCurso(
      false,
      true,
      [
        rowData.curso.id // idCurso
      ]
    ).ruta;
    this._router.navigate(
      rutaEstablecimientosCurso,
    );
  }

  abrirCertificado(rowData) {
    // console.log('valores', this.values);
  }


  abrirModalMapa(cursoUsuario: CursoUsuarioInterface) {
    const indiceRegistro = this.values.indexOf(cursoUsuario);
    const curso = cursoUsuario.curso as CursoInterface;
    this._cargandoService.habilitarCargando();
    const consulta$ = this._servicioEstablecimiento.obtenerEdificionLocalizacionPorCurso(curso.id);
    consulta$
      .subscribe(
        (edificios: EdificioLocalizacionInterface[]) => {
          this._cargandoService.deshabilitarCargando();
          this.configuracionMapa.edificios = edificios;
          const dialogRef = this.dialog.open(
            MapaEstablecimientosComponent,
            {
              width: '900px',
              data: {
                configuracionMapa: this.configuracionMapa,
                idCurso: curso.id,
              }
            }
          );
        }
      );
  }
}

