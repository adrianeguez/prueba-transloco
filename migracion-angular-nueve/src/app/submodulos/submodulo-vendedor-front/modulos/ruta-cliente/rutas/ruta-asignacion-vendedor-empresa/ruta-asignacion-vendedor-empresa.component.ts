import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {MigaDePanInterface, RutaConMigasDePan, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {
  CargandoService,
  EmitirMigaPanService, InicializarMapa, MarcadorImagenOpenLayer, ModalConfirmacionComponent, OpenlayersService,
} from 'man-lab-ng';
import {EmpresaInterface} from 'src/app/submodulos/submodulo-empresa-front/interfaces/empresa.interface';
import {RutaInterface} from 'src/app/submodulos/submodulo-vendedor-front/interfaces/ruta-interface';
import {
  toastErrorCargarDatos,
  toastErrorConexionServidor,
  toastErrorCrear,
  toastErrorEditar, toastExitoCargarDatos, toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import {ESTADOS} from '../../../../../../enums/estados';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {EdificioRestService} from '../../../../../submodulo-empresa-front/servicios/rest/edificio-rest.service';
import {LocalizacionRestService} from '../../../../../submodulo-empresa-front/servicios/rest/localizacion-rest.service';
import {LugarRestService} from '../../../../servicios/rest/lugar-rest.service';
import {RutaClienteRestService} from '../../../../servicios/rest/ruta-cliente-rest.service';
import {RutaRestService} from '../../../../servicios/rest/ruta-rest.service';
import {AsignarVendedorRutaComponent} from '../../modales/asignar-vendedor-ruta/asignar-vendedor-ruta.component';
import {RUTAS_RUTA_CLIENTE} from '../definicion-rutas/rutas-ruta-cliente';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {EmpresaRestService} from '../../../../../submodulo-empresa-front/servicios/rest/empresa-rest.service';
import {LugarInterface} from '../../../../interfaces/lugar-interface';
import {DatosVendedorRestService} from '../../../../servicios/rest/datos-vendedor-rest.service';
import {VendedorRutaClienteRestService} from '../../../../servicios/rest/vendedor-ruta-cliente-rest.service';
import {EmpresaClientesRestService} from '../../../../../submodulo-empresa-front/servicios/rest/empresa-clientes-rest.service';
import {generarToasterErrorConMensaje, generarToasterWarningConMensaje} from '../../../../constantes/mensajes-toast';
import {NUMERO_FILAS_TABLA_MAPA} from '../../../../constantes/numero-filas-tabla-mapa';
import {EdiCliRutaRestService} from '../../../../servicios/rest/edi-cli-ruta-rest.service';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';

@Component({
  selector: 'ml-ruta-asignacion-vendedor-empresa',
  templateUrl: './ruta-asignacion-vendedor-empresa.component.html',
  styleUrls: ['./ruta-asignacion-vendedor-empresa.component.scss'],
})
export class RutaAsignacionVendedorEmpresaComponent
  extends RutaConMigasDePan
  implements OnInit {
  values: any;
  rows = NUMERO_FILAS_TABLAS;
  totalRecords: any;
  localizacionActual: any;
  map: any;
  skip = 0;
  nombreEmpresa: string;
  nombreEdificio: string;
  loading: boolean;
  idEdificioSeleccionado: number;
  habilitarAsignacion = false;
  habilitarCrear = false;
  ciudadSeleccionada: LugarInterface;
  zonaSeleccionada: RutaInterface;
  arregloVendedoresRutaCliente = [];
  estados = ESTADOS;
  arregloEmpresa: EmpresaInterface[];
  idEmpresa: number;
  busqueda = '';

  columnas = [
    {field: 'datosVendedor', header: 'Nombre vendedor'},
    {field: 'habilitado', header: 'Estado'},
  ];
  mostrarZona: boolean;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _toasterService: ToasterService,
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    public dialog: MatDialog,
    private readonly _rutaClienteRestService: RutaClienteRestService,
    private readonly _rutaRestService: RutaRestService,
    private readonly _lugarRestService: LugarRestService,
    private readonly _openlayersService: OpenlayersService,
    private readonly _localizacionRestService: LocalizacionRestService,
    private readonly _edificioRestService: EdificioRestService,
    private readonly _datosVendedorRestService: DatosVendedorRestService,
    private readonly _empresaRestService: EmpresaRestService,
    private readonly _empresaClientesRestService: EmpresaClientesRestService,
    private readonly _vendedorRutaClienteRestService: VendedorRutaClienteRestService,
    private readonly _ediCliRutaRestService: EdiCliRutaRestService,
  ) {
    super(_emitirMigaPanService);
  }

  async ngOnInit() {
    try {
      this.habilitarAsignacion = false;
      this.habilitarCrear = false;
      this._cargandoService.habilitarCargando();
      this.localizacionActual = await this.obtenerPosicion();
      const configuracion: InicializarMapa = {
        longitud: this.localizacionActual.longitude,
        latitud: this.localizacionActual.latitude,
        zoom: 12,
        nombreMapa: 'map',
        intervalo: '300',
        imagenPuntoUsuario: true,
        mostrarEscala: true,
        mostrarIrAPuntoUsuario: true,
      };
      this.map = this._openlayersService.inicializarMapaOpenLayers(
        configuracion,
      );
      this._activatedRoute.params.subscribe(parametros => {
        this.idEmpresa = +parametros.idEmpresa;
        this._empresaRestService.findOne(this.idEmpresa).subscribe((e: any) => {
          this.nombreEmpresa = e.nombreComercial;
          this._cargandoService.deshabilitarCargando();
        });
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_RUTA_CLIENTE.rutaAsignacionVendedorEmpresa(false, true, [
            this.idEmpresa,
          ]),
        ];
        this.establecerMigas(rutas);
        this._cargandoService.deshabilitarCargando();
      });
      this._cargandoService.deshabilitarCargando();
    } catch (e) {
      console.error(e);
      this._toasterService.pop(toastExitoCargarDatos);
      this._cargandoService.deshabilitarCargando();
    }
  }

  obtenerPosicion() {
    return new Promise((res, rej) => {
      navigator.geolocation
        .getCurrentPosition(r => {
            res(r.coords);
          },
          error => {
            console.error(error);
            this._toasterService.pop(generarToasterErrorConMensaje('Error al obtener posición'));
            rej(error);
          }
        );
    });
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.buscarNombre(event.first);
    this.loading = false;
  }


  async seteoCiudadSeleccionada(ciudad) {
    this.ciudadSeleccionada = ciudad;
    if (ciudad === null) {
      this.habilitarAsignacion = false;
      this.habilitarCrear = false;
    }
  }

  async seteoZonaSeleccionada(zona) {
    try {
      this.zonaSeleccionada = zona;
      if (this.zonaSeleccionada !== null && this.ciudadSeleccionada !== null) {
        this.arregloEmpresa = [];
        this.arregloEmpresa = await this.obtenerEdificionPorEmpresaRuta(
          this.ciudadSeleccionada.id,
          this.zonaSeleccionada,
        );
        if (this.arregloEmpresa.length > 0) {
          this.mapaConMarcadores(this.arregloEmpresa);
          this._toasterService.pop(toastExitoCargarDatos);
        } else {
          this._toasterService.pop(generarToasterWarningConMensaje('La zona seleccionada no tiene edificios asignados !'));
        }
      } else {
        this.habilitarAsignacion = false;
        this.habilitarCrear = false;
      }
    } catch (e) {
      console.error(e);
      this._toasterService.pop(toastExitoCargarDatos);
    }
  }


  mapaConMarcadores(arreglo) {
    const marcadores: MarcadorImagenOpenLayer[] = arreglo.map(value => {
      const objetoImagen = {
        img: 'assets/imagenes/tower.png',
        idMarcador: value.cliente.id,
        configuracionTexto: {
          nombreAMostrar: value.cliente.nombre.slice(0, 15).trim()
        },
        ...value.cliente,
      };
      return {
        latitud: value.localizacion.localizacion.coordinates[0],
        longitud:
          value.localizacion.localizacion.coordinates[1],
        objetoMarcadorImagen: objetoImagen,
      };
    });

    this.map = this._openlayersService.cargarPuntosConImagenes(
      marcadores,
      this.map,
    );
    this._openlayersService.escucharCambios(this.map,
      async r => {
        try {
          this.nombreEdificio = r.objetoImagen.nombre;
          this.idEdificioSeleccionado = r.objetoImagen.id;
          const existeRutaCliente = await this.buscarRutaCliente();
          if (!(existeRutaCliente[1] > 0)) {
            this.habilitarCrear = true;
            this.habilitarAsignacion = false;
          } else {
            this.habilitarCrear = false;
            this.habilitarAsignacion = true;
          }
          await this.buscarNombre();
          if (!r.salioDeFoco) {
            if (!(existeRutaCliente[1] > 0)) {
              this.habilitarCrear = true;
              this.habilitarAsignacion = false;
            } else {
              this.habilitarCrear = false;
              this.habilitarAsignacion = true;
            }
          } else {
            this.habilitarCrear = false;
            this.habilitarAsignacion = false;
          }
        } catch (e) {
          console.error(e);
          this._toasterService.pop(toastExitoCargarDatos);
        }
      });
  }


  async abrirModalAsignarVendedores(rutaCliente?) {
    try {
      await this.buscarNombre();
      const rutaClienteId = await this.buscarRutaCliente();
      const idRutaCliente = rutaCliente ? rutaCliente : rutaClienteId[0][0].id;
      const dialogRef = this.dialog.open(AsignarVendedorRutaComponent, {
        width: '1000px',
        data: {
          empresa: this.nombreEmpresa,
          edificio: this.nombreEdificio,
          idEdificio: this.idEdificioSeleccionado,
          idEmpresa: this.idEmpresa,
          vendedores: this.arregloVendedoresRutaCliente ? this.arregloVendedoresRutaCliente : [],
          rutaCliente: idRutaCliente,
        },
      });

      const respuestaModel$ = dialogRef.afterClosed();
      respuestaModel$.subscribe(r => {
        this.values.unshift(...r);
      });
    } catch (e) {
      console.error(e);
      this._toasterService.pop(toastErrorCargarDatos);
    }
  }

  actualizarEstado(registro) {
    this._cargandoService.habilitarCargando();
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    const vendeRutaCliEnArreglo = this.values.find(
      vendeRutaCli => registro.id === vendeRutaCli.id,
    );
    const indiceRutaCliente = this.values.indexOf(vendeRutaCliEnArreglo);
    this._vendedorRutaClienteRestService
      .updateOne(registro.id, {habilitado})
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indiceRutaCliente].habilitado = habilitado
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

  async buscarNombre(skip = 0) {
    try {
      const rutaClienteId = await this.buscarRutaCliente();
      if (rutaClienteId[1] > 0) {
        const query = {
          busqueda: this.busqueda,
          idRutaCliente: rutaClienteId[0][0].id,
          idEdificio: this.idEdificioSeleccionado,
          skip: this.skip,
          take: this.rows,
        };
        this._vendedorRutaClienteRestService.buscarVendedorPorNombre(query)
          .subscribe(
            r => {
              this.values = r[0];
              this.totalRecords = r[1];
            },
            error => {
              console.error(error);
              this._toasterService.pop(toastExitoCargarDatos);
            }
          );
      }
    } catch (e) {
      console.error(e);
      this._toasterService.pop(toastErrorCargarDatos);
    }
  }


  async obtenerEdificionPorEmpresaRuta(idLugar = null, idZona = null) {
    if (idLugar && idZona) {
      try {
        const busqueda = {
          empresaPadre: this.idEmpresa,
          ruta: idZona,
        };
        const edificiosClientes = await this._ediCliRutaRestService.obtenerEdificiosClientesPorIdEmpresa(busqueda).toPromise();
        return edificiosClientes.edificios;
      } catch (error) {
        console.error(error);
        this._toasterService.pop(toastErrorCargarDatos);
      }
    }
  }


  abrirModalConfirmacionCreaRuta() {
    console.log(this.values, 'estoo');
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '1000px',
      data: {
        mensaje: '¿ Seguro que desea crear la ruta cliente ?',
        titulo: 'Crear Ruta Cliente',
        nombreBotonTrue: 'Aceptar',
        nombreBotonFalse: 'Cancelar',
      },
    });

    const respuestaModel$ = dialogRef.afterClosed();
    respuestaModel$.subscribe(r => {
      r ? this.crearRutaCliente() : this._toasterService.pop(toastErrorConexionServidor);
    });
  }

  async crearRutaCliente() {
    this._cargandoService.habilitarCargando();
    try {
      const existeRutaCliente = await this.buscarRutaCliente();
      if (!(existeRutaCliente[1] > 0)) {
        const crearDatosRutaCliente = {
          ruta: this.zonaSeleccionada,
          edificio: this.idEdificioSeleccionado,
          habilitado: true,
          comisionTotal: 0,
          ventasTotales: 0,
        };
        this._rutaClienteRestService.create(crearDatosRutaCliente)
          .subscribe(
            async (r: any) => {
              this.habilitarCrear = false;
              this.habilitarAsignacion = true;
              this.abrirModalAsignarVendedores(r.id);
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop(toastExitoCrear);
            },
            error => {
              console.error(error);
              this._toasterService.pop(toastErrorCrear);
              this._cargandoService.deshabilitarCargando();
            }
          );
      } else {
        this._toasterService.pop(generarToasterWarningConMensaje('Ya existe el registro'));
        this._cargandoService.deshabilitarCargando();
      }
    } catch (e) {
      console.error(e);
      this._toasterService.pop(toastErrorCrear);
    }
  }

  async buscarRutaCliente() {
    // if (this.zonaSeleccionada && this.idEdificioSeleccionado) {
    try {
      const consulta = {
        relations: ['ruta', 'edificio'],
        where: {
          ruta: this.zonaSeleccionada,
          edificio: this.idEdificioSeleccionado
        }
      };
      const rutaClienteEncontrada = await this._rutaClienteRestService.findAll('criterioBusqueda=' + JSON.stringify(consulta)).toPromise();
      const existeRutaCliente = rutaClienteEncontrada ? rutaClienteEncontrada : undefined;
      if (rutaClienteEncontrada[1] > 0) {
        await this.obtenerVendedoresPorRutaVisita(rutaClienteEncontrada[0][0].id);
      }
      return existeRutaCliente;
    } catch (e) {
      console.error(e);
      this._toasterService.pop(toastErrorCargarDatos);
    }
    // }
  }

  async obtenerVendedoresPorRutaVisita(idRutaCliente) {
    try {
      const consulta = {
        relations: ['rutaCliente', 'datosVendedor'],
        where: {
          rutaCliente: idRutaCliente
        },
      };
      const vendedoresPorRutaCliente = await this._vendedorRutaClienteRestService.findAll('criterioBusqueda=' + JSON.stringify(consulta)).toPromise();
      this.arregloVendedoresRutaCliente = vendedoresPorRutaCliente[0];
    } catch (e) {
      console.error(e);
      this._toasterService.pop(toastErrorCargarDatos);
    }
  }
}
