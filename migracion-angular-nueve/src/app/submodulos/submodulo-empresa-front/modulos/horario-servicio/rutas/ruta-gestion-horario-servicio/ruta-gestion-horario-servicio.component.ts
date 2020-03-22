import {Component, OnInit} from '@angular/core';
import {HorarioServicioInterface} from '../../interfaces/horario-servicio.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {HorarioServicioRestService} from '../../servicios/rest/horario-servicio.rest.service';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material/dialog';
import {RUTAS_HORARIO_SERVICIO} from '../definicion-rutas/rutas-horario-servicio';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_EDIFICIO} from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import {RUTAS_ESTABLECIMIENTO} from '../../../establecimiento/rutas/definicion-rutas/rutas-establecimiento';
import {RUTAS_SERVICIO_ESTABLECIMIENTO} from '../../../servicio-establecimiento/rutas/definicion-rutas/definicion-rutas-servicio-establecimiento';
import {ESTADOS} from '../../../../../../enums/estados';
import {CrearEditarHorarioComponent} from '../../../../../submodulo-menu-front/modulos/horario/modales/modal-crear-editar-horario/modal-crear-editar-horario/crear-editar-horario.component';
import {HorarioInterface} from '../../../../../submodulo-menu-front/modulos/horario/interfaces/horario.interface';
import {ParametrosRutaGestionHorarioServicioInterface} from '../../interfaces/parametros-ruta-gestion-horario-servicio.interface';
import {RUTAS_CONTACTO_HORARIO_SERVICIO} from '../../../contacto-horario-servicio/rutas/definicion-rutas/rutas-contacto-horario-servicio';
import {TranslocoService} from '@ngneat/transloco';
import {crearToasterGeneral} from '../../../../../submodulo-certificados-cursos-frontend/funciones/crear-toaster-general';
import {RUTA_TRADUCCION_HORARIO_SERVICIO} from '../../constantes/ruta-traduccion-horario-servicio';

@Component({
  selector: 'app-ruta-gestion-horario-servicio',
  templateUrl: './ruta-gestion-horario-servicio.component.html',
  styleUrls: ['./ruta-gestion-horario-servicio.component.scss']
})

export class RutaGestionHorarioServicioComponent
  extends RutaConMigasDePanTablaBusqueda<HorarioServicioInterface,
    HorarioServicioRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {
      field: 'horario.descripcion',
      header: 'Descripcion',
      llaveATraducir: 'descripcion',
      traduccion: ''
    },
    {
      field: 'habilitado',
      header: 'Estado',
      llaveATraducir: 'habilitado',
      traduccion: ''
    },
    {
      field: 'id',
      header: 'Acciones',
      llaveATraducir: 'acciones',
      traduccion: ''
    },
  ];

  habilitar: boolean;
  idEmpresa: number;
  idEdificio: number;
  idEstablecimiento: number;
  idServicio: number;
  rutaTraduccion = RUTA_TRADUCCION_HORARIO_SERVICIO;


  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _horarioServicioRestService: HorarioServicioRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    protected readonly _translocoService: TranslocoService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _horarioServicioRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      _translocoService,
      RUTA_TRADUCCION_HORARIO_SERVICIO,
    );
    //
    this.tipoBusqueda = 'findAll';
    this.queryParams.order = {
      id: 'DESC',
    };
    this.traducirColumnas('tablas');
  }

  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this.habilitar = false;
    this._activatedRoute.params
      .subscribe(
      (parametros: ParametrosRutaGestionHorarioServicioInterface) => {
        this.idEmpresa = +parametros.idEmpresa;
        this.idEdificio = +parametros.idEdificio;
        this.idEstablecimiento = +parametros.idEstablecimiento;
        this.idServicio = +parametros.idServicio;
        this.ruta = this.setearRuta().ruta;
        const rutas = this.construirMigasDePan();
        this.setearValoresQueryParams();
        this.establecerMigas(rutas);
        this.escucharCambiosEnQueryParams();
        this.escucharCambiosEnParametros();

        this.habilitar = true;
      }
    );
    this._cargandoService.deshabilitarCargando();
  }

  construirMigasDePan(): MigaDePanInterface[] {
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      // declarar rutas para migas de pan en orden
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
      RUTAS_EDIFICIO.rutaGestionEdificio(false, true, [
        this.idEmpresa
      ]),
      RUTAS_ESTABLECIMIENTO.rutaGestionEstablecimiento(false, true, [
        this.idEmpresa,
        this.idEdificio]),
      RUTAS_SERVICIO_ESTABLECIMIENTO.rutaGestionServicio(false, true, [
        this.idEmpresa,
        this.idEdificio,
        this.idEstablecimiento,
      ]),
      RUTAS_HORARIO_SERVICIO.rutaGestionHorario(false, true, [
        this.idEmpresa,
        this.idEdificio,
        this.idEstablecimiento,
        this.idServicio]),
    ];
    return rutas;
  }
  setearRuta(): MigaDePanInterface {
    return  RUTAS_HORARIO_SERVICIO.rutaGestionHorario(
      false,
      true,
      [
        this.idEmpresa,
        this.idEdificio,
        this.idEstablecimiento,
        this.idServicio
      ]);
  }

  setearValoresQueryParams() {
    if (!this.queryParams.where) {
      this.queryParams.where = {
        'horario': {},
        'servicioPorEstablecimiento': {'id': this.idServicio}
      };
    }
  }

  buscarPorIdentificadorONombre(busqueda: string) {
    busqueda = busqueda.trim();
    if (busqueda === '') {
      this.queryParams.relations = [];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
        'horario': {},
        'servicioPorEstablecimiento': {'id': this.idServicio}
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
        'horario': {
          'descripcion': [
            `Like("%25${busqueda}%25")`
          ]
        },
        'servicioPorEstablecimiento': {'id': this.idServicio}
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  abrirModalCrearHorarioServicio() {
    const dialogRef = this.dialog.open(CrearEditarHorarioComponent, {
      width: '1000px',
      data: {
        horario: undefined,
        idEmpresa: this.idEmpresa,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: HorarioInterface) => {
        if (registroCreado) {
          this._cargandoService.habilitarCargando();
          const horarioServicioCrear: HorarioServicioInterface = {
            habilitado: 1,
            horario: registroCreado,
            servicioPorEstablecimiento: +this.idServicio
          };
          this._horarioServicioRestService.create(horarioServicioCrear)
            .subscribe(
              respuesta => {
                this._toasterService.pop(
                  crearToasterGeneral(
                    this._translocoService, 'success', 'generales.toasters.toastExitoCrearVacio'
                  )
                );
                this._cargandoService.deshabilitarCargando();
                this.values.unshift(respuesta);
              },
              error => {
                console.error({mensaje: 'Error creando', error});
                this._toasterService.pop(
                  crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorCrearVacio')
                );
                this._cargandoService.deshabilitarCargando();
              }
            );
        }
      },
      error => {
        console.error({mensaje: 'Error modal', error});
        this._toasterService.pop(
          crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorCrearVacio')
        );
      }
    );
  }

  EditarHorario(registro: HorarioServicioInterface) {
    const indiceRegistro = this.values.indexOf(registro);
    this.establecerRegistroActual(registro.id);
    const dialogRef = this.dialog.open(CrearEditarHorarioComponent, {
      width: '1000px',
      data: {
        horario: registro.horario,
        idEmpresa: this.idEmpresa,
      },
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroEditado: HorarioInterface) => {
        if (registroEditado) {
          this._cargandoService.habilitarCargando();
          this._toasterService.pop(
            crearToasterGeneral(this._translocoService, 'success', 'generales.toasters.toastExitoEditarVacio')
          );
          this._cargandoService.deshabilitarCargando();
        }
      },
      error => {
        console.error({mensaje: 'Error actualizando', error});
        this._toasterService.pop(
          crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorEditarVacio')
        );
        this._cargandoService.deshabilitarCargando();
      }
    );
  }

  irAGestionModuloHijo(idHorarioServicio: HorarioServicioInterface) {
    const rutaContactoEmpresa = RUTAS_CONTACTO_HORARIO_SERVICIO.rutaGestionContactoHorarioServicio(false, true, [
      this.idEmpresa,
      this.idEdificio,
      this.idEstablecimiento,
      this.idServicio,
      idHorarioServicio
    ]).ruta;
    this._router.navigate(rutaContactoEmpresa);
  }

  actualizarEstado(horarioServicio: HorarioServicioInterface) {
    const habilitado = horarioServicio.habilitado === ESTADOS.Inactivo ? 1 : 0;
    const servicioEnArreglo = this.values.find(
      servicioArreglo => horarioServicio.id === servicioArreglo.id,
    );
    const indiceServicio = this.values.indexOf(servicioEnArreglo);
    this._horarioServicioRestService.updateOne(horarioServicio.id, {'habilitado': habilitado}).subscribe(
      () => {
        this.values[indiceServicio].habilitado = habilitado
          ? ESTADOS.Activo
          : ESTADOS.Inactivo;
      },
      error => {
        console.error({mensaje: 'Error editando', error});
        this._toasterService.pop(
          crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorEditarVacio')
        );
      },
    );
  }

  escucharEstadoSeleccionado(eventoEstado: ESTADOS.Activo | ESTADOS.Inactivo, busqueda) {
    if (busqueda !== null) {
      this.queryParams.where = {
        habilitado: eventoEstado,
        'horario': {
          'descripcion': [
            `Like("%25${busqueda}%25")`
          ]
        },
        'servicioPorEstablecimiento': {'id': this.idServicio}
      };
    } else {
      this.queryParams.where = {
        habilitado: eventoEstado,
        'horario': {},
        'servicioPorEstablecimiento': {'id': this.idServicio}
      };
    }
    this.tipoBusqueda = 'findAll';
    this.queryParams.skip = 0;
    this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
  }
}
