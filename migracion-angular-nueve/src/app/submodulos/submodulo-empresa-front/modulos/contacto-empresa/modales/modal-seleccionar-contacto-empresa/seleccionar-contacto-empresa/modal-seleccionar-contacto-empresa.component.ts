import {Component, Inject, OnInit} from '@angular/core';
import {PreguntaInterface} from '../../../../../../submodulo-certificados-cursos-frontend/modulos/pregunta/interfaces/pregunta.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Toast, ToasterService} from 'angular2-toaster';
import {CargandoService} from 'man-lab-ng';
import {PreguntaPorPruebaRestService} from '../../../../../../submodulo-certificados-cursos-frontend/modulos/pregunta/servicios/rest/pregunta-por-prueba-rest.service';
import {TranslocoService} from '@ngneat/transloco';
import {toastErrorCrear, toastExitoCrear} from '../../../../../../../constantes/mensajes-toaster';
import {ContactoEmpresaInterface} from '../../../../../interfaces/contacto-empresa.interface';
import {ContactoHorarioServicioRestService} from '../../../../contacto-horario-servicio/servicios/rest/contacto-horario-servicio.rest.service';
import {MensajesToasterInterface} from '../../../../../../../interfaces/mensajesToaster.Interface';

@Component({
  selector: 'app-modal-seleccionar-contacto-empresa',
  templateUrl: './modal-seleccionar-contacto-empresa.component.html',
  styleUrls: ['./modal-seleccionar-contacto-empresa.component.scss']
})
export class ModalSeleccionarContactoEmpresaComponent implements OnInit {

  contactosSeleccionados: ContactoEmpresaInterface[];
  estaEnTabla: boolean;
  totalRegistros: number;
  modalValido: boolean;
  private rutaTraduccion;
  traduccionesToaster: MensajesToasterInterface;

  constructor(
    public dialogo: MatDialogRef<ModalSeleccionarContactoEmpresaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      idEmpresa: number,
      contactosEnTabla,
      idServicio: number;
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _contactoHorarioServicioRestService: ContactoHorarioServicioRestService,
    private readonly _translocoService: TranslocoService,
  ) {
  }

  ngOnInit(): void {
    this.estaEnTabla = false;
    this.totalRegistros = 0;
    this.modalValido = false;
    this.rutaTraduccion = 'submoduloEmpresa.moduloContactoEmpresa.componentes.modalSeleccionarcontactosEmpresa';
    this._translocoService.selectTranslateObject('generales.toasters').subscribe(
      (traduccion) => {
        this.traduccionesToaster = traduccion;
      }
    );
  }

  obtenerContactosSeleccionados(evento: ContactoEmpresaInterface[]) {
    this._cargandoService.habilitarCargando();
    this.contactosSeleccionados = evento;
    this.totalRegistros = this.contactosSeleccionados.length;
    this.validar();
    this.verificarContactoEnTabla(this.data.contactosEnTabla, this.contactosSeleccionados);
    this._cargandoService.deshabilitarCargando();
  }

  verificarContactoEnTabla(arreglo, contactosSeleccionados) {
    this.estaEnTabla = arreglo.some(
      (contactoHorarioServicio) => {
        return contactosSeleccionados.some(
          contactoAñadido => {
            return contactoAñadido.id === contactoHorarioServicio.contactoEmpresa.id;
          }
        );
      }
    );
  }

  aceptarContactosSeleccionados() {
    if (this.estaEnTabla) {
      console.error({mensaje: 'Error editando', data: this.estaEnTabla});
      this
        ._toasterService
        .pop(
          'error',
          this._translocoService.translate('formularios.comunes.valido'),
          this._translocoService.translate(`${this.rutaTraduccion}.errores.contactos`)
        );
    } else {
      this._cargandoService.habilitarCargando();
      const contactosAñadir = this.contactosSeleccionados.map(
        contacto => {
          return {
            horarioServicio: +this.data.idServicio,
            contactoEmpresa: contacto
          };
        }
      );
      this._contactoHorarioServicioRestService.create(
        contactosAñadir
      )
        .subscribe(
          respuesta => {
            this._toasterService.pop(
              this.traduccionesToaster.toastExitoCrearVacio as Toast
            );
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close(respuesta);
          },
          error => {
            this._toasterService.pop(
              this.traduccionesToaster.toastErrorCrearVacio as Toast
            );
            this._cargandoService.deshabilitarCargando();
          }
        );
      this.dialogo.close(contactosAñadir);
    }
  }

  cerrarModal() {
    this.dialogo.close();
  }

  validar() {
    if (this.contactosSeleccionados.length > 0) {
      this.modalValido = true;
    } else {
      this.modalValido = false;
    }
  }

}
