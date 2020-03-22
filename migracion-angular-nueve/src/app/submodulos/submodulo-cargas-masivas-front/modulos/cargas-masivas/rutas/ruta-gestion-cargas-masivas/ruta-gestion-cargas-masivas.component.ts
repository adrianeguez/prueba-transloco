import { Component, OnInit } from '@angular/core';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { RUTAS_CARGAS_MASIVAS } from '../definicion-rutas/rutas-cargas-masivas';
import { CargaMasivaRestService } from '../../../../servicios/rest/carga-masiva-rest.service';
import { CargaMasivaInterface } from '../../../../interfaces/carga-masiva.interface';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';

@Component({
  selector: 'ml-gestion-cargas',
  templateUrl: './ruta-gestion-cargas-masivas.component.html',
  styleUrls: ['./ruta-gestion-cargas-masivas.component.sass'],
})
export class RutaGestionCargasMasivasComponent
  extends RutaConMigasDePanTablaBusqueda<
    CargaMasivaInterface,
    CargaMasivaRestService,
    ToasterService
  >
  implements OnInit {
  totalRegistros = 0;
  mostrarBotonFilterFechas: boolean;

  filas = NUMERO_FILAS_TABLAS;

  columnas = [
    { field: 'nombre', header: 'Nombre del archivo' },
    { field: 'fechaInicio', header: 'Fecha de inicio' },
    { field: 'fechaFinalizacion', header: 'Fecha de finalizacion' },
    { field: 'horaInicio', header: 'Hora de inicio' },
    { field: 'horaFin', header: 'Hora de finalización' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'estado', header: 'Estado' },
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _cargaMasivaService: CargaMasivaRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _cargaMasivaService,
      _router,
      _toasterServicePrivate,
      0,
      10,
    );

    this.ruta = RUTAS_CARGAS_MASIVAS.rutaGestionCargasMasivas(false, true).ruta;

    this.queryParams.order = {
      id: 'DESC',
    };
  }

  ngOnInit() {
    this.mostrarBotonFilterFechas = true;
    this._cargandoService.habilitarCargando();
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_CARGAS_MASIVAS.rutaConfiguraciones(false, true),
      RUTAS_CARGAS_MASIVAS.rutaMenuCargasMasivas(false, true),
      RUTAS_CARGAS_MASIVAS.rutaGestionCargasMasivas(false, true),
    ];
    this.establecerMigas(rutas);
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
  }

  cargarDatos(event) {
    this.loading = true;
    this.llamarDatos(
      event.first,
      this.queryParams.where,
      this.queryParams.camposABuscar,
      this.optionalParams,
      this.queryParams.order,
      this.queryParams.relations,
    );
  }

  buscarPorDescripcion(busqueda: string) {
    this.optionalParams = { registroActual: undefined };
    if (busqueda === '') {
      this.tipoBusqueda = 'findAll';
      this.llamarDatos(
        0,
        undefined,
        undefined,
        undefined,
        this.queryParams.order,
      );
    } else {
      this.tipoBusqueda = 'findWhereOr';
      this.llamarDatos(
        0,
        undefined,
        [{ campo: 'descripcion', valor: `%25${busqueda.trim()}%25` }],
        undefined,
        this.queryParams.order,
      );
    }
  }

  buscarPorFechas(consulta) {
    this.optionalParams = { registroActual: undefined };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      {
        fechaInicio: consulta.fechaInicio,
        fechaFinalizacion: consulta.fechaFinalizacion,
      },
      undefined,
      undefined,
      this.queryParams.order,
    );
  }
}
