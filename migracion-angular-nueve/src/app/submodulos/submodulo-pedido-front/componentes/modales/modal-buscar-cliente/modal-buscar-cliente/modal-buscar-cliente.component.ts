import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {
  InformacionTributariaRestService,
  RespuestaBuscarEmpresaOInformacionTributariaPorCedulaRucOPasaporte
} from '../../../../../submodulo-empresa-front/servicios/rest/informacion-tributaria-rest.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { InformacionTributariaInterface } from '../../../../../submodulo-empresa-front/interfaces/informacion-tributaria.interface';
import {CargandoService} from 'man-lab-ng';
import {FilterClienteComponent} from '../../../filters/filter-cliente/filter-cliente/filter-cliente.component';
import {TablaClientesComponent} from '../../../tablas/tabla-clientes/tabla-clientes/tabla-clientes.component';

@Component({
  selector: 'mlab-modal-buscar-cliente-proveedor',
  templateUrl: './modal-buscar-cliente.component.html',
  styleUrls: ['./modal-buscar-cliente.component.scss'],
})
export class ModalBuscarClienteComponent implements OnInit {
  @ViewChild(FilterClienteComponent, {static: true})
  filterCliente: FilterClienteComponent;

  @ViewChild(TablaClientesComponent, {static: true})
  tablaClientes: TablaClientesComponent;

  totalRegistros: number;

  clientesEncontrados: RespuestaBuscarEmpresaOInformacionTributariaPorCedulaRucOPasaporte[] = [];

  columnas = [
    { field: 'documento', header: '# Documento' },
    { field: 'razonSocial', header: 'Razón social' },
  ];

  @Input() esVenta: boolean;
  constructor(
    public dialogo: MatDialogRef<ModalBuscarClienteComponent>,
    private readonly _cargandoService: CargandoService,
    @Inject(MAT_DIALOG_DATA) public data: { esVenta: boolean, informacionTributaria: InformacionTributariaInterface},
  ) {}

  ngOnInit() {
    this.esVenta = this.data.esVenta;
  }

  setearClientes(clientes) {
    if (clientes.length === 2) {
      this.clientesEncontrados = clientes[0];
      this.totalRegistros = clientes[1];
    } else {
      this.clientesEncontrados = clientes.informacionTributaria;
      this.totalRegistros = this.clientesEncontrados.length;
    }
  }

  setearSkip(skip) {
    this.filterCliente.skip = skip;
    if (!this.filterCliente.informacionTributaria) {
      this.filterCliente.buscarClienteOProveedorPorCedulaRucOPasaporte();
    }
  }

  obtenerClienteSeleccionado(
    respuesta: InformacionTributariaInterface,
  ) {
    this._cargandoService.habilitarCargando();
    this.dialogo.close(respuesta);
    this._cargandoService.deshabilitarCargando();
  }
}
