import {Component, OnInit} from '@angular/core';
import {RUTAS_CURSO} from '../definicion-rutas/definicion-rutas-curso';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {Toast, ToasterService} from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {RUTAS_CLIENTE} from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';
import {CursoUsuarioRestService} from '../../servicios/rest/curso-usuario.rest.service';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {ArticulosEmpresaRestService} from '../../../../../submodulo-articulos-front/servicios/rest/articulo-empresa-rest.service';
import {ArticuloEmpresaInterface} from '../../../../../submodulo-articulos-front/interfaces/articulo-empresa.interface';
import {TranslocoService} from '@ngneat/transloco';
import {traducirColumnas} from '../../../../../../funciones/traducir-columnas';
import {CrearEditarPedidoCursoComponent} from '../../../pedido/modales/crear-pedido-curso/crear-editar-pedido-curso/crear-editar-pedido-curso.component';
import {StripeRestService} from '../../../stripe/servicios/rest/stripe.rest.service';
import {traducirMigas} from '../../../../funciones/traducir-migas-de-pan';
import {crearToasterGeneral} from '../../../../funciones/crear-toaster-general';

@Component({
  selector: 'app-ruta-gestion-cursos',
  templateUrl: './ruta-seleccionar-curso.component.html',
  styleUrls: ['./ruta-seleccionar-curso.component.scss']
})
export class RutaSeleccionarCursoComponent
  extends RutaConMigasDePanTablaBusqueda<ArticuloEmpresaInterface,
    ArticulosEmpresaRestService,
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
      header: 'Descripción',
      llaveATraducir: 'descripcion',
      traduccion: ''
    },
    {
      field: 'duracion',
      header: 'Duración',
      llaveATraducir: 'duracion',
      traduccion: ''
    },
    {
      field: 'valor',
      header: 'Precio',
      llaveATraducir: 'valor',
      traduccion: ''
    },
    {
      field: 'id',
      header: 'Acciones',
      llaveATraducir: 'acciones',
      traduccion: ''
    },
  ];

  rutaTraduccion: string;

  habilitar: boolean;
  idUsuario: number;
  usuario;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _articuloEmpresaRestService: ArticulosEmpresaRestService,
    protected _cursoUsuarioRestService: CursoUsuarioRestService,
    private _auth0Service: Auth0Service,
    private _stripeService: StripeRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    protected translocoService: TranslocoService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _articuloEmpresaRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      translocoService,
      'submoduloCertificadosCuros.moduloCurso.rutas.rutaSeleccionarCurso'
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
      () => {
        this.idUsuario = +this._auth0Service.empresasEnLasQueTrabaja[0].datoUsuario.id;
        this.usuario = this._auth0Service.empresasEnLasQueTrabaja[0].datoUsuario;
        this.ruta = RUTAS_CURSO.rutaSeleccionarCurso(
          false,
          true,
          []).ruta;
        this.habilitar = true;
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          // declarar rutas para migas de pan en orden
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_CLIENTE.rutaInicio(false, true),
          RUTAS_CURSO.rutaMenuInicioUsuarioCurso(false, true),
          RUTAS_CURSO.rutaSeleccionarCurso(false, true),
        ];
        this.establecerMigas(rutas);
      }
    );

    this.queryParams.where = {
      habilitado: 1,
      precios: {
        esPrincipal: 1,
      },
      articulo: {
        esCurso: 1,
        curso: {
          habilitado: 1,
          modulosCurso: {
            temas: {}
          }
        }
      },
      empresa: {},
    };
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
  }

  buscarPorIdentificadorONombre(busqueda: string) {
    if (busqueda === '') {
      this.queryParams.relations = [];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
        habilitado: 1,
        precio: {
          esPrincipal: 1,
        },
        articulo: {
          esCurso: 1,
          curso: {
            habilitado: 1,
            modulosCurso: {
              temas: {}
            }
          }
        },
        empresa: {},
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
        habilitado: 1,
        precio: {
          esPrincipal: 1,
        },
        articulo: {
          esCurso: 1,
          curso: {
            habilitado: 1,
            nombre: `Like(\"%25${busqueda}%25\")`,
            modulosCurso: {
              temas: {}
            }
          }
        },
        empresa: {},
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  registrarCursoUsuario(registroCurso, intentoPago: string) {
    const cursoRegistrado$ = this._cursoUsuarioRestService.registrarCursoUsuario(registroCurso.articulo.curso.id, this.idUsuario, registroCurso.id);
    cursoRegistrado$
      .subscribe(
        (respuesta) => {
          const exitoCrearToast: Toast = {
            type: 'success',
            title: this._translocoService.translate('generales.toasters.toastExitoCrear.title'),
            body: this._translocoService.translate('generales.toasters.toastExitoCrearVacio.body'),
            showCloseButton: true
          };
          this._toasterService.pop(
            exitoCrearToast
          );
        },
        (error) => {

          const errorCrearToast: Toast = {
            type: 'error',
            title: this._translocoService.translate('generales.toasters.toastErrorCrear.title'),
            body: this._translocoService.translate('generales.toasters.toastErrorCrearVacio.body'),
            showCloseButton: true
          };
          this._toasterService.pop(
            errorCrearToast
          );
          console.error(error);
          this.reversar(intentoPago); // validar que no se muera para no tener que reversar
        }
      );
  }

  abrirModalPedido(articuloPorEmpresa) {
    this.establecerRegistroActual(articuloPorEmpresa.id);
    const dialogRef = this.dialog.open(CrearEditarPedidoCursoComponent, {
      width: '600px',
      data: {
        producto: articuloPorEmpresa,
        precio: articuloPorEmpresa.precios[0].valor,
        usuario: this.usuario,
        idUsuario: this._auth0Service.datosUsuario.user_id,
        pedidoCurso: undefined,
        horarioServicio: undefined
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((intentoCreado) => {
      if (intentoCreado) {
        this.registrarCursoUsuario(articuloPorEmpresa, intentoCreado.paymentIntent.id);
      }
    }, error => {
      console.error({error, mensaje: 'Error creando pedido', data: articuloPorEmpresa});
    });
  }

  private reversar(intentoPago) {
    this._stripeService.reversarTarjeta(intentoPago)
      .subscribe(
        respuesta => {
          this._toasterService.pop(
            crearToasterGeneral(this._translocoService, 'success', 'generales.toasters.toastExitoReverso')
          );
          console.log('Se reversó', respuesta);
        },
        errorStripe => {
          console.error({error: errorStripe, mensaje: 'Error reversando', data: intentoPago});
        }
      );
  }
}

