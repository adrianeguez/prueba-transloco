import {Component, OnInit} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {Toast, ToasterService} from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_TEMA} from '../../../tema/rutas/definicion-rutas/rutas-tema';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {ContenidoInterface} from '../../interfaces/contenido.interface';
import {ContenidoRestService} from '../../servicios/rest/contenido.rest.service';
import {CrearEditarContenidoComponent} from '../../modales/crear-editar-contenido/crear-editar-contenido.component';
import {RUTAS_DIAPOSITIVA} from '../../../diapositiva/rutas/definicion-rutas/definicion-rutas-diapostiva';
import {RUTAS_CONTENIDO} from '../definicion-rutas/definicion-rutas-contenido';
import {ESTADOS} from '../../../../../../enums/estados';
import {SubirImagenComponent} from '../../modales/subir-imagen/subir-imagen.component';
import {TranslocoService} from '@ngneat/transloco';
import {crearToasterGeneral} from '../../../../funciones/crear-toaster-general';

@Component({
  selector: 'app-ruta-gestion-contenido',
  templateUrl: './ruta-gestion-contenido.component.html',
  styleUrls: ['./ruta-gestion-contenido.component.scss']
})
export class RutaGestionContenidoComponent
  extends RutaConMigasDePanTablaBusqueda<ContenidoInterface,
    ContenidoRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {
      field: 'texto',
      header: 'Texto',
      llaveATraducir: 'texto',
      traduccion: ''
    },
    {
      field: 'urlImagen1',
      header: 'Imagen 1',
      llaveATraducir: 'urlImagen1',
      traduccion: ''
    },
    {
      field: 'urlImagen2',
      header: 'Imagen 2',
      llaveATraducir: 'urlImagen2',
      traduccion: ''
    },
    {
      field: 'link',
      header: 'Link',
      llaveATraducir: 'link',
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
    },
  ];

  habilitar: boolean;
  idEmpresa: number;
  idCurso: number;
  idModuloCurso: number;
  idTema: number;
  idDiapositiva: number;
  rutaTraduccion: string;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _contenidoRestService: ContenidoRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    protected readonly _translocoService: TranslocoService,
    public dialog: MatDialog,
    protected translocoService: TranslocoService
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _contenidoRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      translocoService,
      'submoduloCertificadosCuros.contenido.rutas.rutaGestionContenido'
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
      (parametros: {
        idEmpresa: string,
        idCurso: string,
        idModuloCurso: string,
        idTema: string,
        idDiapositiva: string,
      }) => {
        this.idEmpresa = +parametros.idEmpresa;
        this.idCurso = +parametros.idCurso;
        this.idModuloCurso = +parametros.idModuloCurso;
        this.idTema = +parametros.idTema;
        this.idDiapositiva = +parametros.idDiapositiva;
        this.ruta = RUTAS_CONTENIDO.rutaGestionContenido(
          false,
          true,
          [
            this.idEmpresa,
            this.idCurso,
            this.idModuloCurso,
            this.idTema,
            this.idDiapositiva,
          ]
        ).ruta;
        this.habilitar = true;
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          // declarar rutas para migas de pan en orden
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_CURSO.rutaGestionCursos(false, true, [this.idEmpresa]),
          RUTAS_MODULO_CURSO.rutaGestionModuloCurso(false, true,
            [
              this.idEmpresa,
              this.idCurso]),
          RUTAS_TEMA.rutaGestionTema(false, true,
            [
              this.idEmpresa,
              this.idCurso,
              this.idModuloCurso]),
          RUTAS_DIAPOSITIVA.rutaGestionDiapositiva(false, true,
            [
              this.idEmpresa,
              this.idCurso,
              this.idModuloCurso,
              this.idTema]),
          RUTAS_CONTENIDO.rutaGestionContenido(false, true,
            [
              this.idEmpresa,
              this.idCurso,
              this.idModuloCurso,
              this.idTema,
              this.idDiapositiva]),
        ];
        this.habilitar = true;
        this.establecerMigas(rutas);
      }
    );
    // cargar con activated route y setear el habilitar
    this.queryParams.where = {
      diapositiva: {id: this.idDiapositiva}
    };
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
  }

  buscarPorIdentificadorONombre(busqueda: string) {
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
        diapositiva: {id: this.idDiapositiva}
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
        texto: `Like(\"%25${busqueda}%25\")`,
        diapositiva: {id: this.idDiapositiva}
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  abrirModalEditarContenido(registro: ContenidoInterface) {
    const indiceRegistro = this.values.indexOf(registro);
    this.establecerRegistroActual(registro.id);
    const dialogRef = this.dialog.open(CrearEditarContenidoComponent, {
      width: '600px',
      data: {
        contenido: registro,
        idDiapositiva: this.idDiapositiva
      },
    });
    dialogRef.afterClosed().subscribe((registroEditado: ContenidoInterface) => {
      if (registroEditado) {
        this.values[indiceRegistro] = registroEditado;
      }
    });
  }

  abrirModalCrearContenido() {
    const dialogRef = this.dialog.open(CrearEditarContenidoComponent, {
      width: '600px',
      data: {contenido: undefined, idDiapositiva: this.idDiapositiva},
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: ContenidoInterface) => {
      if (registroCreado) {
        this.values.unshift(registroCreado);
      }
    });
  }

  abrirModalImagen(registro: ContenidoInterface, imagen: number) {
    const dialogRef = this.dialog.open(SubirImagenComponent, {
      width: '700px',
      data: {
        contenido: registro,
        nombreTabla: 'contenido',
        id: registro.id,
        titulo: 'CONTENIDO',
        numeroImagen: imagen,
      },
    });
    const nombreImagen = `urlImagen${imagen}`;
    const contenidoEnArreglo = this.values.find(
      contenido => registro.id === contenido.id,
    );
    const indiceContenido = this.values.indexOf(contenidoEnArreglo);
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado) => {
      if (registroCreado) {
        const url = registroCreado.data.url;
        const registroActualizar = {
          nombreImagen: url
        };
        this._cargandoService.habilitarCargando();
        this._contenidoRestService.updateOne(
          registro.id,
          registroActualizar,
        )
          .subscribe(
            (respuesta: ContenidoInterface) => {
              this.values[indiceContenido][nombreImagen] = url;
              const exitoEditarToast: Toast = {
                type: 'success',
                title: this._translocoService.translate('generales.toasters.toastExitoEditar.title'),
                body: this._translocoService.translate('generales.toasters.toastExitoEditar.body',
                  {nombre: respuesta.texto}),
                showCloseButton: true
              };
              this._toasterService.pop(
                exitoEditarToast
              );
              this._cargandoService.deshabilitarCargando();
            },
            error => {
              console.error({mensaje: 'Error editando imagen contenido', error, data: registroCreado});
              this._toasterService.pop(
                crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorEditarVacio')
              );
              this._cargandoService.deshabilitarCargando();
            }
          );
      }
    });
  }

  actualizarEstado(registro: ContenidoInterface) {
    const habilitado = registro.habilitado === ESTADOS.Inactivo ? 1 : 0;
    const contenidoEnArreglo = this.values.find(
      contenido => registro.id === contenido.id,
    );
    const indiceContenido = this.values.indexOf(contenidoEnArreglo);
    this._contenidoRestService.updateOne(registro.id, {'habilitado': habilitado}).subscribe(
      () => {
        this.values[indiceContenido].habilitado = habilitado
          ? ESTADOS.Activo
          : ESTADOS.Inactivo;
      },
      error => {
        console.error({mensaje: 'Error editando', error, data: registro});
        this._toasterService.pop(
          crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorEditarVacio')
        );
      },
    );
  }
}

