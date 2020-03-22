import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {DatosVendedorInterface} from '../../../../interfaces/datos-vendedor-interface';
import {DatosVendedorRestService} from '../../../../servicios/rest/datos-vendedor-rest.service';
import {CargandoService} from 'man-lab-ng';
import {toastErrorCargarDatos} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'ml-drag-drop-vendedor-ruta',
  templateUrl: './drag-drop-vendedor-ruta.component.html',
  styleUrls: ['./drag-drop-vendedor-ruta.component.scss'],
})
export class DragDropVendedorRutaComponent implements OnInit {
  busqueda = '';
  values: DatosVendedorInterface[] = new Array(10);
  arregloVendedoresSeleccionados = [];
  draggedVendedor;
  @Input() idEmpresa: number | string;
  @Input() vendedoresAsigandoEdificio: any[];
  @Output() vendedoresSeleccionados: EventEmitter<any[]> = new EventEmitter();

  constructor(
    private readonly _datosVendedorRestService: DatosVendedorRestService,
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
  ) {
  }

  ngOnInit() {
    this.obtenerVendedoresEmpresa('');
  }

  obtenerVendedoresEmpresa(busqueda: string, arreglo = null) {
    this._cargandoService.habilitarCargando();
    const consulta = {
      where: {
        empresaId: this.idEmpresa,
        nombreVendedor: `Like("%25${busqueda}%25")`,
        habilitado: 1,
      },
      relations: ['tipoDatosVen', 'tipoDatosVen.tipoVendedor'],
    };
    this._datosVendedorRestService
      .findAll('criterioBusqueda=' + JSON.stringify(consulta))
      .subscribe(r => {
          this._cargandoService.deshabilitarCargando();
          const existenValores = r[1] >= 0;
          const existeVendedoresAsignados = this.vendedoresAsigandoEdificio.length > 0;
          if (existeVendedoresAsignados) {
            this.vendedoresAsigandoEdificio
              .forEach(
                elemento => {
                  const indiceVendedor = r[0]
                    .findIndex(
                      vendedor => vendedor.documento === elemento.datosVendedor.documento,
                    );
                  if (indiceVendedor !== -1) {
                    r[0].splice(indiceVendedor, 1);
                  }
                });
          }
          if (existenValores) {
            this.values = r[0];
            if (arreglo) {
              arreglo.forEach(registro => {
                const vendedorEnArreglo = this.values.find(
                  vendedor => registro.id === vendedor.id,
                );
                const indiceVendedor = this.values.indexOf(vendedorEnArreglo);
                this.values.splice(indiceVendedor, 1);
              });
            }
          }
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastErrorCargarDatos);
          console.log(error);
        }
      );
  }

  drop(evento) {
    if (this.draggedVendedor) {
      const draggedVendedorIndex = this.values.findIndex(
        vendedor => this.draggedVendedor.id === vendedor.id,
      );
      this.arregloVendedoresSeleccionados = [
        ...this.arregloVendedoresSeleccionados,
        this.draggedVendedor,
      ];
      this.values = this.values.filter(
        // tslint:disable-next-line: triple-equals
        (val, i) => i != draggedVendedorIndex,
      );
      this.vendedoresSeleccionados.emit(this.arregloVendedoresSeleccionados);
      this.draggedVendedor = null;
    }
  }

  dragStart(evento, registro) {
    this.draggedVendedor = registro;
  }

  dragEnd(evento) {
    this.draggedVendedor = null;
  }

  escuhar() {
    this.obtenerVendedoresEmpresa(
      this.busqueda,
      this.arregloVendedoresSeleccionados,
    );
  }
}
