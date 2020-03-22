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
import {
  CONFIGURACION_EMPRESAPROVEEDORES,
  ConfiguracionFormluarioEmpresaProveedores,
} from '../../componentes/empresa-proveedores-formulario/empresa-proveedores-formulario.component';
import { EmpresaProveedoresRestService } from '../../../../servicios/rest/empresa-proveedores-rest.service';
import { EmpresaProveedoresInterface } from '../../../../interfaces/empresa-proveedores.interface';
import { EmpresaInterface } from '../../../../interfaces/empresa.interface';
import {
  generarToasterErrorCrearCampoRepetido,
  generarToasterErrorEditarCampoRepetido,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { EdificioRestService } from '../../../../servicios/rest/edificio-rest.service';
import { ESTADOS } from '../../../../../../enums/estados';

@Component({
  selector: 'ml-crear-editar-empresa-proveedores',
  templateUrl: './crear-editar-empresa-proveedores.component.html',
  styleUrls: ['./crear-editar-empresa-proveedores.component.sass'],
})
export class CrearEditarEmpresaProveedoresComponent
  implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  empresaProveedoresCrearEditar: EmpresaProveedoresInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionEmpresaProveedores: ConfiguracionFormluarioEmpresaProveedores;

  constructor(
    public dialogo: MatDialogRef<CrearEditarEmpresaProveedoresComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { empresaProveedores: EmpresaProveedoresInterface; idEmpresa },
    private readonly _toasterService: ToasterService,
    private readonly _empresaProveedoresRestService: EmpresaProveedoresRestService,
    private readonly _cargandoService: CargandoService,
    private readonly _edifcioRestService: EdificioRestService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.empresaProveedores ? 'Llene' : 'Modifique'
    } los campos necesarios para la empresa proveedor.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionEmpresaProveedores = CONFIGURACION_EMPRESAPROVEEDORES();
    this.configuracionEmpresaProveedores.RazonSocial.disabled = true;
    this.configuracionEmpresaProveedores.Ruc.disabled = true;
    if (this.data.empresaProveedores) {
      const empresaProveedoresEditar: EmpresaProveedoresInterface = this.data
        .empresaProveedores;
      this.configuracionEmpresaProveedores.RazonSocial.valor = (empresaProveedoresEditar.empresaProveedor as EmpresaInterface).razonSocial;
      this.configuracionEmpresaProveedores.Ruc.valor = (empresaProveedoresEditar.empresaProveedor as EmpresaInterface).ruc;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionEmpresaProveedores,
        empresaProveedoresEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionEmpresaProveedores,
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

  validarFormulario(empresaProveedores) {
    if (empresaProveedores) {
      delete empresaProveedores.razonSocial;
      delete empresaProveedores.ruc;
      this.empresaProveedoresCrearEditar = empresaProveedores;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.empresaProveedoresCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.empresaProveedores) {
      this._empresaProveedoresRestService
        .updateOne(
          this.data.empresaProveedores.id,
          this.empresaProveedoresCrearEditar,
        )
        .subscribe(
          async r => {
            r.habilitado = r.habilitado ? ESTADOS.Activo : ESTADOS.Inactivo;
            const respuestaEdificios = await this.buscarEdificios(
              (r.empresaProveedor as EmpresaInterface).id,
            );
            (r.empresaProveedor as EmpresaInterface).edificios =
              respuestaEdificios[0];
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(
              generarToasterErrorEditarCampoRepetido('empresa'),
            );
          },
        );
    } else {
      this.empresaProveedoresCrearEditar.habilitado = true;
      this.empresaProveedoresCrearEditar.empresa = this.data.idEmpresa;
      this._empresaProveedoresRestService
        .create(this.empresaProveedoresCrearEditar)
        .subscribe(
          async (r: EmpresaProveedoresInterface) => {
            r.habilitado = r.habilitado ? ESTADOS.Activo : ESTADOS.Inactivo;
            const respuestaEdificios = await this.buscarEdificios(
              (r.empresaProveedor as EmpresaInterface).id,
            );
            (r.empresaProveedor as EmpresaInterface).edificios =
              respuestaEdificios[0];
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoCrear);
            this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(
              generarToasterErrorCrearCampoRepetido('empresa'),
            );
          },
        );
    }
  }

  async buscarEdificios(idEmpresa) {
    const consulta = {
      where: {
        esMatriz: 1,
        empresa: idEmpresa,
      },
      relations: ['direccion'],
    };
    const promesaEdificios = this._edifcioRestService
      .findAll('criterioBusqueda=' + JSON.stringify(consulta))
      .toPromise();
    return await promesaEdificios;
  }
}
