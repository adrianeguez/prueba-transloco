import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import { SubempresaRestService } from '../../../../servicios/rest/subempresa-rest.service';
import {
  CONFIGURACION_SUBEMPRESA,
  ConfiguracionFormluarioSubempresa,
} from '../../componentes/subempresa-formulario/subempresa-formulario.component';
import {
  generarToasterErrorCrearCampoRepetido,
  toastExitoCrear,
} from '../../../../../../constantes/mensajes-toaster';
import { setearEmpresaSubempresa } from '../../funciones/setear-empresa-subempresa';
import { SubempresaInterface } from '../../../../interfaces/subempresa.interface';
import { ESTADOS } from '../../../../../../enums/estados';

@Component({
  selector: 'ml-crear-editar-subempresa',
  templateUrl: './crear-editar-subempresa.component.html',
  styleUrls: ['./crear-editar-subempresa.component.sass'],
})
export class CrearEditarSubempresaComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  subempresaCrearEditar: SubempresaInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionSubempresa: ConfiguracionFormluarioSubempresa;

  constructor(
    public dialogo: MatDialogRef<CrearEditarSubempresaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      subempresa;
      subempresaEmpresaPadre;
      idEmpresaPadre;
      nivel;
    },
    private readonly _toasterService: ToasterService,
    private readonly _subempresaRestService: SubempresaRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.subempresa ? 'Llene' : 'Se muestran'
    } los campos necesarios para la Subempresa.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionSubempresa = CONFIGURACION_SUBEMPRESA();
    this.configuracionSubempresa.Nivel.disabled = true;
    this.configuracionSubempresa.Ruc.disabled = true;
    this.configuracionSubempresa.RazonSocial.disabled = true;
    if (this.data.subempresa) {
      this.configuracionSubempresa.EmpresaHijo.disabled = true;
      const subempresaEditar = this.data.subempresa;
      this.configuracionSubempresa.RazonSocial.valor =
        subempresaEditar.empresaActual.razonSocial;
      this.configuracionSubempresa.Ruc.valor =
        subempresaEditar.empresaActual.ruc;
      this.configuracionSubempresa.EmpresaHijo.valor =
        subempresaEditar.empresaActual;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionSubempresa,
        subempresaEditar,
      );
    } else {
      this.configuracionSubempresa.Nivel.valor = this.data
        .subempresaEmpresaPadre
        ? this.data.subempresaEmpresaPadre.nivel + 1
        : this.data.nivel + 1;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionSubempresa,
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

  validarFormulario(subempresa) {
    if (subempresa) {
      delete subempresa.razonSocial;
      delete subempresa.ruc;
      this.subempresaCrearEditar = subempresa;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.subempresaCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this.subempresaCrearEditar.habilitado = ESTADOS.Activo;
    this.subempresaCrearEditar.empresaPadre = this.data.subempresaEmpresaPadre
      ? this.data.subempresaEmpresaPadre.empresaActual.id
      : this.data.idEmpresaPadre;
    this._subempresaRestService.create(this.subempresaCrearEditar).subscribe(
      r => {
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(toastExitoCrear);
        this.dialogo.close(setearEmpresaSubempresa(r));
      },
      err => {
        this._cargandoService.deshabilitarCargando();
        console.error(err);
        this._toasterService.pop(
          generarToasterErrorCrearCampoRepetido('subempresa'),
        );
      },
    );
  }
}
