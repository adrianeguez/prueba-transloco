import {Component, Inject, OnInit} from '@angular/core';
import {ModuloCursoInterface} from '../../interfaces/modulo-curso.interface';
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';
import {
  CONFIGURACION_MODULOCURSO,
  ConfiguracionFormluarioModuloCurso
} from '../../componentes/formulario-modulo-curso/modulo-curso-formulario.component';
import {ModuloCursoRestService} from '../../servicios/rest/modulo-curso-rest.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToasterService} from 'angular2-toaster';
import {CargandoService} from 'man-lab-ng';

@Component({
  selector: 'app-crear-editar-modulo-curso',
  templateUrl: './crear-editar-modulo-curso.component.html',
  styleUrls: ['./crear-editar-modulo-curso.component.scss']
})
export class CrearEditarModuloCursoComponent extends FormularioModal<ModuloCursoInterface,
  ConfiguracionFormluarioModuloCurso,
  ModuloCursoRestService>
  implements OnInit {

  constructor(
    public dialogo: MatDialogRef<CrearEditarModuloCursoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      moduloCurso: ModuloCursoInterface,
      idCurso?: number,
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _moduloCursoRestService: ModuloCursoRestService,
  ) {
    super(
      _moduloCursoRestService,
      _cargandoService,
      _toasterService,
      data.moduloCurso,
    );
  }

  ngOnInit(): void {
    this.encerarConfiguracionDisabled();
  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_MODULOCURSO();
    if (this.data.moduloCurso) {
      // logica para deshabilitar campos aqui
      this.configuracionDisabled.SiguienteModulo.disabled = true;
      this.configuracionDisabled.AnteriorModulo.disabled = true;
      const moduloCursoEditar = Object.assign(
        {},
        this.data.moduloCurso,
      );
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        moduloCursoEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        {},
      );
    }
  }

  prepararRegistroParaEnvio(registro: ModuloCursoInterface) {
    // loginca
    if (!this.data.moduloCurso) {
      registro.curso = +this.data.idCurso;
      registro.habilitado = 1;
      registro.diapositivasTotales = 0;
      registro.pruebasTotales = 0;
    }
    return registro;
  }
}

