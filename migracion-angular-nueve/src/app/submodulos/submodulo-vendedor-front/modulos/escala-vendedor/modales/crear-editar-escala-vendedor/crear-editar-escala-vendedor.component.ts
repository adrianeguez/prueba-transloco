import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { generarToasterErrorConMensaje } from '../../../../../submodulo-articulos-front/constantes/mensaje-toast';
import { EscalaVendedorInterface } from '../../../../interfaces/escala-vendedor-interface';
import { EscalaVendedorRestService } from '../../../../servicios/rest/escala-vendedor-rest.service';
// tslint:disable-next-line:max-line-length
import {
  ConfiguracionFormluarioEscalaVendedor,
  CONFIGURACION_ESCALAVENDEDOR,
} from '../../componentes/escala-vendedor-formulario/escala-vendedor-formulario.component';
import { RutaGestionEscalaVendedorComponent } from '../../rutas/ruta-gestion-escala-vendedor/ruta-gestion-escala-vendedor.component';
import { validacionMaximoMinimo } from 'src/app/submodulos/submodulo-vendedor-front/funciones/validacion-maximo-minimo/validacion-maximo-minimo';

@Component({
  selector: 'ml-crear-editar-escala-vendedor',
  templateUrl: './crear-editar-escala-vendedor.component.html',
  styleUrls: ['./crear-editar-escala-vendedor.component.scss'],
})
export class CrearEditarEscalaVendedorComponent
  implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  escalaVendedorCrearEditar: EscalaVendedorInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionEscalaVendedor: ConfiguracionFormluarioEscalaVendedor;

  constructor(
    public dialogo: MatDialogRef<RutaGestionEscalaVendedorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      escalaVendedor: EscalaVendedorInterface;
      idEmpresa: number | string;
    },
    private readonly _toasterService: ToasterService,
    private readonly _escalaVendedorRestService: EscalaVendedorRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {
    this.descripcion = `${
      !this.data.escalaVendedor ? 'Llene' : 'Modifique'
    } los campos necesarios para la escala vendedor.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionEscalaVendedor = CONFIGURACION_ESCALAVENDEDOR();

    if (this.data.escalaVendedor) {
      const escalaVendedorEditar = this.data.escalaVendedor;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionEscalaVendedor,
        escalaVendedorEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionEscalaVendedor,
        {},
      );
    }
  }

  ngAfterViewInit(): void {
    this.componenteEstaTipeando.ocultarTipeando = true;
  }

  OcultarEstaTipeando() {
    this.componenteEstaTipeando.eliminarAnimacion();
  }

  mostrarEstaTipeando() {
    this.componenteEstaTipeando.ocultarTipeando = false;
    this.componenteEstaTipeando.seVaAnimacion = false;
  }

  establecerFormularioInvalido() {
    this.formularioValido = false;
    this.mostrarEstaTipeando();
  }

  validarFormulario(escalaVendedor) {
    if (escalaVendedor) {
      this.escalaVendedorCrearEditar = escalaVendedor;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.escalaVendedorCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();

    if (this.data.escalaVendedor) {
      // tslint:disable-next-line: max-line-length
      const validacionMinimoMaximoEscala = validacionMaximoMinimo(
        this.escalaVendedorCrearEditar.minimo,
        this.escalaVendedorCrearEditar.maximo,
      );

      if (validacionMinimoMaximoEscala) {
        this._escalaVendedorRestService
          .updateOne(
            this.data.escalaVendedor.id,
            this.escalaVendedorCrearEditar,
          )
          .subscribe(
            r => {
              r.habilitado = +r.habilitado;
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop(toastExitoEditar);
              this.dialogo.close(r);
            },
            err => {
              this._cargandoService.deshabilitarCargando();
              console.error(err);
              this._toasterService.pop(toastErrorEditar);
            },
          );
      } else {
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(
          generarToasterErrorConMensaje(
            'Error al editar, valores mínimos y máximos',
          ),
        );
      }
    } else {
      this.escalaVendedorCrearEditar.habilitado = true;
      // tslint:disable-next-line: max-line-length
      const validacionMinimoMaximoEscala = validacionMaximoMinimo(
        this.escalaVendedorCrearEditar.minimo,
        this.escalaVendedorCrearEditar.maximo,
      );

      if (validacionMinimoMaximoEscala) {
        this.escalaVendedorCrearEditar.empresa = this.data.idEmpresa;
        this._escalaVendedorRestService
          .create(this.escalaVendedorCrearEditar)
          .subscribe(
            r => {
              r.habilitado = +r.habilitado;
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop(toastExitoCrear);
              this.dialogo.close(r);
            },
            err => {
              this._cargandoService.deshabilitarCargando();
              console.error(err);
              this._toasterService.pop(toastErrorCrear);
            },
          );
      } else {
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(
          generarToasterErrorConMensaje(
            'Error al crear, valores mínimos y máximos',
          ),
        );
      }
    }
  }
}
