import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {establecerValoresConfiguracionAbstractControl} from '@manticore-labs/ng-api';
import {OpcionRestService} from '../../../servicios/rest/opcion-rest.service';
import {PreguntaPorPruebaInterface} from '../../../../pregunta/interfaces/pregunta-por-prueba.interface';
import {PreguntaInterface} from '../../../../pregunta/interfaces/pregunta.interface';

@Component({
  selector: 'app-modal-mostrar-opciones',
  templateUrl: './modal-mostrar-opciones.component.html',
  styleUrls: ['./modal-mostrar-opciones.component.scss']
})
export class ModalMostrarOpcionesComponent implements OnInit {
  formularioValido: any;
  constructor(
    public dialogo: MatDialogRef<ModalMostrarOpcionesComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      pregunta: PreguntaInterface,
      idPregunta: number;
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _opcionRestService: OpcionRestService,
  ) {
  }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.dialogo.close();
  }
}
