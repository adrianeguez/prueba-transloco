import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ToasterService} from 'angular2-toaster';
import {EdificioRestService} from '../../../../servicios/rest/edificio-rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CrearEditarEdificioComponent} from '../../modales/crear-editar-edificio/crear-editar-edificio.component';
import {DireccionRestService} from '../../../../servicios/rest/direccion-rest.service';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_EDIFICIO} from '../definicion-rutas/rutas-edificio';
import {EdificioInterface} from '../../../../interfaces/edificio.interface';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {DireccionInterface} from '../../../../interfaces/direccion.interface';
import {LocalizacionInterface} from '../../../../interfaces/localizacion.interface';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastErrorMostrar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import {ESTADOS} from '../../../../../../enums/estados';
import {LocalizacionRestService} from '../../../../servicios/rest/localizacion-rest.service';
import {WIDTH_MODAL_EDIFICIO} from '../../constantes/tamanio-modal-edificio';
import {EmpresaRestService} from '../../../../servicios/rest/empresa-rest.service';
import {ENUM_ES_EDIFICIO_MATRIZ} from '../../enums/enum-es-matriz';
import {cambiarValorPropiedadArreglo} from '../../../../funciones/cambiar-propiedad-arreglo';
// tslint:disable-next-line:max-line-length
import {ModalAsignarZonaEmpresaComponent} from '../../../../../submodulo-vendedor-front/componentes/modal-asignar-zona-empresa/modal-asignar-zona-empresa/modal-asignar-zona-empresa.component';
import {TAMANIO_MODAL_SELECT} from '../../../../../submodulo-vendedor-front/constantes/tamanios-componentes';
import {RUTAS_EMPRESA_CLIENTES} from '../../../empresa-clientes/rutas/definicion-rutas/rutas-empresa-clientes';
import {RutaInterface} from '../../../../../submodulo-vendedor-front/interfaces/ruta-interface';
import {RutaRestService} from '../../../../../submodulo-vendedor-front/servicios/rest/ruta-rest.service';
import {LugarInterface} from '../../../../../submodulo-vendedor-front/interfaces/lugar-interface';

@Component({
  selector: 'ml-gestion-edificios',
  templateUrl: './ruta-gestion-edificios.component.html',
  styleUrls: ['./ruta-gestion-edificios.component.sass'],
})
// tslint:disable-next-line:max-line-length
export class RutaGestionEdificiosComponent
  extends RutaConMigasDePanTablaBusqueda<EdificioInterface,
    EdificioRestService,
    ToasterService>
  implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  estados = ESTADOS;

  idEmpresa;

  idEmpresaClientes;

  idEmpresaPadre;

  columnas = [
    {field: 'nombre', header: 'Nombre'},
    {field: 'esMatriz', header: 'Es Matriz'},
    {field: 'habilitado', header: 'Estado'},
    {field: 'ruta', header: 'Ruta'},
    {field: 'id', header: 'Acciones'},
  ];

  nombreModuloPadre;

  relaciones = ['direccion', 'ruta', 'direccion.lugar', 'ediCliRuta', 'ediCliRuta.ruta',  'ediCliRuta.edificioCliente'];

  constructor(
    private readonly _empresaRestService: EmpresaRestService,
    private readonly _direccionRestService: DireccionRestService,
    private readonly _localizacionRestService: LocalizacionRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _edificioRestService: EdificioRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
    private _rutaRestService: RutaRestService
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _edificioRestService,
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
    this._activatedRoute.params.subscribe(
      params => {
        this.idEmpresaClientes = params.idEmpresaClientes;
        this.idEmpresaPadre = params.idEmpresa;
        this.idEmpresa = this.idEmpresaClientes
          ? this.idEmpresaClientes
          : this.idEmpresaPadre;
        this._empresaRestService.findOne(this.idEmpresa).subscribe(
          empresa => {
            this.nombreModuloPadre = empresa.razonSocial;
            this._cargandoService.deshabilitarCargando();
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
          },
        );
        let argumentosMigasPan;
        if (this.idEmpresaClientes) {
          argumentosMigasPan = [this.idEmpresaPadre, this.idEmpresa];
        } else {
          argumentosMigasPan = [this.idEmpresa];
        }
        this.ruta = this.idEmpresaClientes
          ? RUTAS_EDIFICIO.rutaGestionEdificioClientes(true, false, [
            this.idEmpresaPadre,
            this.idEmpresa,
          ])
          : RUTAS_EDIFICIO.rutaGestionEdificio(true, false, [this.idEmpresa]);
        const rutas = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
        ];
        if (this.idEmpresaClientes) {
          rutas.push(
            RUTAS_EMPRESA_CLIENTES.rutaGestionEmpresaClientes(false, true, [
              this.idEmpresaPadre,
            ]),
            RUTAS_EDIFICIO.rutaGestionEdificioClientes(false, true, [
              this.idEmpresaPadre,
              this.idEmpresa,
            ]),
          );
        } else {
          rutas.push(
            RUTAS_EDIFICIO.rutaGestionEdificio(false, true, [this.idEmpresa]),
          );
        }
        this.queryParams.where = this.queryParams.where
          ? this.queryParams.where
          : {empresa: this.idEmpresa};
        this.queryParams.relations =
          this.queryParams.relations.length > 0
            ? this.queryParams.relations
            : this.relaciones;
        this.establecerMigas(rutas);
        this.escucharCambiosEnQueryParams();
        this.escucharCambiosEnParametros();
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
      },
    );
    if (!this.idEmpresaClientes) {
      this.columnas.splice(3, 1);
    }
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.llamarDatos(
      this.queryParams.skip,
      this.queryParams.where,
      this.queryParams.camposABuscar,
      this.optionalParams,
      this.queryParams.order,
      this.queryParams.relations,
      this.tipoBusqueda
    );
    if (this.idEmpresaClientes) {
      this.setearEdiCliRuta();
    }
    this.loading = false;
  }

  setearEdiCliRuta() {
    setTimeout(() => {
      this.values.map( edificio => {
        edificio.ediCliRuta = edificio.ediCliRuta.filter( ediCliRutaValor => {
          return ediCliRutaValor.edificioCliente && ediCliRutaValor.edificioCliente.id === edificio.id && ediCliRutaValor.empresa === +this.idEmpresaPadre;
        });
      });
    }, 500);
  }
  abrirModalCrearEdificio() {
    const dialogRef = this.dialog.open(CrearEditarEdificioComponent, {
      width: WIDTH_MODAL_EDIFICIO,
      data: {idEmpresa: this.idEmpresa},
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: EdificioInterface) => {
        if (registroCreado) {
          if (registroCreado.esMatriz) {
            cambiarValorPropiedadArreglo(this.values, 'esMatriz', 0);
          }
          this.values.unshift(registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorCrear);
        this._cargandoService.deshabilitarCargando();
      },
    );
  }

  buscarPorNombre(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.optionalParams = {registroActual: undefined};
    const where = {
      nombre: `Like(\"%25${this.busqueda}%25\")`,
      empresa: this.idEmpresa,
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, this.relaciones, this.tipoBusqueda);
  }

  async abrirModalEditarEdificio(registro) {
    try {
      const ediCliRuta = registro.ediCliRuta;
      const direccionAEditar = registro.direccion as DireccionInterface;
      const respuestaLocalizacion: LocalizacionInterface = await this.buscarLocalizacion(
        direccionAEditar.id.toString(),
      );
      direccionAEditar.localizacion = respuestaLocalizacion;
      const indiceRegistro = this.values.indexOf(registro);
      const dialogRef = this.dialog.open(CrearEditarEdificioComponent, {
        width: WIDTH_MODAL_EDIFICIO,
        data: {
          idEmpresa: this.idEmpresa,
          edificio: registro,
          direccion: direccionAEditar,
          localizacion: {
            coordenadaX: respuestaLocalizacion
              ? respuestaLocalizacion.localizacion.coordinates[0]
              : null,
            coordenadaY: respuestaLocalizacion
              ? respuestaLocalizacion.localizacion.coordinates[1]
              : null,
            id: direccionAEditar.localizacion
              ? direccionAEditar.localizacion.id
              : null,
          },
        },
      });
      dialogRef.afterClosed().subscribe(
        (registroEditado: EdificioInterface) => {
          if (registroEditado) {
            if (registroEditado.esMatriz) {
              cambiarValorPropiedadArreglo(this.values, 'esMatriz', 0);
            }
            this.values[indiceRegistro] = registroEditado;
            this.values[indiceRegistro].ediCliRuta = ediCliRuta;
            console.log(this.values[indiceRegistro]);
            this.optionalParams.registroActual = registroEditado.id;
          }
        },
        error => {
          console.error(error);
          this._toasterService.pop(toastErrorEditar);
          this._cargandoService.deshabilitarCargando();
        },
      );
    } catch (e) {
      console.error(e);
      this._toasterService.pop(toastErrorMostrar);
    }
  }

  actualizarEsMatriz(registro) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const esMatriz = registro.esMatriz === ENUM_ES_EDIFICIO_MATRIZ.No;
    this._edificioRestService
      .buscarActualizarEdificioEsMatriz({
        idEmpresa: this.idEmpresa,
        idEdificio: registro.id,
        edificio: {esMatriz},
      })
      .subscribe(
        () => {
          if (esMatriz) {
            cambiarValorPropiedadArreglo(this.values, 'esMatriz', 0);
          }
          this.values[indice].esMatriz = esMatriz ? 1 : 0;
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastExitoEditar);
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
          this._toasterService.pop(toastErrorEditar);
        },
      );
  }

  actualizarEstado(registro) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    this._edificioRestService.updateOne(registro.id, {habilitado})
      .subscribe (
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indice].habilitado = habilitado
            ? ESTADOS.Activo
            : ESTADOS.Inactivo;
          this._toasterService.pop(toastExitoEditar);
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
          this._toasterService.pop(toastErrorEditar);
        },
      );
  }

  irAGestionModuloHijo(
    idEdificio: number,
    moduloHijo: string,
    gestionHijo: string,
  ) {
    const ruta = [
      'empresa-modulo',
      this.idEmpresa,
      'edificio-modulo',
      idEdificio,
      moduloHijo + '-modulo',
      'gestion-' + gestionHijo,
    ];
    this._router.navigate(ruta);
  }

  async buscarLocalizacion(direccionId: string) {
    try {
      const promesaLocalizacion = this._localizacionRestService
        .buscarLocalizacion({
          entidadId: direccionId,
          entidadNombre: 'edificio',
        })
        .toPromise();
      return await promesaLocalizacion;
    } catch (e) {
      console.error(e);
      this._toasterService.pop(toastErrorMostrar);
    }
  }

  escucharEstadoSeleccionado(event) {
    this.optionalParams = {registroActual: undefined};
    const seSeleccionoEstado =
      event === ESTADOS.Activo || event === ESTADOS.Inactivo;
    const where = seSeleccionoEstado
      ? {habilitado: event, empresa: this.idEmpresa}
      : {empresa: this.idEmpresa};
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, this.relaciones, this.tipoBusqueda);
  }

  async abrirModalSeleccionarZonaPorEmpresa(registro) {
    try {
      const localizacion = await this.buscarLocalizacion(registro.direccion.id.toString());
      const indiceRegistro = this.values.indexOf(registro);
      if (localizacion) {
        const dialogRef = this.dialog.open(ModalAsignarZonaEmpresaComponent, {
          width: TAMANIO_MODAL_SELECT,
          data: {registro: registro.id, idEmpresa: this.idEmpresa, idEmpresaPadre: this.idEmpresaPadre},
        });
        dialogRef.afterClosed().subscribe(
          async (registroEditado) => {
            if (registroEditado) {
              const promesaRuta = this._rutaRestService.findOne(registroEditado.ruta).toPromise();
              try {
                registroEditado.ediCliRuta = [];
                registroEditado.ediCliRuta[0] = {empresa: +this.idEmpresaPadre, ruta: await promesaRuta, edificioCliente: registro};
                registroEditado.direccion = await registro.direccion;
                this.values[indiceRegistro] = registroEditado;
                this.optionalParams.registroActual = registroEditado.id;
              } catch (e) {
                console.error(e);
                this._toasterService.pop(toastErrorEditar);
                this._cargandoService.deshabilitarCargando();
              }

            }
          },
          error => {
            console.error(error);
            this._toasterService.pop(toastErrorEditar);
            this._cargandoService.deshabilitarCargando();
          },
        );
      } else {
        this._toasterService.pop('warning', 'Advertencia', 'EL edificio seleccionado no tiene localización');
      }
    } catch (e) {
      console.error(e);
      this._toasterService.pop(toastErrorMostrar);
    }
  }
}
