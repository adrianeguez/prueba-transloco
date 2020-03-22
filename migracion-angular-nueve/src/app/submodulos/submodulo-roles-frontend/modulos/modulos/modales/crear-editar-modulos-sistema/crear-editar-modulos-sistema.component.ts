import {Component, Inject, OnInit} from '@angular/core';
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';
import {
  CONFIGURACION_TIPOSISTEMA,
} from '../../../../../submodulo-empresa-front/modulos/tipo-sistema/componentes/tipo-sistema-formulario/tipo-sistema-formulario.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ToasterService} from 'angular2-toaster';
import {CargandoService} from 'man-lab-ng';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';
import {ModulosSistemaInterface} from '../../../../interfaces/modulos-sistema.interface';
import {
  CONFIGURACION_MODULOSSISTEMA,
  ConfiguracionFormluarioModulosSistema
} from '../../componentes/modulos-sistema-formulario/modulos-sistema-formulario.component';
import {ModulosSistemaRestService} from '../../../../servicios/rest/modulos-sistema-rest.service';

@Component({
  selector: 'app-crear-editar-modulos-sistema',
  templateUrl: './crear-editar-modulos-sistema.component.html',
  styleUrls: ['./crear-editar-modulos-sistema.component.scss']
})
export class CrearEditarModulosSistemaComponent extends FormularioModal<ModulosSistemaInterface,
  ConfiguracionFormluarioModulosSistema,
  ModulosSistemaRestService>
  implements OnInit {
  constructor(
    public dialogo: MatDialogRef<CrearEditarModulosSistemaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      moduloSistema: ModulosSistemaInterface;
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _moduloSistemaRestService: ModulosSistemaRestService,
    private readonly _auth0Service: Auth0Service
  ) {
    super(
      _moduloSistemaRestService,
      _cargandoService,
      _toasterService,
      data.moduloSistema,
    );
  }

  ngOnInit(): void {
    this.encerarConfiguracionDisabled();
  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_MODULOSSISTEMA();
    if (this.data.moduloSistema) {
      // logica para deshabilitar campos aqui
      const moduloSistemaEditar = Object.assign(
        {},
        this.data.moduloSistema,
      );
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        moduloSistemaEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        {},
      );
    }
  }

  prepararRegistroParaEnvio(registro) {
    if (!this.data.moduloSistema) {
      registro.habilitado = true;
    }
    return registro;
  }
}

