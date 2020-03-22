import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { CodigoPaisRestService } from '../../../../servicios/rest/codigo-pais-rest.service';
import { CrearEditarCodigoPaisComponent } from '../../modales/crear-editar-codigo-pais/crear-editar-codigo-pais.component';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { RUTAS_CODIGO_PAIS } from '../definicion-rutas/rutas-codigo-pais';
import { CodigoPaisInterface } from '../../../../interfaces/codigo-pais.interface';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {
  toastErrorCrear,
  toastErrorEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { WIDTH_MODAL_CODIGO_PAIS } from '../../constantes/tamanio-modal-codigo-pais';

@Component({
  selector: 'ml-gestion-codigos-pais',
  templateUrl: './ruta-gestion-codigos-pais.component.html',
  styleUrls: ['./ruta-gestion-codigos-pais.component.sass'],
})
export class RutaGestionCodigosPaisComponent
  extends RutaConMigasDePanTablaBusqueda<
    CodigoPaisInterface,
    CodigoPaisRestService,
    ToasterService
  >
  implements OnInit {
  totalRegistros = 0;

  rows = 3;
  columnas = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'codigoIso3166', header: 'Codigo ISO 3166' },
    { field: 'id', header: 'Acciones' },
  ];
  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _codigoPaisRestService: CodigoPaisRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _codigoPaisRestService,
      _router,
      _toasterServicePrivate,
      0, // SKIP
      10,
    ); // TAKE
    this.ruta = RUTAS_CODIGO_PAIS.rutaGestionCodigoPias(false, true).ruta;
    this.queryParams.order = {
      id: 'DESC',
    };
  }

  ngOnInit() {
    this._cargandoService.habilitarCargando();
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_CODIGO_PAIS.rutaGestionCodigoPias(false, true),
    ];
    this.establecerMigas(rutas);
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
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
    this.loading = false;
  }

  abrirModalCrearCodigoPais() {
    const dialogRef = this.dialog.open(CrearEditarCodigoPaisComponent, {
      width: WIDTH_MODAL_CODIGO_PAIS,
      data: { rol: undefined },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: CodigoPaisInterface) => {
        if (registroCreado) {
          this.values.unshift(registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorCrear);
      },
    );
  }

  abrirModalEditarCodigoPais(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarCodigoPaisComponent, {
      width: WIDTH_MODAL_CODIGO_PAIS,
      data: { codigoPais: registro },
    });
    dialogRef.afterClosed().subscribe(
      (registroEditado: CodigoPaisInterface) => {
        if (registroEditado) {
          this.values[indiceRegistro] = registroEditado;
          this.optionalParams.registroActual = registroEditado.id;
        }
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorEditar);
      },
    );
  }

  buscarPorNombre(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.optionalParams = { registroActual: undefined };
    if (this.busqueda === '') {
      this.tipoBusqueda = 'findAll';
      this.llamarDatos(
        0,
        undefined,
        undefined,
        undefined,
        this.queryParams.order,
        undefined,
        this.tipoBusqueda
      );
    } else {
      this.tipoBusqueda = 'findWhereOr';
      this.llamarDatos(
        0,
        undefined,
        [{ campo: 'nombre', valor: `%25${busqueda}%25` }],
        undefined,
        this.queryParams.order,
        undefined,
        this.tipoBusqueda
      );
    }
  }
}
