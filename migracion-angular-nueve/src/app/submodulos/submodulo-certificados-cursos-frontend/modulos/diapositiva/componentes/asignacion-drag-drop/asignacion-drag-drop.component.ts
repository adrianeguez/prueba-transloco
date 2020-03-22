import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AsignacionDragDropInterface} from './asignacion-drag-drop.interface';
import {RutaGestionDiapositivaComponent} from '../../rutas/ruta-gestion-diapositiva/ruta-gestion-diapositiva.component';

@Component({
  selector: 'app-gestion-orden',
  templateUrl: './asignacion-drag-drop.component.html',
  styleUrls: ['./asignacion-drag-drop.component.scss']
})
export class AsignacionDragDropComponent implements OnInit {
  formularioValido = false;
  listaOrigen: any[];
  listaDestino: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      configuracion: AsignacionDragDropInterface,
    },
    private readonly _dialogRef: MatDialogRef<RutaGestionDiapositivaComponent>,
  ) {
    this.listaOrigen = data.configuracion.listaOrigen;
    this.listaDestino = data.configuracion.listaDestino;
  }

  cancelarModal() {
    this._dialogRef.close();
  }

  ngOnInit() {
  }

  editar() {
    this._dialogRef.close(
      {
        listaOrigen: this.listaOrigen,
        listaDestino: this.listaDestino
      }
    );
  }

  validar($event: any) {
    this.formularioValido = true;
  }
}
