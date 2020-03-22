import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaConMigasDePan } from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { MigaDePanInterface } from 'man-lab-ng/rutas/interfaces/miga-de-pan-interface';
import { HistorialImpuestoRestService } from '../../../../servicios/rest/historial-impuesto-rest.service';
import { TarifaImpuestoRestService } from '../../../../servicios/rest/tarifa-impuesto-rest.service';
import { toastErrorConexionServidor } from './../../../../../../constantes/mensajes-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../enums/estados';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { HistorialImpuestoInterface } from './../../../../interfaces/historial-impuesto.interface';
import { RUTAS_MENU_ARTICULO } from './../../../../ruta/definicion-rutas/rutas-menu';
import { ArticulosRestService } from './../../../../servicios/rest/articulos-rest.service';
import { RUTAS_ARTICULO } from './../../../articulo/rutas/definicion-rutas/rutas-articulo';
import { RUTAS_GRUPOS } from './../../../grupo/rutas/definicion-rutas/rutas-grupos';
import { RUTAS_SUBGRUPO } from './../../../subgrupo/rutas/definicion-rutas/rutas-subgrupo';
import { RUTAS_HISTORIAL_IMPUESTOS } from './../definicion-rutas/rutas-historial-impuestos';
import {RUTAS_CONFIGURACIONES} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-configuraciones';

@Component({
  selector: 'ml-gestion-historial-impuesto',
  templateUrl: './ruta-gestion-historial-impuesto.component.html',
  styleUrls: ['./ruta-gestion-historial-impuesto.component.sass'],
})
export class RutaGestionHistorialImpuestoComponent extends RutaConMigasDePan
  implements OnInit {
  skip = 0;
  nombrePadre: string;
  values: HistorialImpuestoInterface[];
  totalRecords: number;
  rows = NUMERO_FILAS_TABLAS;
  idArticulo: number;
  idGrupo: number;
  idSubgrupo: number;
  loading: boolean;
  estdos = ESTADOS;
  columnas = [
    { field: 'tarifaImpuesto', header: 'Tipo Impuesto' },
    { field: 'tarifaImpuesto', header: 'Siglas Impuesto' },
    { field: 'nombre', header: 'Tarifa' },
    { field: 'codigoSri', header: 'Tarifa Codigo SRI' },
    { field: 'valor', header: 'Valor' },
    { field: 'valorPorcentaje', header: 'Valor Porcentaje' },
    { field: 'habilitado', header: 'Estado' },
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected readonly _historialImpuestoRestService: HistorialImpuestoRestService,
    protected readonly _tarifaImpuestoRestService: TarifaImpuestoRestService,
    protected readonly _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    private readonly _articulosRestService: ArticulosRestService,
  ) {
    super(_emitirMigaPanService);
  }

  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(
      parametros => {
        this.idArticulo = +parametros.idArticulo;
        this.idSubgrupo = +parametros.idSubgrupo;
        this.idGrupo = +parametros.idGrupo;
        this._articulosRestService.findOne(this.idArticulo).subscribe(
          respuesta => {
            this._cargandoService.deshabilitarCargando();
            this.nombrePadre = respuesta.nombre;
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
          },
        );
        this.buscarTarifaImpuestoPorNombreOCodigoSri('');
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_CONFIGURACIONES.rutaConfiguraciones(false, true),
          RUTAS_MENU_ARTICULO.rutaMenuArticulo(false, true),
          RUTAS_GRUPOS.rutaGestionGrupo(false, true),
          RUTAS_SUBGRUPO.rutaGestionSubgrupo(false, true, [this.idGrupo]),
          RUTAS_ARTICULO.rutaGestionArticulo(false, true, [
            this.idGrupo,
            this.idSubgrupo,
          ]),
          RUTAS_HISTORIAL_IMPUESTOS.rutaGestionHistorialImpuesto(false, true, [
            this.idGrupo,
            this.idSubgrupo,
            this.idArticulo,
          ]),
        ];
        this.establecerMigas(rutas);
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
      },
    );
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.loading = false;
  }

  buscarTarifaImpuestoPorNombreOCodigoSri(busqueda) {
    const valorBusqueda = busqueda.trim();
    this._historialImpuestoRestService
      .buscarHistorialImpuestosPorTipoSiglasTarifaSiglasNombreEstado({
        busqueda: valorBusqueda,
        idArticulo: this.idArticulo,
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
      })
      .subscribe(
        respuesta => {
          this.loading = false;
          this.values = respuesta[0];
          this.totalRecords = this.values.length;
        },
        error => {
          console.error(error);
        },
      );
  }

  seteoEstadoSeleccionado(value) {
    this._cargandoService.habilitarCargando();
    const estadoSeleccionado = value !== undefined ? value : '';
    const where = {
      idArticulo: this.idArticulo,
      habilitado: estadoSeleccionado,
      skip: this.skip,
      take: NUMERO_FILAS_TABLAS,
    };
    this._historialImpuestoRestService
      .buscarHistorialImpuestosPorTipoSiglasTarifaSiglasNombreEstado(where)
      .subscribe(
        respuesta => {
          this._cargandoService.deshabilitarCargando();
          this.loading = false;
          this.values = respuesta[0];
          this.totalRecords = this.values.length;
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
          this._toasterServicePrivate.pop(toastErrorConexionServidor);
        },
      );
  }
}
