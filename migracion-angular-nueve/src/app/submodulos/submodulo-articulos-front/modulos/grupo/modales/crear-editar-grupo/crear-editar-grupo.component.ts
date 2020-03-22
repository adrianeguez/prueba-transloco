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
import { GrupoRestService } from '../../../../servicios/rest/grupo-rest.service';
import { RutaGestionGruposComponent } from '../../rutas/ruta-gestion-grupos/ruta-gestion-grupos.component';
// tslint:disable-next-line: max-line-length
import {
  generarToasterErrorCrearCampoRepetido,
  generarToasterErrorEditarCampoRepetido,
  toastExitoCrear,
  toastExitoEditar,
} from './../../../../../../constantes/mensajes-toaster';
import { GrupoInterface } from './../../../../interfaces/grupo.interface';
import {
  ConfiguracionFormluarioGrupo,
  CONFIGURACION_GRUPO,
} from './../../componentes/grupo-formulario/grupo-formulario.component';

@Component({
  selector: 'ml-crear-editar-grupo',
  templateUrl: './crear-editar-grupo.component.html',
  styleUrls: ['./crear-editar-grupo.component.sass'],
})
export class CrearEditarGrupoComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  grupoCrearEditar: GrupoInterface;
  @ViewChild(EstaTipeandoComponent, { static: false })
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionGrupo: ConfiguracionFormluarioGrupo;

  constructor(
    public dialogo: MatDialogRef<RutaGestionGruposComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { grupo: GrupoInterface },
    private readonly _toasterService: ToasterService,
    private readonly _grupoRestService: GrupoRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {
    this.descripcion = `${
      !this.data.grupo ? 'Llene' : 'Modifique'
    } los campos necesarios para el grupo.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionGrupo = CONFIGURACION_GRUPO();
    if (this.data.grupo) {
      const grupoEditar = this.data.grupo;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionGrupo,
        grupoEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionGrupo,
        {},
      );
    }
  }

  ngAfterViewInit() {
    this.componenteEstaTipeando.ocultarTipeando = true;
  }

  ocultarEstaTipeando() {
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

  validarFormulario(grupo) {
    if (grupo) {
      this.grupoCrearEditar = grupo;
      this.formularioValido = true;
      this.ocultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.grupoCrearEditar = {};
      this.ocultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.grupo) {
      this._grupoRestService
        .updateOne(this.data.grupo.id, this.grupoCrearEditar)
        .subscribe(
          (respuesta: GrupoInterface) => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            this.dialogo.close(respuesta);
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
            this._toasterService.pop(
              generarToasterErrorEditarCampoRepetido(
                'Código o Código auxiliar',
              ),
            );
          },
        );
    } else {
      this.grupoCrearEditar.habilitado = true;
      this._grupoRestService.create(this.grupoCrearEditar).subscribe(
        respuesta => {
          respuesta.habilitado = +respuesta.habilitado;
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastExitoCrear);
          this.dialogo.close(respuesta);
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
          this._toasterService.pop(
            generarToasterErrorCrearCampoRepetido('Código o Código auxiliar'),
          );
        },
      );
    }
  }
}
