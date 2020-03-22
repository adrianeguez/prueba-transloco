import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RutaGestionModuloCursoComponent} from '../../rutas/ruta-gestion-modulo-curso/ruta-gestion-modulo-curso.component';
import {OrdenInterface} from './orden.interface';

@Component({
  selector: 'app-gestion-orden',
  templateUrl: './gestion-orden.component.html',
  styleUrls: ['./gestion-orden.component.scss']
})
export class GestionOrdenComponent implements OnInit {
  formularioValido = true;
  listaOrigen: any[];
  listaDestino: any[];
  atributoOrdenInicio: string;
  atributoOrdenFinal: string;
  longitudReal: number;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      configuracion: OrdenInterface,
    },
    private readonly _dialogRef: MatDialogRef<RutaGestionModuloCursoComponent>,
  ) {
    this.listaOrigen = data.configuracion.listaOrigen;
    this.atributoOrdenFinal = data.configuracion.atributoOrdenFinal ? data.configuracion.atributoOrdenFinal : '';
    this.atributoOrdenInicio = data.configuracion.atributoOrdenInicio ? data.configuracion.atributoOrdenInicio : '';
    this.longitudReal = data.configuracion.listaOrigen.length;
  }

  cancelarModal() {
    this._dialogRef.close();
  }

  ngOnInit() {
    this.listaDestino = [];
  }

  validarLista() {
    return this.listaDestino.length === this.longitudReal;
  }

  editar() {
    const listaFormateada = this.listaDestino.map(
      (item: any, indice: number) => {
        const esPrimer = indice === 0;
        const noEsUltimo = indice !== this.listaDestino.length - 1;
        if (esPrimer && noEsUltimo) {
          const indiceSiguiente = indice + 1;
          const siguienteItem = this.listaDestino[indiceSiguiente];
          item[this.atributoOrdenInicio] = null;
          item[this.atributoOrdenFinal] = siguienteItem.id;
        } else if (noEsUltimo) {
          const indiceSiguiente = indice + 1;
          const indiceAnterior = indice - 1;
          const siguienteItem = this.listaDestino[indiceSiguiente];
          const anteriorItem = this.listaDestino[indiceAnterior];
          item[this.atributoOrdenInicio] = anteriorItem.id;
          item[this.atributoOrdenFinal] = siguienteItem.id;
        } else if (!noEsUltimo) {
          const indiceAnterior = indice - 1;
          const anteriorItem = this.listaDestino[indiceAnterior];
          item[this.atributoOrdenFinal] = null;
          item[this.atributoOrdenInicio] = anteriorItem.id;
        } else {
          item[this.atributoOrdenFinal] = null;
          item[this.atributoOrdenInicio] = null;
        }
        return item;
      }
    );
    this._dialogRef.close(listaFormateada);
  }

}
