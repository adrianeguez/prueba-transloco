import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {PedidoDetalleInterface} from '../../../../interfaces/pedido-detalle.interface';
import {ToasterService} from 'angular2-toaster';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DescuentoInterface} from '../../../../interfaces/descuento.interface';
import {ModalDescuentosComponent} from '../../modal-descuentos/modal-descuentos/modal-descuentos.component';
import {CargandoService} from 'man-lab-ng';
import {ValorUnitarioInterface} from '../../../../interfaces/valor-unitario.interface';
import {ModalListaDescuentosArticuloModule} from '../modal-lista-descuentos-articulo.module';
// tslint:disable-next-line:max-line-length
import {FilterBodegaComponent} from '../../../../../submodulo-empresa-front/componentes/filters/filter-bodega/filter-bodega/filter-bodega.component';
// tslint:disable-next-line:max-line-length
import {ListaDescuentosArticulosComponent} from '../../../lista-descuentos-articulo/lista-descuentos-articulos/lista-descuentos-articulos.component';
import {DescuentoVentaEntityInterface} from '../../../../servicios/rest/descuento-venta/interfaces/descuento-venta-entity.interface';
import {DescuentoVentaRestSqljsService} from '../../../../servicios/rest/descuento-venta/descuento-venta-rest-sqljs.service';

@Component({
  selector: 'ml-modal-lista-descuentos-articulo',
  templateUrl: './modal-lista-descuentos-articulo.component.html',
  styleUrls: ['./modal-lista-descuentos-articulo.component.scss']
})
export class ModalListaDescuentosArticuloComponent implements OnInit {

  @ViewChild(
    ListaDescuentosArticulosComponent,
    {static: true}
  ) listaDescuentosArticulos: ListaDescuentosArticulosComponent;

  constructor(
    protected _toasterServicePrivate: ToasterService,
    public matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {detalleCompra: PedidoDetalleInterface},
    public dialogo: MatDialogRef<ModalListaDescuentosArticuloComponent>,
    private _cargandoService: CargandoService,
    private  readonly  _descuentoVentaRestSqljsService: DescuentoVentaRestSqljsService,
  ) { }

  ngOnInit() {
    this.listaDescuentosArticulos.descuentosArticulo = [...this.data.detalleCompra.descuentos];
  }

  abrirModalCrearDescuentoArticulo() {
    const base = this.enviarBaseArticulo();
    const ventanaModal = this.matDialog.open(ModalDescuentosComponent, {
      width: '800px',
      data: {
        descuentos: this.data.detalleCompra.descuentos,
        base,
      }
    });

    const resultadoModal$ = ventanaModal.afterClosed();
    resultadoModal$.subscribe(async (descuentoIngresado: DescuentoInterface) => {
      if (descuentoIngresado) {
        try {
          descuentoIngresado.base = base;
          descuentoIngresado.orden = this.listaDescuentosArticulos.descuentosArticulo.length + 1;
          this.listaDescuentosArticulos.descuentosArticulo.unshift(descuentoIngresado);
        } catch (e) {
          console.error(e);
          this._toasterServicePrivate.pop('error', 'Error', 'Error al guardar el descuento');
        }
      }
    });
  }

  setearDescuentoEntity(descuentoAIngresar) {
    const descuentoACrearEditar: DescuentoVentaEntityInterface = {};
    descuentoACrearEditar.porcentaje = +descuentoAIngresar.descuentoPorcentual;
    descuentoACrearEditar.valor = +descuentoAIngresar.valor;
    descuentoACrearEditar.razon = descuentoAIngresar.motivo;
    descuentoACrearEditar.base = descuentoAIngresar.base;
    descuentoACrearEditar.orden = descuentoAIngresar.orden;
    descuentoACrearEditar.ventaDetalle = this.data.detalleCompra.id as number;
    if (descuentoAIngresar.id) {
      descuentoACrearEditar.id = descuentoAIngresar.id;
    }
    return descuentoACrearEditar;
  }
  enviarBaseArticulo() {
    const ultimoDescuento = this.listaDescuentosArticulos.descuentosArticulo[0];
    let base;
    if (ultimoDescuento) {
      base = ultimoDescuento.base - ultimoDescuento.valor;
      return base;
    } else {
      const cantidad = +this.data.detalleCompra.cantidad;
      const valorUnitario = this.data.detalleCompra.valorUnitario as ValorUnitarioInterface;
      base = (cantidad * valorUnitario.valorUnitario);
      return base;
    }
  }

  async guardarDescuentos() {
    try {
      this._cargandoService.habilitarCargando();
      this.listaDescuentosArticulos.descuentosArticulo.map( async (descuento, indice) => {
        const descuentoGuardado = await this._descuentoVentaRestSqljsService
          .repository()
          .save({...this.setearDescuentoEntity({...descuento})});
        descuento.id = descuentoGuardado.id;
        return descuento;
      });
      console.log(this.listaDescuentosArticulos.descuentosArticulo);
      this.dialogo.close(this.listaDescuentosArticulos.descuentosArticulo);
      this._cargandoService.deshabilitarCargando();
    } catch (e) {
      console.error(e);
    }
  }
}
