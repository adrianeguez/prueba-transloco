import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  RespuestaBuscarEmpresaOInformacionTributariaPorCedulaRucOPasaporte
} from '../../../../../submodulo-empresa-front/servicios/rest/informacion-tributaria-rest.service';
import { InformacionTributariaInterface } from '../../../../../submodulo-empresa-front/interfaces/informacion-tributaria.interface';
// tslint:disable-next-line:max-line-length
import {ModalCrearEditarInformacionTributariaComponent} from '../../../modales/modal-crear-editar-informacion-tributaria/modal-crear-editar-informacion-tributaria/modal-crear-editar-informacion-tributaria.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'ml-tabla-clientes',
  templateUrl: './tabla-clientes.component.html',
  styleUrls: ['./tabla-clientes.component.scss'],
})
export class TablaClientesComponent implements OnInit {

  rows = 4;

  skip = 0;

  loading = false;

  @Input() columnas;

  @Input() totalRegistros: number;

  @Input() esVenta: boolean;

  @Input()
  clientes: InformacionTributariaInterface[] = [];

  clientesSeteados: RespuestaBuscarEmpresaOInformacionTributariaPorCedulaRucOPasaporte[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output()
  seleccionoCliente: EventEmitter<
    InformacionTributariaInterface
    > = new EventEmitter();

  constructor(
    public matDialog: MatDialog,
  ) {}

  ngOnInit() {
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }

  obtenerClienteSeleccionado(event) {
    this.seleccionoCliente.emit(event.data);
  }

  abrirModalEditarInformacionTributaria( informacionTributaria) {
    const indice = this.clientes.indexOf(informacionTributaria);
    const dialogRef = this.matDialog.open(ModalCrearEditarInformacionTributariaComponent, {
      width: '1000px',
      data: {informacionTributaria, esVenta: this.esVenta},

    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((informacionTributariaEditada: InformacionTributariaInterface) => {
        if (informacionTributariaEditada) {
          this.clientes[indice] = informacionTributariaEditada;
        }
      },
      error => {
        console.log(error);
      });
  }
}
