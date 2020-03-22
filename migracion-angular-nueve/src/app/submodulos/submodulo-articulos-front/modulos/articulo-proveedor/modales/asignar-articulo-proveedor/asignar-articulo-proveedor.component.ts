import {Component, Inject, OnInit} from '@angular/core';
import {ArticulosRestService} from '../../../../servicios/rest/articulos-rest.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {ArticulosProveedorRestService} from '../../../../servicios/rest/articulo-proveedor-rest.service';
import {ArticuloInterface} from '../../../../interfaces/articulo.interface';
import {ArticuloProveedorInterface} from '../../../../interfaces/articulo-proveedor.interface';

@Component({
  selector: 'app-asignar-articulo-proveedor',
  templateUrl: './asignar-articulo-proveedor.component.html',
  styleUrls: ['./asignar-articulo-proveedor.component.scss']
})
export class AsignarArticuloProveedorComponent implements OnInit {
  articulos: ArticuloInterface;
  totalElementos = 0;
  columanas = [
    { field: 'codigo', header: 'Código' },
    { field: 'nombreCorto', header: 'Nombre' },
  ];
  articulosSeleccionados: ArticuloInterface[] = [];
  constructor(private readonly _articuloProveedorRestService: ArticulosProveedorRestService,
              public dialogo: MatDialogRef<AsignarArticuloProveedorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { idEmpresaProveedor },
              private _cargandoService: CargandoService,
              private _toasterService: ToasterService) { }

  ngOnInit() {
    this.cargarTodosArticulos();
  }

  metodoCrearEditar() {
    const articulosProveedorAGuardar: ArticuloProveedorInterface[] = this.articulosSeleccionados
      .map(
      (articulo: ArticuloInterface) => {
        return {
          articulo: articulo.id,
          empresaProveedores: this.data.idEmpresaProveedor,
          habilitado: 1
        };
      }
    );
    this._articuloProveedorRestService.create(articulosProveedorAGuardar)
      .subscribe(
        creados => {
          console.log('creado correctament', creados),
            this.dialogo.close('ok');
        }
      );
  }

  cargarTodosArticulos() {
    this._articuloProveedorRestService
      .filtartArticulosProveedor(this.data.idEmpresaProveedor)
      .subscribe(
        articulosEncontrados => {
          this.articulos = articulosEncontrados[0];
          this.totalElementos = articulosEncontrados [1];
        },
        error => {
          console.error(error);
        }
      );
  }
  buscarPorCodigoArticulo(value: string) {
    this.articulosSeleccionados = [];
    let busquedaArticuloProveedor$;
    if ( value === '') {
      busquedaArticuloProveedor$ = this._articuloProveedorRestService.filtartArticulosProveedor(this.data.idEmpresaProveedor);
    } else {
      busquedaArticuloProveedor$ = this._articuloProveedorRestService.filtartArticulosProveedor(this.data.idEmpresaProveedor, value);
    }
    this._cargandoService.habilitarCargando();
    busquedaArticuloProveedor$
      .subscribe(
        articulosEncontrados => {
          this._cargandoService.deshabilitarCargando();
          this.articulos = articulosEncontrados[0];
          this.totalElementos = articulosEncontrados [1];
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
        }
      );
  }
}
