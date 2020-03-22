import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Toast, ToasterService} from 'angular2-toaster';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {MatDialog} from '@angular/material/dialog';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {CrearEditarTemaComponent} from '../../modales/crear-editar-tema/crear-editar-tema.component';
import {RUTAS_TEMA} from '../definicion-rutas/rutas-tema';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {TemaInterface} from '../../interfaces/tema.interface';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {TemaRestService} from '../../servicios/rest/tema.rest.service';
import {RUTAS_DIAPOSITIVA} from '../../../diapositiva/rutas/definicion-rutas/definicion-rutas-diapostiva';
import {ESTADOS} from '../../../../../../enums/estados';
import {ModalCrearEditarAudioComponent} from '../../modales/modal-subir-audio/modal-crear-editar-audio/modal-crear-editar-audio.component';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-ruta-gestion-tema',
  templateUrl: './ruta-gestion-tema.component.html',
  styleUrls: ['./ruta-gestion-tema.component.scss']
})

export class RutaGestionTemaComponent
  extends RutaConMigasDePanTablaBusqueda<TemaInterface,
    TemaRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {
      field: 'nombre',
      header: 'Nombre',
      llaveATraducir: 'nombre',
      traduccion: ''
    },
    {
      field: 'descripcion',
      header: 'Descripcion',
      llaveATraducir: 'descripcion',
      traduccion: ''
    },
    {
      field: 'habilitado',
      header: 'Estado',
      llaveATraducir: 'estado',
      traduccion: ''
    },
    {
      field: 'id',
      header: 'Acciones',
      llaveATraducir: 'acciones',
      traduccion: ''
    }];
  rutaTraduccion: string;

  habilitar: boolean;
  idEmpresa: number;
  idCurso: number;
  idModuloCurso: number;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _temaRestService: TemaRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    protected _translocoService: TranslocoService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _temaRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      _translocoService,
      'submoduloCertificadosCuros.tema.rutas.rutaGestionTema'
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
    this._activatedRoute.params.subscribe(
      (parametros: { idEmpresa: string, idCurso: string, idModuloCurso: string }) => {
        this.idEmpresa = +parametros.idEmpresa;
        this.idCurso = +parametros.idCurso;
        this.idModuloCurso = +parametros.idModuloCurso;
        this.ruta = RUTAS_TEMA.rutaGestionTema(
          false,
          true,
          [
            this.idEmpresa,
            this.idCurso,
            this.idModuloCurso,
          ]
        ).ruta;
        this.habilitar = true;
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          // declarar rutas para migas de pan en orden
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_CURSO.rutaGestionCursos(false, true, [this.idEmpresa]),
          RUTAS_MODULO_CURSO.rutaGestionModuloCurso(false, true, [this.idEmpresa, this.idCurso]),
          RUTAS_TEMA.rutaGestionTema(false, true, [this.idEmpresa, this.idCurso, this.idModuloCurso]),
        ];
        this.habilitar = true;
        this.establecerMigas(rutas);
        // traducirMigas(this, rutas);
      }
    );
    this.queryParams.where = {
      moduloCurso: {id: this.idModuloCurso}
    };
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
  }

  buscarPorNombreYDescripcion(busqueda: string) {
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
        moduloCurso: {id: this.idModuloCurso}
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
        nombre: `Like(\"%25${busqueda}%25\")`,
        descripcion: `Like(\"%25${busqueda}%25\")`,
        mlabOr: true,
        moduloCurso: {id: this.idModuloCurso},
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  abrirModalEditarTema(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    this.establecerRegistroActual(registro.id);
    const dialogRef = this.dialog.open(CrearEditarTemaComponent, {
      width: '600px',
      data: {
        tema: registro,
        idModuloCurso: this.idModuloCurso,
      },
    });
    dialogRef.afterClosed().subscribe((registroEditado: TemaInterface) => {
      if (registroEditado) {
        this.values[indiceRegistro] = registroEditado;
      }
    }, error => {
      console.error({error, mensaje: 'Error actualizando', data: indiceRegistro});
      this._cargandoService.deshabilitarCargando();
    });
  }

  abrirModalCrearTema() {
    const dialogRef = this.dialog.open(CrearEditarTemaComponent, {
      width: '600px',
      data: {
        tema: undefined,
        moduloCurso: this.idModuloCurso,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: TemaInterface) => {
      if (registroCreado) {
        this.values.unshift(registroCreado);
      }
    }, error => {
      console.error(
        {
          error,
          mensaje: 'Error al crear el tema',
        },
      );
      this._cargandoService.deshabilitarCargando();
    });
  }

  irAGestionModuloHijo(idTema: TemaInterface) {
    const rutaModuloDiapositiva = RUTAS_DIAPOSITIVA.rutaGestionDiapositiva(
      false,
      true,
      [
        this.idEmpresa,
        this.idCurso,
        this.idModuloCurso,
        idTema
      ]
    ).ruta;
    this._router.navigate(
      rutaModuloDiapositiva
    );
  }

  actualizarEstado(registro: TemaInterface) {
    const habilitado = registro.habilitado === ESTADOS.Inactivo ? 1 : 0;
    const temaEnArreglo = this.values.find(
      servicioArreglo => registro.id === servicioArreglo.id,
    );
    const indiceTema = this.values.indexOf(temaEnArreglo);
    this._temaRestService.updateOne(registro.id, {'habilitado': habilitado}).subscribe(
      (respuesta) => {
        this.values[indiceTema].habilitado = habilitado
          ? ESTADOS.Activo
          : ESTADOS.Inactivo;
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
        console.error({mensaje: 'Error editando', error, data: registro});
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

  abrirModalAudio(registro: TemaInterface) {
    const dialogRef = this.dialog.open(ModalCrearEditarAudioComponent, {
      width: '600px',
      data: {
        nombreTabla: 'tema',
        id: registro.id,
        titulo: this._translocoService.translate('generales.otros.nombre',
          {nombre: registro.nombre}),
      },
    });
    this._cargandoService.habilitarCargando();

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: TemaInterface) => {
      if (registroCreado) {
        const exitoCrearToast: Toast = {
          type: 'success',
          title: this._translocoService.translate('generales.toasters.toastExitoCrear.title'),
          body: this._translocoService.translate('generales.toasters.toastExitoCrear.body',
            {nombre: registro.nombre}),
          showCloseButton: true
        };
        this._toasterService.pop(
          exitoCrearToast
        );
      }
    }, error => {
      console.error(
        {
          error,
          mensaje: 'Error al subir el audio',
        },
      );
      const errorCrearToast: Toast = {
        type: 'error',
        title: this._translocoService.translate('generales.toasters.toastErrorCrear.title'),
        body: this._translocoService.translate('generales.toasters.toastErrorCrearVacio'),
        showCloseButton: true
      };
      this._toasterService.pop(
        errorCrearToast
      );
    });
    this._cargandoService.deshabilitarCargando();
  }

  escucharEstadoSeleccionado(eventoEstado: ESTADOS.Activo | ESTADOS.Inactivo, busqueda: string) {
    this.queryParams.where = {
      habilitado: eventoEstado,
      moduloCurso: {id: this.idModuloCurso},
    };
    this.tipoBusqueda = 'findAll';
    this.queryParams.skip = 0;
    this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
  }
}

