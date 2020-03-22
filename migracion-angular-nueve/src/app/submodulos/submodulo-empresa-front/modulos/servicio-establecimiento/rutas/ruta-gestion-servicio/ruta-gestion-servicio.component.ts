import {Component, OnInit} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {Toast, ToasterService} from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService, SelectEstadoComponent} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_EDIFICIO} from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import {RUTAS_ESTABLECIMIENTO} from '../../../establecimiento/rutas/definicion-rutas/rutas-establecimiento';
import {RUTAS_PEDIDO_CURSO} from '../../../../../submodulo-certificados-cursos-frontend/modulos/pedido/rutas/definicion-rutas/rutas-pedido-curso';
import {ServicioRestService} from '../../servicios/rest/servicios.rest.service';
import {RUTAS_SERVICIO_ESTABLECIMIENTO} from '../definicion-rutas/definicion-rutas-servicio-establecimiento';
import {ESTADOS} from '../../../../../../enums/estados';
import {CrearEditarServicioEstablecimientoComponent} from '../../modales/modal-articulo-servicio/crear-editar-servicio-establecimiento/crear-editar-servicio-establecimiento.component';
import {ServicioEstablecimientoInterface} from '../../interfaces/servicio-establecimiento.interface';
import {MostrarArticuloComponent} from '../../modales/modal-mostrar-articulo/mostrar-articulo/mostrar-articulo.component';
import {RUTAS_HORARIO_SERVICIO} from '../../../horario-servicio/rutas/definicion-rutas/rutas-horario-servicio';
import {ModalListarPreciosComponent} from '../../../precio/modales/modal-listar-precios/modal-listar-precios/modal-listar-precios.component';
import {RUTA_TRADUCCION_GESTION_SERVICIO_ESTABLECIMIENTO} from '../../constantes/rutas-traduccion-servicio-establecimiento';
import {TranslocoService} from '@ngneat/transloco';
import {MensajesToasterInterface} from '../../../../../../interfaces/mensajesToaster.Interface';


@Component({
  selector: 'app-ruta-gestion-servicio',
  templateUrl: './ruta-gestion-servicio.component.html',
  styleUrls: ['./ruta-gestion-servicio.component.scss']
})
// tslint:disable-next-line:max-line-length
export class RutaGestionServicioComponent
  extends RutaConMigasDePanTablaBusqueda<ServicioEstablecimientoInterface,
    ServicioRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {
      field: 'articuloPorEmpresa.articulo.nombre',
      header: 'Nombre',
      llaveATraducir: 'nombre',
      traduccion: '',
    },
    {
      field: 'articuloPorEmpresa.articulo.nombreCorto',
      header: 'Nombre corto',
      llaveATraducir: 'nombreCorto',
      traduccion: '',
    },
    {
      field: 'precio',
      header: 'Precio',
      llaveATraducir: 'precio',
      traduccion: '',
    },
    {
      field: 'habilitado',
      header: 'Estado',
      llaveATraducir: 'habilitado',
      traduccion: '',
    },
    {
      field: 'id',
      header: 'Acciones',
      llaveATraducir: 'acciones',
      traduccion: '',
    },
  ];

  habilitar: boolean;
  idEmpresa: number;
  idEdificio: number;
  idEstablecimiento: number;
  estados: ESTADOS;
  estadoSeleccionado: number;
  traduccionesToaster: MensajesToasterInterface;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _servicioEstablecimientoRestService: ServicioRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    protected _translocoService: TranslocoService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _servicioEstablecimientoRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      _translocoService,
      RUTA_TRADUCCION_GESTION_SERVICIO_ESTABLECIMIENTO,
    );
    //
    this.tipoBusqueda = 'findAll';
    this.queryParams.order = {
      id: 'DESC',
    };
    this.traducirColumnas('tablas');
  }

  ngOnInit() {
    this.habilitar = false;
    this._cargandoService.habilitarCargando();
    this._translocoService.selectTranslateObject('generales.toasters').subscribe(
      (traduccion) => {
        this.traduccionesToaster = traduccion;
      }
    );
    this._activatedRoute.params.subscribe(
      (parametros: { idEmpresa: string, idEdificio: string, idEstablecimiento: string }) => {
        this.idEmpresa = +parametros.idEmpresa;
        this.idEdificio = +parametros.idEdificio;
        this.idEstablecimiento = +parametros.idEstablecimiento;
        this.ruta = RUTAS_SERVICIO_ESTABLECIMIENTO.rutaGestionServicio(
          false,
          true,
          [
            this.idEmpresa,
            this.idEdificio,
            this.idEstablecimiento,
          ]
        ).ruta;
        this.habilitar = true;
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          // declarar rutas para migas de pan en orden
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_EDIFICIO.rutaGestionEdificio(false, true, [
            this.idEmpresa
          ]),
          RUTAS_ESTABLECIMIENTO.rutaGestionEstablecimiento(false, true, [
            this.idEmpresa,
            this.idEdificio
          ]),
          RUTAS_SERVICIO_ESTABLECIMIENTO.rutaGestionServicio(false, true,
            [
              this.idEmpresa,
              this.idEdificio,
              this.idEstablecimiento,
            ]),
        ];
        this.habilitar = true;
        this.establecerMigas(rutas);
      }
    );
    this.queryParams.where = {
      'establecimiento': {'id': this.idEstablecimiento},
      'articuloPorEmpresa': {
        'articulo': {'esServicio': true},
        // 'precios': {'esPrincipal': true}
      }
    };
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
  }

  buscarPorIdentificadorONombre(busqueda: string) {
    if (busqueda === '') {
      this.queryParams.where = {
        'establecimiento': {'id': this.idEstablecimiento},
        'articuloPorEmpresa': {
          'articulo': {}
        }
      };
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    } else {
      this.queryParams.where = {
        'establecimiento': {'id': this.idEstablecimiento},
        'articuloPorEmpresa': {
          'articulo': {
            'nombre': `Like(\"%25${busqueda}%25\")`,
            'nombreCorto': `Like(\"%25${busqueda}%25\")`,
            'mlabOr': true,
          }
        }
      };
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }


  abrirModalCrearServicio() {
    const dialogRef = this.dialog.open(CrearEditarServicioEstablecimientoComponent, {
      width: '800px',
      data: {
        idEmpresa: this.idEmpresa,
        idEstablecimiento: this.idEstablecimiento,
        articulosEnTabla: this.values,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registrosCreado) => {
        if (registrosCreado) {
          registrosCreado.forEach(
            servicioEstablecimiento => {
              this.values.unshift(servicioEstablecimiento);
              const indice = this.values.indexOf(servicioEstablecimiento);
              this.values[indice].id = servicioEstablecimiento.id;
            }
          );
        }
      }
    );
  }

  irAGestionModuloHijo(idServicio: number, moduloHijo: string, gestionHijo: string) {
    let ruta;
      if (moduloHijo === 'horarioServicio') {
        ruta = RUTAS_HORARIO_SERVICIO.rutaGestionHorario(
          false,
          true,
          [
            this.idEmpresa,
            this.idEdificio,
            this.idEstablecimiento,
            idServicio,
          ]).ruta;
      }
      if (moduloHijo === 'pedidoCurso') {
        ruta = RUTAS_PEDIDO_CURSO.rutaGestionPedidoCurso(
          false,
          true,
          [
            this.idEmpresa,
            this.idEdificio,
            this.idEstablecimiento,
            idServicio,
          ]).ruta;
      }
    this._router.navigate(ruta);
  }

  actualizarEstado(servicio: ServicioEstablecimientoInterface) {
    const habilitado = servicio.habilitado === ESTADOS.Inactivo ? 1 : 0;
    const servicioEnArreglo = this.values.find(
      servicioArreglo => servicio.id === servicioArreglo.id,
    );
    const indiceServicio = this.values.indexOf(servicioEnArreglo);
    this._servicioEstablecimientoRestService.updateOne(servicio.id, {'habilitado': habilitado}).subscribe(
      (respuesta) => {
        this.values[indiceServicio].habilitado = habilitado
          ? ESTADOS.Activo
          : ESTADOS.Inactivo;
      },
      error => {
        console.error(error);
        this._toasterService.pop(this.traduccionesToaster.toastErrorEditarVacio as Toast);
      },
    );
  }

  abrirModalVerMas(servicio) {
    this.establecerRegistroActual(servicio.id);
    const dialogRef = this.dialog.open(MostrarArticuloComponent, {
      width: '800px',
      data: {articulo: servicio.articuloPorEmpresa.articulo},
    });
    dialogRef.afterClosed().subscribe(
      () => {},
        error => {
        console.error({'mensaje': error});
        this._toasterService.pop(this.traduccionesToaster.toastErrorMostrarVacio as Toast);
      }
    );
  }

  escucharEstadoSeleccionado(eventoEstado: ESTADOS.Activo | ESTADOS.Inactivo, busqueda: string) {
    if (busqueda !== null) {
      this.queryParams.where = {
        habilitado: eventoEstado,
        'establecimiento': {'id': this.idEstablecimiento},
        'articuloPorEmpresa': {
          'articulo': {
            'nombre': `Like(\"%25${busqueda}%25\")`,
            'nombreCorto': `Like(\"%25${busqueda}%25\")`,
            'mlabOr': true,
          },
        }
      };
    } else {
      this.queryParams.where = {
        habilitado: eventoEstado,
        'establecimiento': {'id': this.idEstablecimiento},
        'articuloPorEmpresa': {
          'articulo': {},
        }
      };
    }
    this.tipoBusqueda = 'findAll';
    this.queryParams.skip = 0;
    this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
  }

  abrirModalPrecio(servicio: ServicioEstablecimientoInterface | any) {
    const indiceRegistro = this.values.indexOf(servicio);
    this.establecerRegistroActual(servicio.id);
    const dialogRef = this.dialog.open(ModalListarPreciosComponent, {
      width: '800px',
      data: {
        idArticuloEmpresa: servicio.articuloPorEmpresa.id,
        precioActual: servicio,
        idServicioEstablecimiento: servicio.id
      },
    });
    dialogRef.afterClosed()
      .subscribe(
        (servicioEstablecimiento: ServicioEstablecimientoInterface) => {
          this.values[indiceRegistro].precio = servicioEstablecimiento.precio;
        }, error => {
          console.error({mensaje: 'Error en la lista de precios', error});
          this._toasterService.pop(this.traduccionesToaster.toastErrorMostrarVacio as Toast);
        }
      );
  }
}

// http://localhost:4200/empresa-modulo/1/edificio-modulo/1/establecimiento-modulo/4/servicio-modulo/gestion-servicio
