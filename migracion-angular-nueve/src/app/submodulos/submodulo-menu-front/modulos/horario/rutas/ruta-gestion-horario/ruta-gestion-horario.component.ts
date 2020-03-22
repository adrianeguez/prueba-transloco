import { Component, OnInit } from '@angular/core';
import { HorarioInterface } from '../../interfaces/horario.interface';
import { CrearEditarHorarioComponent } from '../../modales/modal-crear-editar-horario/modal-crear-editar-horario/crear-editar-horario.component';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ToasterService } from 'angular2-toaster';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { RUTAS_HORARIO } from '../definicion-rutas/rutas-horario';
import { HorarioRestService } from '../../servicios/rest/horario.rest.service';
import { RUTAS_EMPRESA } from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import { ESTADOS } from '../../../../../../enums/estados';
// import { ItemFactorInterface } from '../../../item-factor/interfaces/item-factor.interface';

@Component({
  selector: 'app-ruta-gestion-horario',
  templateUrl: './ruta-gestion-horario.component.html',
  styleUrls: ['./ruta-gestion-horario.component.scss'],
})
// tslint:disable-next-line:max-line-length
export class RutaGestionHorarioComponent
  extends RutaConMigasDePanTablaBusqueda<
    HorarioInterface,
    HorarioRestService,
    ToasterService
  >
  implements OnInit {
  columnas = [
    { field: 'descripcion', header: 'Descripción' },
    { field: 'habilitado', header: 'Estado' },
    { field: 'id', header: 'Acciones' },
  ];

  habilitar: boolean;
  idEmpresa: number;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _horarioRestService: HorarioRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _horarioRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
    );
    //
    this.tipoBusqueda = 'findAll';
    this.queryParams.order = {
      id: 'DESC',
    };
  }

  ngOnInit() {
    this.habilitar = false;
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(
      (parametro: { idEmpresa: string }) => {
        this.idEmpresa = +parametro.idEmpresa;
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          // declarar rutas para migas de pan en orden
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_HORARIO.rutaGestionHorario(false, true, [this.idEmpresa]),
        ];
        // cargar con activated route y setear el habilitar
        this.ruta = RUTAS_HORARIO.rutaGestionHorario(false, true, [
          this.idEmpresa,
        ]).ruta;
        this.establecerMigas(rutas);
      },
    );
    this.habilitar = true;
    this.queryParams.relations = ['empresa'];
    this.queryParams.where = {
      empresa: {
        id: this.idEmpresa
      }
    };
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
  }

  buscarPorIdentificadorONombre(busqueda: string) {
    if (busqueda === '') {
      this.queryParams.relations = ['empresa'];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
        empresa: {
          id: this.idEmpresa
        }
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    } else {
      this.queryParams.relations = ['empresa'];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
        descripcion: `Like(\"%25${busqueda}%25\")`,
        empresa: {
          id: this.idEmpresa
        }
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  abrirModalEditarHorario(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    this.establecerRegistroActual(registro.id);
    const dialogRef = this.dialog.open(CrearEditarHorarioComponent, {
      width: '500px',
      data: {
        horario: registro,
        idEmpresa: this.idEmpresa,
      },
    });
    dialogRef.afterClosed().subscribe((registroEditado: HorarioInterface) => {
      if (registroEditado) {
        this.values[indiceRegistro] = registroEditado;
      }
    });
  }

  abrirModalCrearHorario() {
    const dialogRef = this.dialog.open(CrearEditarHorarioComponent, {
      width: '500px',
      data: {
        horario: undefined,
        idEmpresa: this.idEmpresa,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: HorarioInterface) => {
      if (registroCreado) {
        this.values.unshift(registroCreado);
      }
    });
  }

  escucharEstadoSeleccionado(event) {
    this.optionalParams = { registroActual: undefined };
    const seSeleccionoEstado =
      event === ESTADOS.Activo || event === ESTADOS.Inactivo;
    const where = seSeleccionoEstado
      ? { habilitado: event, empresa: this.idEmpresa }
      : { empresa: this.idEmpresa };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      where,
      undefined,
      undefined,
      this.queryParams.order,
      undefined,
      this.tipoBusqueda,
    );
  }

  actualizarEstado(rowData) {
    const estadoActualizar = rowData.habilitado ? 0 : 1;
    this._cargandoService.habilitarCargando();
    this._horarioRestService
      .updateOne(rowData.id, {
        habilitado: estadoActualizar,
      })
      .subscribe(
        respuesta => {
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(
            'success',
            'Correcto',
            'Actualizado correctamente',
          );
          rowData.habilitado = estadoActualizar;
        },
        error => {
          console.error({
            error,
            mensaje: 'Error al actualizar estado',
            data: {
              estadoActualizar,
              idItemFactor: rowData.id,
            },
          });
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop('error', 'Error', 'Error al actualizar');
        },
      );
  }

  irA(rowData) {
    this._router.navigate([
      // rutas
    ]);
  }
}
