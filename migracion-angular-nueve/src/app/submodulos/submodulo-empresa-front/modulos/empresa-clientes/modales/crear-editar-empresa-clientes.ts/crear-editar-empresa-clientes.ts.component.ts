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
  generarToasterErrorCrearCampoRepetido,
  generarToasterErrorEditarCampoRepetido,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { EmpresaClientesInterface } from '../../../../interfaces/empresa-clientes.interface';
import {
  CONFIGURACION_EMPRESACLIENTES,
  ConfiguracionFormluarioEmpresaClientes,
} from '../../componentes/empresa-clientes-formulario/empresa-clientes-formulario.component';
import { EmpresaClientesRestService } from '../../../../servicios/rest/empresa-clientes-rest.service';
import { EmpresaInterface } from '../../../../interfaces/empresa.interface';
import { ESTADOS } from '../../../../../../enums/estados';
import { EdificioRestService } from '../../../../servicios/rest/edificio-rest.service';

@Component({
  selector: 'ml-crear-editar-empresa-clientes.ts',
  templateUrl: './crear-editar-empresa-clientes.ts.component.html',
  styleUrls: ['./crear-editar-empresa-clientes.ts.component.sass'],
})
export class CrearEditarEmpresaClientesComponent
  implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  empresaClientesCrearEditar: EmpresaClientesInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionEmpresaClientes: ConfiguracionFormluarioEmpresaClientes;

  constructor(
    public dialogo: MatDialogRef<CrearEditarEmpresaClientesComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { empresaClientes: EmpresaClientesInterface; idEmpresa },
    private readonly _toasterService: ToasterService,
    private readonly _empresaClientesRestService: EmpresaClientesRestService,
    private readonly _cargandoService: CargandoService,
    private readonly _edifcioRestService: EdificioRestService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.empresaClientes ? 'Llene' : 'Modifique'
    } los campos necesarios para la empresa cliente.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionEmpresaClientes = CONFIGURACION_EMPRESACLIENTES();
    this.configuracionEmpresaClientes.RazonSocial.disabled = true;
    this.configuracionEmpresaClientes.Ruc.disabled = true;
    if (this.data.empresaClientes) {
      const empresaClientesEditar: EmpresaClientesInterface = this.data
        .empresaClientes;
      this.configuracionEmpresaClientes.RazonSocial.valor = (empresaClientesEditar.empresaCliente as EmpresaInterface).razonSocial;
      this.configuracionEmpresaClientes.Ruc.valor = (empresaClientesEditar.empresaCliente as EmpresaInterface).ruc;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionEmpresaClientes,
        empresaClientesEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionEmpresaClientes,
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

  validarFormulario(empresaClientes) {
    if (empresaClientes) {
      delete empresaClientes.razonSocial;
      delete empresaClientes.ruc;
      this.empresaClientesCrearEditar = empresaClientes;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.empresaClientesCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.empresaClientes) {
      this._empresaClientesRestService
        .updateOne(
          this.data.empresaClientes.id,
          this.empresaClientesCrearEditar,
        )
        .subscribe(
          async (r: EmpresaClientesInterface) => {
            r.habilitado = r.habilitado ? ESTADOS.Activo : ESTADOS.Inactivo;
            const respuestaEdificios = await this.buscarEdificios(
              (r.empresaCliente as EmpresaInterface).id,
            );
            (r.empresaCliente as EmpresaInterface).edificios =
              respuestaEdificios[0];
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoCrear);
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
      this.empresaClientesCrearEditar.habilitado = true;
      this.empresaClientesCrearEditar.empresa = this.data.idEmpresa;
      this._empresaClientesRestService
        .create(this.empresaClientesCrearEditar)
        .subscribe(
          async (r: EmpresaClientesInterface) => {
            r.habilitado = r.habilitado ? ESTADOS.Activo : ESTADOS.Inactivo;
            const respuestaEdificios = await this.buscarEdificios(
              (r.empresaCliente as EmpresaInterface).id,
            );
            (r.empresaCliente as EmpresaInterface).edificios =
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
