import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FilterProveedorComponent} from '../../../filters/filter-proveedor/filter-proveedor/filter-proveedor.component';
import {EmpresaProveedorInterface} from '../../../../servicios/rest/empresa-proveedores/interfaces/empresa-proveedor.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CargandoService} from 'man-lab-ng';

@Component({
  selector: 'app-modal-buscar-proveedor',
  templateUrl: './modal-buscar-proveedor.component.html',
  styleUrls: ['./modal-buscar-proveedor.component.scss']
})
export class ModalBuscarProveedorComponent implements OnInit {
  @ViewChild(FilterProveedorComponent, {static: true})
  filterProveedor: FilterProveedorComponent;

  totalRegistros: number;

  proveedoresEncontrados: EmpresaProveedorInterface[] = [];

  columnas = [
    { field: 'nombreComercial', header: 'Nombre comercial' },
    { field: 'ruc', header: 'R.U.C.' },
  ];

  constructor(
    public dialogo: MatDialogRef<ModalBuscarProveedorComponent>,
    private readonly _cargandoService: CargandoService,
    @Inject(MAT_DIALOG_DATA) public data: { idEmpresa },
  ) { }

  ngOnInit() {}

  setearProveedores(proveedores) {
    this.proveedoresEncontrados = proveedores[0].filter((proveedor) => {
      return proveedor.empresa.id === this.data.idEmpresa;
    });
    this.totalRegistros = this.proveedoresEncontrados.length;
  }

  setearSkip(skip) {
    this.filterProveedor.skip = skip;
    this.filterProveedor.buscarPorRazonSocialRuc();
  }

  obtenerProveedorSeleccionado(
    respuesta: EmpresaProveedorInterface,
  ) {
    this._cargandoService.habilitarCargando();
    this.dialogo.close(respuesta);
    this._cargandoService.deshabilitarCargando();
  }

}
