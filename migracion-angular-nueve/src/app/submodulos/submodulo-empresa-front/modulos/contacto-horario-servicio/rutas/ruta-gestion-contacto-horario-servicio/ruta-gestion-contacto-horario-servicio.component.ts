import {Component, OnInit} from '@angular/core';
import {ContactoHorarioServicioInterface} from '../../interfaces/contacto-horario-servicio.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {ContactoHorarioServicioRestService} from '../../servicios/rest/contacto-horario-servicio.rest.service';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {MatDialog} from '@angular/material/dialog';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {ParametrosRutaContactoHorarioServicioInterface} from '../../interfaces/parametros-ruta-contacto-horario-servicio.interface';
import {RUTAS_SERVICIO_ESTABLECIMIENTO} from '../../../servicio-establecimiento/rutas/definicion-rutas/definicion-rutas-servicio-establecimiento';
import {RUTAS_CONTACTO_HORARIO_SERVICIO} from '../definicion-rutas/rutas-contacto-horario-servicio';
import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_EDIFICIO} from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import {RUTAS_ESTABLECIMIENTO} from '../../../establecimiento/rutas/definicion-rutas/rutas-establecimiento';
import {RUTAS_HORARIO_SERVICIO} from '../../../horario-servicio/rutas/definicion-rutas/rutas-horario-servicio';
import {ESTADOS} from '../../../../../../enums/estados';
import {RUTAS_DATOS_CONTACTO} from '../../../datos-contacto/rutas/definicion-rutas/rutas-datos-contacto';
import {ModalSeleccionarContactoEmpresaComponent} from '../../../contacto-empresa/modales/modal-seleccionar-contacto-empresa/seleccionar-contacto-empresa/modal-seleccionar-contacto-empresa.component';
import {traducirColumnas} from '../../../../../../funciones/traducir-columnas';
import {TranslocoService} from '@ngneat/transloco';
import {RUTA_TRADUCCION_CONTACTO_HORARIO_SERVICIO} from '../../constantes/ruta-traducción-contacto-horario-servicio';
import {crearToasterGeneral} from '../../../../../submodulo-certificados-cursos-frontend/funciones/crear-toaster-general';

@Component({
  selector: 'app-ruta-gestion-contacto-horario-servicio',
  templateUrl: './ruta-gestion-contacto-horario-servicio.component.html',
  styleUrls: ['./ruta-gestion-contacto-horario-servicio.component.scss']
})

export class RutaGestionContactoHorarioServicioComponent
  extends RutaConMigasDePanTablaBusqueda<ContactoHorarioServicioInterface,
    ContactoHorarioServicioRestService,
    ToasterService>
  implements OnInit {

  habilitar: boolean;
  idEmpresa: number;
  idEdificio: number;
  idEstablecimiento: number;
  idServicio: number;
  idHorarioServicio: number;

  columnas = [
    {
      field: 'contactoEmpresa.datosUsuario.nombres',
      header: 'Nombre',
      llaveATraducir: 'nombres',
      traduccion: ''
    },
    {
      field: 'contactoEmpresa.datosUsuario.apellidos',
      header: 'Apellido',
      llaveATraducir: 'apellidos',
      traduccion: '',
    },
    {
      field: 'contactoEmpresa.datosUsuario.identificacionPais',
      header: 'Identificación',
      llaveATraducir: 'identificacionPais',
      traduccion: '',
    },
    {
      field: 'contactoEmpresa.tipoCargo.nombre',
      header: 'Cargo',
      llaveATraducir: 'tipoCargo',
      traduccion: '',
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
  rutaConTraduccion = RUTA_TRADUCCION_CONTACTO_HORARIO_SERVICIO;


  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _contactoHorarioServicioRestService: ContactoHorarioServicioRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    protected readonly _translocoService: TranslocoService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _contactoHorarioServicioRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      _translocoService,
      RUTA_TRADUCCION_CONTACTO_HORARIO_SERVICIO
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

    // cargar con activated route y setear el habilitar
    this._activatedRoute.params.subscribe(
      (parametros: ParametrosRutaContactoHorarioServicioInterface) => {
        this.idEmpresa = +parametros.idEmpresa;
        this.idEdificio = +parametros.idEdificio;
        this.idEstablecimiento = +parametros.idEstablecimiento;
        this.idServicio = +parametros.idServicio;
        this.idHorarioServicio = +parametros.idHorarioServicio;
        this.ruta = this.setearRuta().ruta;

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
          RUTAS_HORARIO_SERVICIO.rutaGestionHorario(false, true, [
            this.idEmpresa,
            this.idEdificio,
            this.idEstablecimiento,
            this.idServicio,
          ]),
          RUTAS_CONTACTO_HORARIO_SERVICIO.rutaGestionContactoHorarioServicio(false, true, [
            this.idEmpresa,
            this.idEdificio,
            this.idEstablecimiento,
            this.idServicio,
            this.idHorarioServicio,
          ])
        ];
        this.habilitar = true;
        this.establecerMigas(rutas);
        this._cargandoService.deshabilitarCargando();
      }
    );
    this.queryParams.where = {
      horarioServicio: {id: this.idHorarioServicio},
      contactoEmpresa: {
        datosUsuario: {},
        tipoCargo: {},
        empresa: {id: this.idEmpresa}
      }
    };
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
  }
  establecerTraduccion() {
    // traducirColumnas(this._translocoService, this.rutaTraduccion + '.tablas', this.columnas);
  }

  setearRuta(): MigaDePanInterface {
    return RUTAS_CONTACTO_HORARIO_SERVICIO
      .rutaGestionContactoHorarioServicio(
        false,
        true,
        [
          this.idEmpresa,
          this.idEdificio,
          this.idEstablecimiento,
          this.idServicio,
          this.idHorarioServicio,
        ]
      );
  }

  buscarPorNombreoApellido(busqueda: string) {
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
        horarioServicio: {id: this.idHorarioServicio},
        contactoEmpresa: {
          datosUsuario: {},
          tipoCargo: {},
          empresa: {id: this.idEmpresa}
        }
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
        horarioServicio: {id: this.idHorarioServicio},
        contactoEmpresa: {
          datosUsuario: {
            nombres: `Like(\"%25${busqueda}%25\")`,
            apellidos: `Like(\"%225${busqueda}%25\")`,
            mlabOr: true,
          },
          tipoCargo: {},
          empresa: {id: this.idEmpresa}
        }
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  escucharEstadoSeleccionado(eventoEstado: ESTADOS.Activo | ESTADOS.Inactivo) {
    this.buscarPorEstadoTipo(eventoEstado, 'habilitado');
  }

  escucharTipoCargoSeleccionado(eventoTipoCargo: number) {
    this.buscarPorEstadoTipo(eventoTipoCargo, 'tipoCargo');
  }

  buscarPorEstadoTipo(
    busqueda: number,
    camposABuscar: 'habilitado' | 'tipoCargo'
  ) {
    this.queryParams.where = {
      horarioServicio: {id: this.idHorarioServicio},
      contactoEmpresa: {
        empresa: { id: this.idEmpresa},
        tipoCargo: {id: camposABuscar === 'tipoCargo' ? busqueda : undefined},
        datosUsuario: {},
      },
      habilitado: camposABuscar === 'habilitado' ? busqueda : undefined,
    };
    this.tipoBusqueda = 'findAll';
    this.queryParams.skip = 0;
    this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
  }

  desasignarContactoHorarioServicio(registro: ContactoHorarioServicioInterface) {
    this._cargandoService.habilitarCargando();
    const indiceContactoHS = this.values.indexOf(registro);
    this._contactoHorarioServicioRestService.deleteOne(
      registro.id
    ).subscribe(
      () => {
        this.values.splice(indiceContactoHS, 1);
        this._toasterService.pop(
          crearToasterGeneral(this._translocoService, 'success', 'generales.toasters.toastExitoEliminarVacio')
        );
        this._cargandoService.deshabilitarCargando();
      }, error => {
        console.error(
          {
            error,
            mensaje: 'Error al desasignar el contacto empresa',
            data: {
              contactoHorarioServicio: registro
            }
          }
        );
        this._toasterService.pop(
          crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorEliminarVacio')
        );
        this._cargandoService.deshabilitarCargando();
      }
    );
  }

  abrirModalCrearContactoHorarioServicio() {
    const dialogRef = this.dialog.open(ModalSeleccionarContactoEmpresaComponent, {
      width: '500px',
      data: {
        idEmpresa: this.idEmpresa,
        contactosEnTabla: this.values,
        idServicio: this.idHorarioServicio
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((contactoEmpresaCreado) => {
        if (contactoEmpresaCreado) {
          contactoEmpresaCreado.forEach(
            contacto => {
              this.values.unshift(contacto);
            }
          );
        }
      }, error => {
        console.error(
          {
            error,
            mensaje: 'Error con el modal para crear un contacto empresa',
            data: {
              idEmpresa: this.idEmpresa
            }
          }
        );
      },
    );
  }


  irGestionModuloHijo(idContactoEmpresa: number) {
    const rutaDatosContactoCertificado = RUTAS_DATOS_CONTACTO.rutaGestionDatosContactoCertificado(
      false,
      true,
      [
        this.idEmpresa,
        this.idEdificio,
        this.idEstablecimiento,
        this.idServicio,
        this.idHorarioServicio,
        idContactoEmpresa,
      ]
    ).ruta;
    this._router.navigate(rutaDatosContactoCertificado);
  }

  actualizarEstado(registro: ContactoHorarioServicioInterface) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const habilitado = registro.habilitado ? ESTADOS.Inactivo : ESTADOS.Activo;
    this._contactoHorarioServicioRestService
      .updateOne(registro.id, {'habilitado': habilitado})
      .subscribe(
        () => {
          this.values[indice].habilitado = habilitado;
          this._toasterService.pop(
            crearToasterGeneral(this._translocoService, 'success', 'generales.toasters.toastExitoEditarVacio')
          );
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          console.error(
            {
              error,
              mensaje: 'Error al editar el estado del contacto empresa',
              data: {
                contactoHorarioServicio: registro.id,
                habilitado
              }
            }
          );
          this._toasterService.pop(
            crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorEditarVacio')
          );
          this._cargandoService.deshabilitarCargando();
        },
      );
  }
}

