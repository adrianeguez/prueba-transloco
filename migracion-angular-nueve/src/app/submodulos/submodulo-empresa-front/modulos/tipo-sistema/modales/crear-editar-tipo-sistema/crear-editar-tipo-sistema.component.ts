import {Component, Inject, OnInit} from '@angular/core';
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {TipoSistemaInterface} from '../../interfaces/tipo-sistema.interface';
import {
  CONFIGURACION_TIPOSISTEMA,
  ConfiguracionFormluarioTipoSistema
} from '../../componentes/tipo-sistema-formulario/tipo-sistema-formulario.component';
import {TipoSistemaRestService} from '../../servicios/tipo-sistema.service';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';

@Component({
  selector: 'app-crear-editar-tipo-sistema',
  templateUrl: './crear-editar-tipo-sistema.component.html',
  styleUrls: ['./crear-editar-tipo-sistema.component.scss']
})
export class CrearEditarTipoSistemaComponent extends FormularioModal<TipoSistemaInterface,
  ConfiguracionFormluarioTipoSistema,
  TipoSistemaRestService>
  implements OnInit {
  constructor(
    public dialogo: MatDialogRef<CrearEditarTipoSistemaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      tipoSistema: TipoSistemaInterface;
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _tipoSistemaRestService: TipoSistemaRestService,
    private readonly _auth0Service: Auth0Service
  ) {
    super(
      _tipoSistemaRestService,
      _cargandoService,
      _toasterService,
      data.tipoSistema,
    );
  }

  ngOnInit(): void {
    this.encerarConfiguracionDisabled();
  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_TIPOSISTEMA();
    if (this.data.tipoSistema) {
      // logica para deshabilitar campos aqui
      const cronogramaCabeceraEditar = Object.assign(
        {},
        this.data.tipoSistema,
      );
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        cronogramaCabeceraEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        {},
      );
    }
  }

  prepararRegistroParaEnvio(registro) {
    if (!this.data.tipoSistema) {
      registro.empresa = this._auth0Service.empresaSeleccionada.empresa.id;
    }
    return registro;
  }
}
