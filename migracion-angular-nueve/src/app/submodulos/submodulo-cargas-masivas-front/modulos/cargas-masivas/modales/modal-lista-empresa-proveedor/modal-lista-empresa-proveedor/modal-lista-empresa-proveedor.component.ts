import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CargandoService } from 'man-lab-ng';
import {FilterEmpresaProveedorComponent} from '../../../../../../submodulo-empresa-front/componentes/filters/filter-empresa-proveedor/filter-empresa-proveedor/filter-empresa-proveedor.component';
import {EmpresaProveedoresInterface} from '../../../../../../submodulo-empresa-front/interfaces/empresa-proveedores.interface';

@Component({
  selector: 'app-modal-lista-empresa-proveedor',
  templateUrl: './modal-lista-empresa-proveedor.component.html',
  styleUrls: ['./modal-lista-empresa-proveedor.component.sass'],
})
export class ModalListaEmpresaProveedorComponent implements OnInit {
  @ViewChild(FilterEmpresaProveedorComponent, { static: true })
  filterEmpresaProveedores: FilterEmpresaProveedorComponent;

  idEmpresa;

  totalRegistros: number;

  empresasProveedoresEncontradas: EmpresaProveedoresInterface[] = [];

  columnas = [
    { field: 'razonSocial', header: 'Razón Social' },
    { field: 'ruc', header: 'R.U.C.' },
    { field: 'calificacionTotal', header: 'Calificación total' },
  ];

  mostrarSelectEstado = false;

  constructor(
    public dialogo: MatDialogRef<ModalListaEmpresaProveedorComponent>,
    private _cargandoService: CargandoService,
    @Inject(MAT_DIALOG_DATA) public data: { idEmpresa },
  ) {}

  ngOnInit() {
    this.idEmpresa = this.data.idEmpresa;
  }

  setearEmpresasProveedores(
    empresaProveedores: [EmpresaProveedoresInterface[], number],
  ) {
    this.empresasProveedoresEncontradas = empresaProveedores[0];
    this.totalRegistros = empresaProveedores[1];
  }

  setearSkip(skip) {
    this.filterEmpresaProveedores.skip = skip;
    this.filterEmpresaProveedores.buscarPorRUCRazonSocialEstado();
  }

  obtenerEmpresaProveedorSeleccionado(
    eventoEmpresaProveedor: EmpresaProveedoresInterface,
  ) {
    this._cargandoService.habilitarCargando();
    this.dialogo.close(eventoEmpresaProveedor);
    this._cargandoService.deshabilitarCargando();
  }
}
