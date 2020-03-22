import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute, Router} from '@angular/router';
import {CrearEditarContactoEmpresaComponent} from '../../modales/modal-crear-contacto-empresa/crear-editar-contacto-empresa/crear-editar-contacto-empresa.component';
import {ContactoEmpresaRestService} from '../../../../servicios/rest/contacto-empresa-rest.service';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CONTACTO_EMPRESA} from '../definicion-rutas/rutas-contacto-empresa';
import {ContactoEmpresaInterface} from '../../../../interfaces/contacto-empresa.interface';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {
  generarToasterErrorCrearCampoRepetido,
  toastErrorConexionServidor,
  toastErrorCrear,
  toastErrorEditar, toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import {ESTADOS} from '../../../../../../enums/estados';
import {WIDTH_MODAL_CONTACTO_EMPRESA} from '../../constantes/tamanio-modales-contacto-empresa';
import {EmpresaRestService} from '../../../../servicios/rest/empresa-rest.service';
import {mergeMap} from 'rxjs/operators';
import {EmpresaInterface} from '../../../../interfaces/empresa.interface';
import {LazyLoadEvent} from 'primeng/api';
import {ParametrosRutaGestionContactosEmpresaInterface} from '../../interfaces/parametros-ruta-gestion-contactos-empresa.interface';
import {ParametrosRutaGestionEdificiosInterface} from '../../../edificio/interfaces/parametros-ruta-gestion-edificios.interface';
import {RUTAS_EDIFICIO} from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import {RUTAS_ESTABLECIMIENTO} from '../../../establecimiento/rutas/definicion-rutas/rutas-establecimiento';
import {RUTAS_SERVICIO_ESTABLECIMIENTO} from '../../../servicio-establecimiento/rutas/definicion-rutas/definicion-rutas-servicio-establecimiento';
import {RUTAS_HORARIO_SERVICIO} from '../../../horario-servicio/rutas/definicion-rutas/rutas-horario-servicio';
import {HorarioServicioInterface} from '../../../horario-servicio/interfaces/horario-servicio.interface';
import {HorarioServicioRestService} from '../../../horario-servicio/servicios/rest/horario-servicio.rest.service';
import {RUTAS_DATOS_CONTACTO} from '../../../datos-contacto/rutas/definicion-rutas/rutas-datos-contacto';
import {ContactoHorarioServicioRestService} from '../../../contacto-horario-servicio/servicios/rest/contacto-horario-servicio.rest.service';
import {ContactoHorarioServicioInterface} from '../../../contacto-horario-servicio/interfaces/contacto-horario-servicio.interface';

@Component({
  selector: 'ml-gestion-contacto-empresa',
  templateUrl: './ruta-gestion-contactos-empresa.component.html',
  styleUrls: ['./ruta-gestion-contactos-empresa.component.sass'],
})
export class RutaGestionContactosEmpresaComponent
  extends RutaConMigasDePanTablaBusqueda<ContactoEmpresaInterface,
    ContactoEmpresaRestService,
    ToasterService>
  implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  idEmpresa: number;
  idEdificio: number;
  idEstablecimiento: number;
  idServicio: number;
  idHorarioServicio: number;
  columnas = [];

  estados = ESTADOS;

  nombreModuloPadre: string;

  relaciones = {
    datosUsuario: {},
    tipoCargo: {}
  };

  constructor(
    private readonly _empresaRestService: EmpresaRestService,
    private readonly _contactoHorarioServicioRestService: ContactoHorarioServicioRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _contactoEmpresaRestService: ContactoEmpresaRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _contactoEmpresaRestService,
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
          (parametros: ParametrosRutaGestionContactosEmpresaInterface) => {
            console.log('parametros ', parametros);
            console.log('2 ', parametros.idHorarioServicio);
            this.establecerParametrosEnRuta(parametros);
            this.ruta = this.setearRuta().ruta;
            const rutas = this.construirMigasDePan();
            this.setearValoresQueryParams();
            this.establecerMigas(rutas);
            this.escucharCambiosEnQueryParams();
            this.escucharCambiosEnParametros();
            this.columnas = [
              {field: 'nombres', header: 'Nombres'},
              {field: 'apellidos', header: 'Apellidos'},
              {field: 'identificacionPais', header: 'Identificación'},
              {field: 'tipoCargo', header: 'Cargo'},
              !this.idHorarioServicio ? {
                field: 'habilitado',
                header: 'Estado'
              } : {field: 'contactosHorarioServicio.habilitado', header: 'Estado'},
              !this.idHorarioServicio ? {field: 'id', header: 'Acciones'} : {
                field: 'contactosHorarioServicio.id',
                header: 'Acciones'
              },
            ];
            return this._empresaRestService
              .findOne(this.idEmpresa);
          }
        )
      )
      .subscribe(
        (empresa: EmpresaInterface) => {
          console.log('columns', this.columnas);
          console.log('valores', this.values);
          this.nombreModuloPadre = empresa.razonSocial;
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          console.error(
            {
              error,
              mensaje: 'Error al buscar la empresa',
              data: {
                idEmpresa: this.idEmpresa,
              }
            }
          );
          this._toasterServicePrivate
            .pop(
              'error',
              'Error',
              'Error al buscar empresa'
            );
          this._cargandoService.deshabilitarCargando();
        }
      );
  }

  establecerParametrosEnRuta(parametros: ParametrosRutaGestionContactosEmpresaInterface) {
    this.idEmpresa = +parametros.idEmpresa;
    this.idEdificio = +parametros.idEdificio;
    this.idEstablecimiento = +parametros.idEstablecimiento;
    this.idServicio = +parametros.idServicio;
    this.idHorarioServicio = +parametros.idHorarioServicio;
  }

  construirMigasDePan(): MigaDePanInterface[] {
    const rutas = <MigaDePanInterface[]>[
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
        RUTAS_CONTACTO_EMPRESA.rutaGestionContactoEmpresaCertificado(false, true, [
          this.idEmpresa,
          this.idEdificio,
          this.idEstablecimiento,
          this.idServicio,
          this.idHorarioServicio
        ])
      );
    } else {
      rutas.push(
        RUTAS_CONTACTO_EMPRESA
          .rutaGestionContactoEmpresa(
            false,
            true,
            [
              this.idEmpresa,
            ]
          ),
      );
    }
    return rutas;
  }

  setearRuta(): MigaDePanInterface {
    if (this.idHorarioServicio) {
      return RUTAS_CONTACTO_EMPRESA
        .rutaGestionContactoEmpresaCertificado(
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
    } else {
      return RUTAS_CONTACTO_EMPRESA
        .rutaGestionContactoEmpresa(
          false,
          true,
          [
            this.idEmpresa,
          ]
        );
    }
  }

  setearValoresQueryParams() {
    if (!this.queryParams.where) {
      if (this.idHorarioServicio) {
        this.queryParams.where = {
          empresa: {id: this.idEmpresa},
          contactosHorarioServicio: {
            horarioServicio: {
              id: this.idHorarioServicio,
              // horario: {id: this.idHorario}
            },
          },
          ...this.relaciones,
        };
      } else {
        this.queryParams.where = {
          empresa: {
            id: this.idEmpresa
          },
          ...this.relaciones,
        };
      }
    }
  }

  // setearHorarioServicioRuta() {}

  abrirModalCrearContactoEmpresa() {
    const dialogRef = this.dialog
      .open(
        CrearEditarContactoEmpresaComponent,
        {
          width: WIDTH_MODAL_CONTACTO_EMPRESA,
          data: {
            idEmpresa: this.idEmpresa
          },
        }
      );

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$
      .subscribe(
        (contactoEmpresaCreado: ContactoEmpresaInterface) => {
          if (contactoEmpresaCreado) {
            // if (this.idHorarioServicio) {
            //   const contactoHorarioServicio: ContactoHorarioServicioInterface = {
            //     horarioServicio: this.idHorarioServicio,
            //     habilitado: 1,
            //     contactoEmpresa: contactoEmpresaCreado
            //   };
            //   this._cargandoService.habilitarCargando();
            //   this._contactoHorarioServicioRestService.create(contactoHorarioServicio)
            //     .subscribe(
            //       respuesta => {
            //         this._toasterService.pop(toastExitoCrear);
            //         this._cargandoService.deshabilitarCargando();
            //       },
            //       error => {
            //         console.error(
            //           {
            //             error,
            //             mensaje: 'Error al crear contacto para horario',
            //           },
            //         );
            //         this._cargandoService.deshabilitarCargando();
            //       }
            //     );
            // }
            this.values.unshift(contactoEmpresaCreado);
            this.optionalParams.registroActual = contactoEmpresaCreado.id;
          }
        },
        error => {
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

  abrirModalEditarContactoEmpresa(contactoEmpresa: ContactoEmpresaInterface) {
    const indiceRegistro = this.values.indexOf(contactoEmpresa);
    const dialogRef = this.dialog
      .open(
        CrearEditarContactoEmpresaComponent, {
          width: WIDTH_MODAL_CONTACTO_EMPRESA,
          data: {
            contactoEmpresa: contactoEmpresa,
            idEmpresa: this.idEmpresa
          },
        }
      );
    dialogRef
      .afterClosed()
      .subscribe(
        (contactoEmpresaEditadp: ContactoEmpresaInterface) => {
          if (contactoEmpresaEditadp) {
            this.values[indiceRegistro] = contactoEmpresaEditadp;
            this.optionalParams.registroActual = contactoEmpresaEditadp.id;
          }
        },
        error => {
          console.error(
            {
              error,
              mensaje: 'Error con el modal para editar el contacto empresa',
              data: {
                contactoEmpresa: contactoEmpresa,
                idEmpresa: this.idEmpresa
              }
            }
          );
        },
      );
  }

  actualizarEstado(contactoEmpresa: ContactoEmpresaInterface) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(contactoEmpresa);
    const habilitado = contactoEmpresa.habilitado ? ESTADOS.Inactivo : ESTADOS.Activo;
    let actualizar;
    if (this.idHorarioServicio) {
      actualizar = this._contactoHorarioServicioRestService
        .updateOne(contactoEmpresa.id, {'habilitado': habilitado});
    } else {
      actualizar = this._contactoEmpresaRestService
        .updateOne(
          contactoEmpresa.id,
          {
            habilitado
          }
        );
    }
    actualizar.subscribe(
      () => {
        this.values[indice].habilitado = habilitado;
        this._toasterService.pop(toastExitoEditar);
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        console.error(
          {
            error,
            mensaje: 'Error al editar el estado del contacto empresa',
            data: {
              contactoEmpresa: contactoEmpresa.id,
              habilitado
            }
          }
        );
        this._toasterService.pop(toastErrorEditar);
        this._cargandoService.deshabilitarCargando();
      },
    );
  }

  buscarPorNombreaApellidos(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.queryParams.where = {
      empresa: {
        id: this.idEmpresa,
      },
      datosUsuario: {
        identificacionPais: `Like(\"%25${this.busqueda}%25\")`,
        apellidos: `Like(\"%25${this.busqueda}%25\")`,
        mlabOr: true,
      },
      tipoCargo: {}
    };
    this.tipoBusqueda = 'findAll';
    this.queryParams.skip = 0;
    this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
  }

  escucharEstadoSeleccionado(eventoEstado: ESTADOS.Activo | ESTADOS.Inactivo) {
    this.buscarPorEstadoTipo(eventoEstado, 'habilitado');
  }

  escucharTipoCargoSeleccionado(eventoTipoCargo: number) {
    this.buscarPorEstadoTipo(eventoTipoCargo, 'tipoCargo');
  }

  buscarPorEstadoTipo(
    busqueda: ESTADOS.Activo | ESTADOS.Inactivo | number,
    camposABuscar: 'habilitado' | 'tipoCargo'
  ) {
    this.queryParams.where = {
      empresa: {
        id: this.idEmpresa,
      },
      habilitado: camposABuscar === 'habilitado' ? busqueda : undefined,
      tipoCargo: {
        id: camposABuscar === 'tipoCargo' ? busqueda : undefined
      },
      datosUsuario: {}
    };
    this.tipoBusqueda = 'findAll';
    this.queryParams.skip = 0;
    this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
  }

  irAGestionModuloHijo(
    idContactoEmpresa: number,
    moduloHijo: string,
    gestionHijo,
  ) {
    const ruta = [
      'empresa-modulo',
      this.idEmpresa,
      'contacto-empresa-modulo',
      idContactoEmpresa,
      moduloHijo + '-modulo',
      'gestion-' + gestionHijo,
    ];
    this._router.navigate(ruta);
  }
}
