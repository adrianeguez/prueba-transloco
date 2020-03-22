import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { TipoVendedorInterface } from '../../../../interfaces/tipo-vendedor-interface';
import { TipoVendedorRestService } from '../../../../servicios/rest/tipo-vendedor-rest.service';
import {
  ConfiguracionFormluarioTipoVendedor,
  CONFIGURACION_TIPOVENDEDOR,
} from '../../componentes/tipo-vendedor-formulario/tipo-vendedor-formulario.component';
import { RutaGestionTipoVendedorComponent } from '../../rutas/ruta-gestion-tipo-vendedor/ruta-gestion-tipo-vendedor.component';
import {generarToasterErrorConMensaje} from '../../../../constantes/mensajes-toast';

@Component({
  selector: 'ml-crear-editar-tipo-vendedor',
  templateUrl: './crear-editar-tipo-vendedor.component.html',
  styleUrls: ['./crear-editar-tipo-vendedor.component.scss'],
})
export class CrearEditarTipoVendedorComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  tipoVendedorCrearEditar: TipoVendedorInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionTipoVendedor: ConfiguracionFormluarioTipoVendedor;

  constructor(
    public dialogo: MatDialogRef<RutaGestionTipoVendedorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      tipoVendedor: TipoVendedorInterface;
      idEmpresa: number | string;
    },
    private readonly _toasterService: ToasterService,
    private readonly _tipoVendedorRestService: TipoVendedorRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {
    this.descripcion = `${
      !this.data.tipoVendedor ? 'Llene' : 'Modifique'
    } los campos necesarios para el tipo vendedor.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionTipoVendedor = CONFIGURACION_TIPOVENDEDOR();

    if (this.data.tipoVendedor) {
      const tipoVendedorEditar = this.data.tipoVendedor;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionTipoVendedor,
        tipoVendedorEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionTipoVendedor,
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

  validarFormulario(tipoVendedor) {
    if (tipoVendedor) {
      this.tipoVendedorCrearEditar = tipoVendedor;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.tipoVendedorCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.tipoVendedor) {
      this._tipoVendedorRestService
        .updateOne(this.data.tipoVendedor.id, this.tipoVendedorCrearEditar)
        .subscribe(
          r => {
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
      this.tipoVendedorCrearEditar.empresa = this.data.idEmpresa;
      this.tipoVendedorCrearEditar.habilitado = true;
      this._tipoVendedorRestService
        .create(this.tipoVendedorCrearEditar)
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
            this._toasterService.pop(generarToasterErrorConMensaje('Error, talvez el código ya se encuentra registrado '));
          },
        );
    }
  }
}
