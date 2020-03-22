import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute, Router} from '@angular/router';
import {DatosContactoRestService} from '../../../../servicios/rest/datos-contacto-rest.service';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_CONTACTO_EMPRESA} from '../../../contacto-empresa/rutas/definicion-rutas/rutas-contacto-empresa';
import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_DATOS_CONTACTO} from '../definicion-rutas/rutas-datos-contacto';
import {CrearEditarDatosContactoComponent} from '../../modales/crear-editar-datos-contacto/crear-editar-datos-contacto.component';
import {OPCIONES_FILTER_ES_PRINCIPAL} from '../../constantes/opciones-filter-es-percha';
import {DatosContactoInterface} from '../../../../interfaces/datos-contacto.interface';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {
  toastErrorConexionServidor,
  toastErrorCrear,
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import {ESTADOS} from '../../../../../../enums/estados';
import {WIDTH_MODAL_DATOS_CONTACTO} from '../../constantes/tamanio-modal-datos-contacto';
import {ContactoEmpresaRestService} from '../../../../servicios/rest/contacto-empresa-rest.service';
import {DatosUsuarioInterface} from '../../../../interfaces/datos-usuario.interface';
import {mergeMap} from 'rxjs/operators';
import {ParametrosRutaGestionDatosContactoInterface} from '../../interfaces/parametros-ruta-gestion-datos-contacto.interface';
import {ContactoEmpresaInterface} from '../../../../interfaces/contacto-empresa.interface';
import {LazyLoadEvent} from 'primeng/api';
import {RUTAS_EDIFICIO} from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import {RUTAS_ESTABLECIMIENTO} from '../../../establecimiento/rutas/definicion-rutas/rutas-establecimiento';
import {RUTAS_SERVICIO_ESTABLECIMIENTO} from '../../../servicio-establecimiento/rutas/definicion-rutas/definicion-rutas-servicio-establecimiento';
import {RUTAS_HORARIO_SERVICIO} from '../../../horario-servicio/rutas/definicion-rutas/rutas-horario-servicio';
import {RUTAS_CONTACTO_HORARIO_SERVICIO} from '../../../contacto-horario-servicio/rutas/definicion-rutas/rutas-contacto-horario-servicio';

@Component({
  selector: 'ml-gestion-datos-contacto',
  templateUrl: './ruta-gestion-datos-contacto.component.html',
  styleUrls: ['./ruta-gestion-datos-contacto.component.sass'],
})
export class RutaGestionDatosContactoComponent
  extends RutaConMigasDePanTablaBusqueda<DatosContactoInterface,
    DatosContactoRestService,
    ToasterService>
  implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  idEmpresa: number;

  idContactoEmpresa: number;

  idEdificio: number;
  idEstablecimiento: number;
  idServicio: number;
  idHorarioServicio: number;

  opcionesDropdown = OPCIONES_FILTER_ES_PRINCIPAL;

  columnas = [
    {field: 'telefono', header: 'Telefono'},
    {field: 'celular', header: 'Celular'},
    {field: 'email', header: 'Email'},
    {field: 'esPrincipal', header: 'Es principal'},
    {field: 'habilitado', header: 'Estado'},
    {field: 'id', header: 'Acciones'},
  ];

  estados = ESTADOS;

  nombreModuloPadre: string;

  constructor(
    private readonly _contactoEmpresaRestService: ContactoEmpresaRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _datosContactoRestService: DatosContactoRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _datosContactoRestService,
      _router,
      _toasterServicePrivate,
      0, // SKIP
      NUMERO_FILAS_TABLAS,
    ); // TAKE
    this.queryParams.order = {
      id: 'DESC',
    };
  }

  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this._activatedRoute
      .params
      .pipe(
        mergeMap(
          (parametros: ParametrosRutaGestionDatosContactoInterface) => {
            console.log('ruta', parametros);
            this.establecerParametrosEnRuta(parametros);
            this.ruta = this.setearRuta().ruta;
            const rutas = this.construirMigasDePan();
            this.setearValoresQueryParams();
            this.establecerMigas(rutas);
            this.escucharCambiosEnQueryParams();
            this.escucharCambiosEnParametros();
            const consulta = {
              where: {
                id: this.idContactoEmpresa,
                datosUsuario: {}
              }
            };
            return this._contactoEmpresaRestService
              .findAll(
                'criterioBusqueda=' + JSON.stringify(consulta)
              );
          }
        )
      )
      .subscribe(
        (contactoEmpresa: [ContactoEmpresaInterface[], number]) => {
          if (contactoEmpresa[0][0]) {
            const usuario = contactoEmpresa[0][0]
              .datosUsuario as DatosUsuarioInterface;
            this.nombreModuloPadre =
              usuario.nombres + ' ' + usuario.apellidos;
          }
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          console.error(
            {
              error,
              mensaje: 'Error al buscar el contacto de la empresa',
              data: {
                idContactoEmpresa: this.idContactoEmpresa,
              }
            }
          );
          this._toasterServicePrivate
            .pop(
              'error',
              'Error',
              'Error al buscar el contacto de la empresa'
            );
          this._cargandoService.deshabilitarCargando();
        },
      );
  }

  establecerParametrosEnRuta(parametros: ParametrosRutaGestionDatosContactoInterface) {
    this.idEmpresa = +parametros.idEmpresa;
    this.idContactoEmpresa = +parametros.idContactoEmpresa;
    this.idEdificio = +parametros.idEdificio;
    this.idEstablecimiento = +parametros.idEstablecimiento;
    this.idServicio = +parametros.idServicio;
    this.idHorarioServicio = +parametros.idHorarioServicio;
  }

  construirMigasDePan(): MigaDePanInterface[] {
    const rutas = <MigaDePanInterface[]> [
      RUTAS_PRINCIPAL
        .rutaMenuPrincipal(
          false,
          true,
        ),
      RUTAS_EMPRESA
        .rutaGestionEmpresa(
          false,
          true,
        ),
      RUTAS_CONTACTO_EMPRESA
        .rutaGestionContactoEmpresa(
          false,
          true,
          [
            this.idEmpresa,
          ]
        ),
    ];
    if (this.idHorarioServicio) {
      rutas.push(
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
        RUTAS_CONTACTO_HORARIO_SERVICIO.rutaGestionContactoHorarioServicio(false, true, [
          this.idEmpresa,
          this.idEdificio,
          this.idEstablecimiento,
          this.idServicio,
          this.idHorarioServicio
        ]),
        RUTAS_DATOS_CONTACTO.rutaGestionDatosContactoCertificado(false, true, [
          this.idEmpresa,
          this.idEdificio,
          this.idEstablecimiento,
          this.idServicio,
          this.idHorarioServicio,
          this.idContactoEmpresa,
        ])
      );
    } else {
      rutas.push(
        RUTAS_DATOS_CONTACTO
          .rutaGestionDatosContacto(
            false,
            true,
            [
              this.idEmpresa,
              this.idContactoEmpresa,
            ]
          ),
      );
    }
    return rutas;
  }

  setearRuta(): MigaDePanInterface {
    if (this.idHorarioServicio) {
      return RUTAS_DATOS_CONTACTO.rutaGestionDatosContactoCertificado(false, true, [
        this.idEmpresa,
        this.idEdificio,
        this.idEstablecimiento,
        this.idServicio,
        this.idHorarioServicio,
        this.idContactoEmpresa
      ]);
    } else {
      return RUTAS_DATOS_CONTACTO
        .rutaGestionDatosContacto(
          false,
          true,
          [
            this.idEmpresa,
            this.idContactoEmpresa,
          ]
        );
    }
  }

  setearValoresQueryParams() {
    if (!this.queryParams.where) {
      this.queryParams.where = {
        contactoEmpresa: {
          id: this.idContactoEmpresa
        }
      };
    }
  }

  abrirModalCrearDatoContacto() {
    const dialogRef = this.dialog
      .open(
        CrearEditarDatosContactoComponent,
        {
          width: WIDTH_MODAL_DATOS_CONTACTO,
          data: {
            idContactoEmpresa: this.idContactoEmpresa
          },
        }
      );

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (datosContactoCreado: DatosContactoInterface) => {
        if (datosContactoCreado) {
          this.values.unshift(datosContactoCreado);
          this.optionalParams.registroActual = datosContactoCreado.id;
        }
      },
      error => {
        console.error(
          {
            error,
            mensaje: 'Error con el modal para crear los datos del contacto',
            data: {
              idContactoEmpresa: this.idContactoEmpresa
            }
          }
        );
      },
    );
  }

  abrirModalEditarDatoContacto(datosContacto: DatosContactoInterface) {
    const indiceRegistro = this.values.indexOf(datosContacto);
    const dialogRef = this.dialog
      .open(
        CrearEditarDatosContactoComponent,
        {
          width: WIDTH_MODAL_DATOS_CONTACTO,
          data: {
            datosContacto: datosContacto
          },
        }
      );
    dialogRef
      .afterClosed()
      .subscribe(
        (datosContactoEditado: DatosContactoInterface) => {
          if (datosContactoEditado) {
            this.values[indiceRegistro] = datosContactoEditado;
            this.optionalParams.registroActual = datosContactoEditado.id;
          }
        },
        error => {
          console.error(
            {
              error,
              mensaje: 'Error con el modal para editar los datos del contacto',
              data: {
                datosContacto: datosContacto
              }
            }
          );
        },
      );
  }

  actualizarEstado(datosContacto: DatosContactoInterface) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(datosContacto);
    const habilitado = datosContacto.habilitado ? ESTADOS.Inactivo : ESTADOS.Activo;
    this._datosContactoRestService
      .updateOne(
        datosContacto.id,
        {
          habilitado
        }
      )
      .subscribe(
        () => {
          this.values[indice].habilitado = habilitado;
          this._toasterService.pop(toastExitoEditar);
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          console.error(
            {
              error,
              mensaje: 'Error al actualizar el estado del contacto empresa',
              data: {
                id: datosContacto.id,
                habilitado,
              }
            }
          );
          this._toasterService.pop(toastErrorEditar);
          this._cargandoService.deshabilitarCargando();
        },
      );
  }

  buscarPorTelefonoCelularEmail(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.queryParams.where = {
      telefono: `Like(\"%25${this.busqueda}%25\")`,
      celular: `Like(\"%25${this.busqueda}%25\")`,
      email: `Like(\"%25${this.busqueda}%25\")`,
      mlabOr: true,
      contactoEmpresa: {
        id: this.idContactoEmpresa
      }
    };
    this.tipoBusqueda = 'findAll';
    this.queryParams.skip = 0;
    this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
  }

  escucharEstadoSeleccionado(eventoEstado: ESTADOS.Activo | ESTADOS.Inactivo) {
    this.buscarPorEstadoOEsPrincipal(eventoEstado, 'habilitado');
  }

  escucharSiEsPrincipal(eventoEsPrincipal) {
    const seSeleccionoOpcionEsPrincipal = eventoEsPrincipal.value === 0 || eventoEsPrincipal.value === 1;
    const esPrincipal = seSeleccionoOpcionEsPrincipal ? eventoEsPrincipal.value : undefined;
    this.buscarPorEstadoOEsPrincipal(esPrincipal, 'esPrincipal');
  }

  buscarPorEstadoOEsPrincipal(
    busqueda: 0 | 1,
    campo: 'habilitado' | 'esPrincipal') {
    this.queryParams.where = {
      esPrincipal: campo === 'esPrincipal' ? busqueda : undefined,
      habilitado: campo === 'habilitado' ? busqueda : undefined,
      mlabOr: true,
      contactoEmpresa: {
        id: this.idContactoEmpresa
      }
    };
    this.tipoBusqueda = 'findAll';
    this.queryParams.skip = 0;
    this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
  }
}
