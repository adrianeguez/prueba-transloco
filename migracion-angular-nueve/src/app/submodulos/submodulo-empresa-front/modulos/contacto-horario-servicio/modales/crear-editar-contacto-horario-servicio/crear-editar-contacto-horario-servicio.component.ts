import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';
import {ContactoHorarioServicioInterface} from '../../interfaces/contacto-horario-servicio.interface';
import {ContactoEmpresaInterface} from '../../../../interfaces/contacto-empresa.interface';
import {
  CONFIGURACION_CONTACTOEMPRESA,
  ConfiguracionFormluarioContactoEmpresa
} from '../../../contacto-empresa/componentes/contacto-empresa-formulario/contacto-empresa-formulario.component';
import {ContactoHorarioServicioRestService} from '../../servicios/rest/contacto-horario-servicio.rest.service';

@Component({
  selector: 'app-crear-editar-contacto-horario-servicio',
  templateUrl: './crear-editar-contacto-horario-servicio.component.html',
  styleUrls: ['./crear-editar-contacto-horario-servicio.component.scss']
})

export class CrearEditarContactoHorarioServicioComponent extends FormularioModal<ContactoEmpresaInterface,
  ConfiguracionFormluarioContactoEmpresa,
  ContactoHorarioServicioRestService>
  implements OnInit {
  constructor(
    public dialogo: MatDialogRef<CrearEditarContactoHorarioServicioComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      contactoHorarioServicio: ContactoHorarioServicioInterface,
      idEmpresa: number
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _contactoHorarioServicioRestService: ContactoHorarioServicioRestService,
  ) {
    super(
      _contactoHorarioServicioRestService,
      _cargandoService,
      _toasterService,
      data.contactoHorarioServicio,
    );
  }

  ngOnInit(): void {
    this.encerarConfiguracionDisabled();
  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_CONTACTOEMPRESA();
    this.configuracionDisabled.Nombres.disabled = true;
    this.configuracionDisabled.Apellidos.disabled = true;
      // logica para deshabilitar campos aqui
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        {},
      );
  }

  validarFormulario(contactoEmpresa: ContactoEmpresaInterface | boolean) {

  }
}
