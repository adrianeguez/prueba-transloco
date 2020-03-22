import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Toast, ToasterService} from 'angular2-toaster';
import {CrearEditarPruebaComponent} from '../../modales/crear-editar-prueba/crear-editar-prueba.component';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {MatDialog} from '@angular/material/dialog';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {PruebaRestService} from '../../servicios/rest/prueba.rest.service';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {PruebaInterface} from '../../interfaces/prueba.interface';
import {RUTAS_PRUEBA} from '../definicion-rutas/rutas-prueba';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {RUTAS_PREGUNTA} from '../../../pregunta/rutas/definicion-rutas/definicion-rutas-pregunta';
import * as moment from 'moment';
import {ESTADOS} from '../../../../../../enums/estados';
import {TranslocoService} from '@ngneat/transloco';
import {RUTAS_INTERNACIONALIZACION_GESTION_PRUEBA} from '../../constantes/rutas-internacionalizacion';
import {NgbTimepicker, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ruta-gestion-prueba',
  templateUrl: './ruta-gestion-prueba.component.html',
  styleUrls: ['./ruta-gestion-prueba.component.scss']
})
// tslint:disable-next-line:max-line-length
export class RutaGestionPruebaComponent
  extends RutaConMigasDePanTablaBusqueda<PruebaInterface,
    PruebaRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {
      field: 'nombre',
      header: 'Name',
      llaveATraducir: 'nombre',
      traduccion: ''
    },
    {
      field: 'tipo',
      header: 'Type',
      llaveATraducir: 'tipo',
      traduccion: ''
    },
    {
      field: 'tiempoMaximo',
      header: 'Max time',
      llaveATraducir: 'tiempoMaximo',
      traduccion: ''
    },
    {
      field: 'numeroIntentos',
      header: 'Attemps',
      llaveATraducir: 'numeroIntentos',
      traduccion: ''
    },
    {
      field: 'habilitado',
      header: 'State',
      llaveATraducir: 'estado',
      traduccion: ''
    },
    {
      field: 'id',
      header: 'Actions',
      llaveATraducir: 'acciones',
      traduccion: ''
    },
  ];

  habilitar: boolean;
  idEmpresa: number;
  idCurso: number;
  idModuloCurso: number;
  moment: any;
  estadoSeleccionado: number;
  rutaTraduccion: string;


  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _pruebaRestService: PruebaRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    protected translocoService: TranslocoService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _pruebaRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      translocoService,
      RUTAS_INTERNACIONALIZACION_GESTION_PRUEBA
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
      (parametros: { idEmpresa: string, idCurso: string, idModuloCurso: string }) => {
        this.idEmpresa = +parametros.idEmpresa;
        this.idCurso = +parametros.idCurso;
        this.idModuloCurso = +parametros.idModuloCurso;
        this.ruta = RUTAS_PRUEBA.rutaGestionPrueba(
          false,
          true,
          [
            // parametros
            this.idEmpresa,
            this.idCurso,
            this.idModuloCurso
          ]).ruta;
        this.habilitar = true;
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          // declarar rutas para migas de pan en orden
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_CURSO.rutaGestionCursos(false, true, [this.idEmpresa]),
          RUTAS_MODULO_CURSO.rutaGestionModuloCurso(false, true, [this.idEmpresa, this.idCurso]),
          RUTAS_PRUEBA.rutaGestionPrueba(false, true, [this.idEmpresa, this.idCurso, this.idModuloCurso]),
        ];
        this.establecerMigas(rutas);
      }
    );

    this.queryParams.where = {
      moduloCurso: {
        id: this.idModuloCurso
      }
    };
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
  }

  abrirModalEditarPrueba(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    this.establecerRegistroActual(registro.id);
    // console.log(this.idModuloCurso);
    const registropersonalizado = JSON.parse(JSON.stringify(registro));
    registropersonalizado.tiempoMaximo = this.convertirSegundosAObjetoTime(registropersonalizado.tiempoMaximo);
    const dialogRef = this.dialog.open(CrearEditarPruebaComponent, {
      width: '500px',
      data: {
        prueba: registropersonalizado
      },
    });
    dialogRef.afterClosed().subscribe((registroEditado: PruebaInterface) => {
      if (registroEditado) {
        this.values[indiceRegistro] = registroEditado;
      }
    });
  }

  actualizarEstado(registro) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const estadoActualizado = registro.habilitado ? 0 : 1;
    this._pruebaRestService
      .updateOne(
        registro.id,
        {habilitado: estadoActualizado}
      )
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indice].habilitado = estadoActualizado;
          const exitoEditarToast: Toast = {
            type: 'success',
            title: this._translocoService.translate('generales.toasters.toastExitoEditar.title'),
            body: this._translocoService.translate('generales.toasters.toastExitoEditar.body',
              {nombre: registro.nombre}),
            showCloseButton: true
          };
          this._toasterService.pop(
            exitoEditarToast
          );
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error,
            mensaje: 'Error al actualizar el estado',
            data: {
              estadoActualizado,
              id: registro.id,
            }
          });
          const errorEditarToast: Toast = {
            type: 'error',
            title: this._translocoService.translate('generales.toasters.toastErrorEditar.title'),
            body: this._translocoService.translate('generales.toasters.toastErrorEditarVacio.body'),
            showCloseButton: true
          };
          this._toasterService.pop(
            errorEditarToast
          );
        },
      );
  }

  abrirModalCrearPrueba() {
    const dialogRef = this.dialog.open(CrearEditarPruebaComponent, {
      width: '500px',
      data: {
        prueba: undefined,
        idModuloCurso: this.idModuloCurso,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: PruebaInterface) => {
      if (registroCreado) {
        this.values.unshift(registroCreado);
      }
    });
  }

  irAPreguntas(rowData: PruebaInterface) {
    const rutaPregunta = RUTAS_PREGUNTA.rutaGestionPreguntaPrueba(
      false,
      true,
      [
        this.idEmpresa,
        this.idCurso,
        this.idModuloCurso,
        rowData.id // idPrueba
      ]
    ).ruta;
    this._router.navigate(
      rutaPregunta
    );
  }

  convertirSegundosAObjetoTime(tiempoMaximo: number | string) {
    const momentTiempoMaximo = moment.duration(tiempoMaximo, 'seconds');
    let objetoTimeTiempoMaximo: NgbTimeStruct;
    objetoTimeTiempoMaximo = {
      hour: momentTiempoMaximo.hours(),
      minute: momentTiempoMaximo.minutes(),
      second: momentTiempoMaximo.seconds(),
    };
    return objetoTimeTiempoMaximo;
  }

  escucharEstadoSeleccionado($event: ESTADOS.Activo | ESTADOS.Inactivo, busqueda: string) {
    this._cargandoService.habilitarCargando();
    if (busqueda !== null) {
      this.queryParams.where = {
        habilitado: $event,
        moduloCurso: {
          id: this.idModuloCurso
        },
        nombre: `Like("%25${busqueda}%25")`,
      };
    } else {
      this.queryParams.where = {
        habilitado: $event,
        moduloCurso: {
          id: this.idModuloCurso
        },
      };
    }
    this.queryParams.relations = [];
    this.queryParams.skip = 0;
    this.queryParams.take = 10;
    this.queryParams.order = {
      id: 'DESC',
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    this._cargandoService.deshabilitarCargando();
  }
}

