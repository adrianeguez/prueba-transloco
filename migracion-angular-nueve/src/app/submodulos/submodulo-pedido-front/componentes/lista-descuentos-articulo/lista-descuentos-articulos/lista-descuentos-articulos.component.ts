import {Component, Input, OnInit} from '@angular/core';
import {DescuentoInterface} from '../../../interfaces/descuento.interface';
import {NUMERO_FILAS_TABLAS} from '../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {ModalDescuentosComponent} from '../../modales/modal-descuentos/modal-descuentos/modal-descuentos.component';
import {MatDialog} from '@angular/material/dialog';
import {PreciosInterface} from '../../../../submodulo-empresa-front/interfaces/precios.interface';
import {CargandoService, ModalConfirmacionComponent} from 'man-lab-ng';
import {toastErrorEliminar, toastExitoEliminar} from '../../../../../constantes/mensajes-toaster';
import {ToasterService} from 'angular2-toaster';
import {DescuentoVentaRestSqljsService} from '../../../servicios/rest/descuento-venta/descuento-venta-rest-sqljs.service';

@Component({
  selector: 'ml-lista-descuentos-articulos',
  templateUrl: './lista-descuentos-articulos.component.html',
  styleUrls: ['./lista-descuentos-articulos.component.scss']
})
export class ListaDescuentosArticulosComponent implements OnInit {

  columnas = [
    { field: 'orden', header: 'Orden', width: '10%' },
    { field: 'descuentoPorcentual', header: 'Descuento %', width: '18%' },
    { field: 'valor', header: 'Descuento $', width: '15%' },
    { field: 'motivo', header: 'Motivo', width: '22%' },
    { field: 'base', header: 'Base', width: '15%' },
    { field: 'acciones', header: 'Acciones', width: '20%' },

  ];

  rows = NUMERO_FILAS_TABLAS;
  @Input() descuentosArticulo: DescuentoInterface[] = [];
  constructor(
    public matDialog: MatDialog,
    public dialog: MatDialog,
    protected _cargandoService: CargandoService,
    protected _toasterService: ToasterService,
    private readonly _descuentoVentaRestSqljsService: DescuentoVentaRestSqljsService,

  ) { }

  ngOnInit() {
  }

  abrirModalEditarDescuentoArticulo(descuentoArticulo: DescuentoInterface) {
    const indiceRegistro = this.descuentosArticulo.indexOf(descuentoArticulo);
    const ventanaModal = this.matDialog.open(ModalDescuentosComponent, {
      width: '800px',
      data: {
        descuento: descuentoArticulo,
        base: descuentoArticulo.base,
      }
    });

    const resultadoModal$ = ventanaModal.afterClosed();
    resultadoModal$.subscribe((descuentoEditado: DescuentoInterface) => {
      if (descuentoEditado) {
        descuentoEditado.orden = descuentoArticulo.orden;
        descuentoEditado.base = descuentoArticulo.base;
        descuentoEditado.id = descuentoArticulo.id;
        this.descuentosArticulo[indiceRegistro] = descuentoEditado;
        this.recalcularDescuentos();
      }
    });
  }

  recalcularDescuentos()  {
    const arregloReverse = [...this.descuentosArticulo.reverse()];
    const arregloReverse2 = arregloReverse.map( (descuentoArticulo, indice) => {
      const descuentoArticuloAnterior = arregloReverse[indice - 1];
      if (descuentoArticuloAnterior) {
        descuentoArticulo.base = descuentoArticuloAnterior.base - descuentoArticuloAnterior.valor;
      }
      descuentoArticulo.valor = ((descuentoArticulo.base) * (descuentoArticulo.descuentoPorcentual / 100));
      return descuentoArticulo;
    });
    this.descuentosArticulo = arregloReverse2.reverse();
  }

  eliminarDescuento(registro: DescuentoInterface) {
    const indiceRegistro = this.descuentosArticulo.indexOf(registro);
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '800px',
      data: {
        mensaje: '¿Está seguro que desea eliminar este descuento?',
        titulo: 'Eliminar descuento',
        nombreBotonTrue: 'eliminar',
        nombreBotonFalse: 'cancelar',
      },
    });
    const respuestaModal$ = dialogRef.afterClosed();
    respuestaModal$
      .subscribe(
        async (respuesta: PreciosInterface) => {
          if (respuesta) {
            try {
              const indicePrimerDescuento = this.descuentosArticulo.length - 1;
              const seEliminaraPrimerDescuento = indiceRegistro === indicePrimerDescuento;
              if (seEliminaraPrimerDescuento) {
                const primerDescuento = this.descuentosArticulo[indicePrimerDescuento];
                if (this.descuentosArticulo[indicePrimerDescuento - 1]) {
                  this.descuentosArticulo[indicePrimerDescuento - 1].base = primerDescuento.base;
                }
              }
              await this._descuentoVentaRestSqljsService.repository().delete(this.descuentosArticulo[indiceRegistro].id);
              this.descuentosArticulo.splice(indiceRegistro, 1);
              this.recalcularDescuentos();
            } catch (e) {
              console.error(e);
              this._toasterService.pop('error', 'Error', 'Error al eliminar descuento');
            }
          }
        }, error => {
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(
            toastErrorEliminar,
          );
        });
  }

}
