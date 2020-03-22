import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import {
  CONFIGURACION_EMPRESA,
  ConfiguracionFormluarioEmpresa,
} from '../../componentes/formularios/empresa-formulario/empresa-formulario.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { EmpresaRestService } from '../../../../servicios/rest/empresa-rest.service';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import { EmpresaInterface } from '../../../../interfaces/empresa.interface';
import {
  toastErrorCrearEmpresa,
  toastErrorEditarEmpresa,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { SubempresaRestService } from '../../../../servicios/rest/subempresa-rest.service';
import { setearEmpresaSubempresa } from '../../../subempresa/funciones/setear-empresa-subempresa';
import { TIPOS_EMPRESA_ENUM } from '../../tipos-empresa-enums';

@Component({
  selector: 'ml-crear-editar-empresa',
  templateUrl: './crear-editar-empresa.component.html',
  styleUrls: ['./crear-editar-empresa.component.sass'],
})
export class CrearEditarEmpresaComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioEmpresaValido: boolean;
  empresaCrearEditar: EmpresaInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeandoEmpresa: EstaTipeandoComponent;
  configuracionEmpresa: ConfiguracionFormluarioEmpresa;

  constructor(
    public dialogo: MatDialogRef<CrearEditarEmpresaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      subempresaEmpresaPadre;
      empresa: EmpresaInterface;
      idInformacionTributaria;
    },
    private readonly _toasterService: ToasterService,
    private readonly _empresaRestService: EmpresaRestService,
    private readonly _subempresaRestService: SubempresaRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.empresa ? 'Llene' : 'Modifique'
    } los campos necesarios para `;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionEmpresa = CONFIGURACION_EMPRESA();
    if (this.data.empresa) {
      this.formularioEmpresaValido = true;
      const empresaEditar = this.data.empresa;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionEmpresa,
        empresaEditar,
      );
    } else {
      this.configuracionEmpresa.EsEstacionServicioPropia.hidden = true;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionEmpresa,
        {},
      );
    }
  }
  ngAfterViewInit(): void {
    this.componenteEstaTipeandoEmpresa.ocultarTipeando = true;
  }

  OcultarEstaTipeando() {
    this.componenteEstaTipeandoEmpresa.eliminarAnimacion();
  }

  mostrarEstaTipeando() {
    this.componenteEstaTipeandoEmpresa.ocultarTipeando = false;
    this.componenteEstaTipeandoEmpresa.seVaAnimacion = false;
  }

  establecerFormularioEmpresaInvalido() {
    this.formularioEmpresaValido = false;
    this.mostrarEstaTipeando();
  }

  validarFormularioEmpresa(empresa) {
    if (empresa) {
      this.empresaCrearEditar = empresa;
      this.formularioEmpresaValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioEmpresaValido = false;
      this.empresaCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.empresaCrearEditar) {
      this.empresaCrearEditar.obligadoContabilidad =
        +this.empresaCrearEditar.obligadoContabilidad === 1;
      if (this.data.empresa) {
        const datos = {
          empresa: this.empresaCrearEditar,
          idEmpresa: this.data.empresa.id,
          idInformacionTributaria: this.data.idInformacionTributaria,
        };
        this._subempresaRestService
          .editarEmpresaInformacionTributaria(datos)
          .subscribe(
            (r: EmpresaInterface) => {
              r.obligadoContabilidad = r.obligadoContabilidad ? 1 : 0;
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop(toastExitoEditar);
              this.dialogo.close(r);
            },
            err => {
              this._cargandoService.deshabilitarCargando();
              console.error(err);
              this._toasterService.pop(toastErrorEditarEmpresa);
            },
          );
      } else {
        this.empresaCrearEditar.habilitado = true;
        const datos = {
          empresaHijo: this.empresaCrearEditar,
          empresaSubempresaPadre: this.data.subempresaEmpresaPadre,
        };
        this._subempresaRestService.guardarEmpresaSubemrpesa(datos).subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoCrear);
            this.dialogo.close(setearEmpresaSubempresa(r));
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorCrearEmpresa);
          },
        );
      }
    } else {
      this.dialogo.close();
      this._cargandoService.deshabilitarCargando();
    }
  }
}
