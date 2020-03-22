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
import { SubgrupoRestService } from '../../../../servicios/rest/subgrupo-rest.service';
// tslint:disable-next-line: max-line-length
import {
  ConfiguracionFormluarioSubgrupo,
  CONFIGURACION_SUBGRUPO,
} from '../../componentes/subgrupo-formulario/subgrupo-formulario.component';
import { RutaGestionSubgruposComponent } from '../../rutas/ruta-gestion-subgrupos/ruta-gestion-subgrupos.component';
// tslint:disable-next-line: max-line-length
import {
  generarToasterErrorCrearCampoRepetido,
  generarToasterErrorEditarCampoRepetido,
  toastExitoCrear,
  toastExitoEditar,
} from './../../../../../../constantes/mensajes-toaster';
import { SubgrupoInterface } from './../../../../interfaces/subgrupo.interface';

@Component({
  selector: 'ml-crear-editar-subgrupo',
  templateUrl: './crear-editar-subgrupo.component.html',
  styleUrls: ['./crear-editar-subgrupo.component.sass'],
})
export class CrearEditarSubgrupoComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  @ViewChild(EstaTipeandoComponent, { static: false })
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionSubgrupo: ConfiguracionFormluarioSubgrupo;
  subgrupoCrearEditar: SubgrupoInterface; // revisar error

  constructor(
    public dialogo: MatDialogRef<RutaGestionSubgruposComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { subgrupo: SubgrupoInterface; idGrupo },
    private readonly _toasterService: ToasterService,
    private readonly _subgrupoRestService: SubgrupoRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {
    this.descripcion = `${
      !this.data.subgrupo ? 'Llene' : 'Modifique'
    } los campos necesarios para el subgrupo.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionSubgrupo = CONFIGURACION_SUBGRUPO();
    if (this.data.subgrupo) {
      const grupoEditar = this.data.subgrupo;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionSubgrupo,
        grupoEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionSubgrupo,
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

  validarFormulario(subgrupo) {
    if (subgrupo) {
      this.subgrupoCrearEditar = subgrupo;
      this.formularioValido = true;
      this.ocultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.subgrupoCrearEditar = {};
      this.ocultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.subgrupo) {
      delete this.subgrupoCrearEditar.esProcesado;
      this._subgrupoRestService
        .updateOne(this.data.subgrupo.id, this.subgrupoCrearEditar)
        .subscribe(
          (respuesta: SubgrupoInterface) => {
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
      this.subgrupoCrearEditar.grupo = this.data.idGrupo;
      this.subgrupoCrearEditar.habilitado = true;
      this._subgrupoRestService.create(this.subgrupoCrearEditar).subscribe(
        (respuesta: SubgrupoInterface) => {
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
