import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {PreguntaInterface} from '../../interfaces/pregunta.interface';
import {TranslocoService} from '@ngneat/transloco';
import {PreguntaPorPruebaRestService} from '../../servicios/rest/pregunta-por-prueba-rest.service';
import {crearToasterGeneral} from '../../../../funciones/crear-toaster-general';

@Component({
  selector: 'app-seleccionar-preguntas',
  templateUrl: './seleccionar-preguntas.component.html',
  styleUrls: ['./seleccionar-preguntas.component.scss']
})

export class SeleccionarPreguntasComponent
  implements OnInit {

  preguntasSeleccionadas: PreguntaInterface[];
  estaEnTabla: boolean;
  totalRegistros: number;
  modalValido: boolean;

  constructor(
    public dialogo: MatDialogRef<SeleccionarPreguntasComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      idPrueba: number,
      preguntasEnTabla,
      idModuloCurso: number;
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _preguntaPorPruebaRestService: PreguntaPorPruebaRestService,
    private readonly _translocoService: TranslocoService,
  ) {
  }

  ngOnInit(): void {
    this.estaEnTabla = false;
    this.totalRegistros = 0;
    this.modalValido = false;
  }

  obtenerPreguntasSeleccionadas(evento: PreguntaInterface[]) {
    this._cargandoService.habilitarCargando();
    this.preguntasSeleccionadas = evento;
    this.totalRegistros = this.preguntasSeleccionadas.length;
    this.validar();
    this.verificarPreguntaEnTabla(this.data.preguntasEnTabla, this.preguntasSeleccionadas);
    this._cargandoService.deshabilitarCargando();
  }

  verificarPreguntaEnTabla(arreglo, valor) {
    this.estaEnTabla = arreglo.some(
      (preguntaPrueba) => {
        return valor.some(
          preguntaAñadida => {
            return preguntaAñadida.id === preguntaPrueba.pregunta.id;
          }
        );
      }
    );
  }

  aceptarPreguntasSeleccionadas() {
    if (this.estaEnTabla) {
      console.error({mensaje: 'Error editando', data: this.estaEnTabla});
      this
        ._toasterService
        .pop(
          'error',
          this._translocoService.translate('formularios.comunes.valido'),
          this._translocoService.translate('submoduloCertificadosCuros.pregunta.preguntaFormulario.preguntas')
        );
    } else {
      this._cargandoService.habilitarCargando();
      const preguntasAñadir = this.preguntasSeleccionadas.map(
        pregunta => {
          return {
            prueba: +this.data.idPrueba,
            pregunta: pregunta
          };
        }
      );
      this._preguntaPorPruebaRestService.create(
        preguntasAñadir
      )
        .subscribe(
          respuesta => {
            this._toasterService.pop(
              crearToasterGeneral(this._translocoService, 'success', 'generales.toasters.toastExitoCrearVacio')
            );
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close(respuesta);
          },
          error => {
            this._toasterService.pop(
              crearToasterGeneral(this._translocoService, 'success', 'generales.toasters.toastErrorCrearVacio')
            );
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close();
          }
        );
      // this.dialogo.close(this.preguntasSeleccionadas);
    }
  }

  cerrarModal() {
    this.dialogo.close();
  }

  validar() {
    if (this.preguntasSeleccionadas.length > 0) {
      this.modalValido = true;
    } else {
      this.modalValido = false;
    }
  }
}
