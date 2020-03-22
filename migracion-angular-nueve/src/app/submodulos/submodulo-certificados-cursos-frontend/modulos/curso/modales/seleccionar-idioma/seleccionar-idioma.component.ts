import {Component, Inject, OnInit} from '@angular/core';
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToasterService} from 'angular2-toaster';
import {CargandoService} from 'man-lab-ng';
import {RutaMenuMisCursosComponent} from '../../rutas/ruta-menu-mis-cursos/ruta-menu-mis-cursos.component';
import {CursoRestService} from '../../servicios/rest/curso-rest.service';
import {CursoInterface} from '../../interfaces/curso.interface';
import {IdiomaInterface} from '../../../../../../interfaces/idioma.interface';
import {
  CONFIGURACION_IDIOMA,
  ConfiguracionFormluarioIdioma
} from '../../componentes/seleccion-idioma-curso-formulario/idioma-formulario.component';

@Component({
  selector: 'app-seleccionar-idioma',
  templateUrl: './seleccionar-idioma.component.html',
  styleUrls: ['./seleccionar-idioma.component.scss']
})// SeleccionarIdiomaComponent

export class SeleccionarIdiomaComponent extends FormularioModal<IdiomaInterface, ConfiguracionFormluarioIdioma, CursoRestService>
  implements OnInit {
  constructor(
    public dialogo: MatDialogRef<RutaMenuMisCursosComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      idioma: IdiomaInterface
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _CursoRestService: CursoRestService,
  ) {
    super(
      _CursoRestService,
      _cargandoService,
      _toasterService,
      data.idioma,
    );
  }

  ngOnInit(): void {
    this.encerarConfiguracionDisabled();
  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_IDIOMA();
    if (this.data.idioma) {
      // logica para deshabilitar campos aqui
      const Editar = Object.assign(
        {},
        this.data.idioma,
      );
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        Editar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        {},
      );
    }
  }

  prepararRegistroParaEnvio(registro) {
    // loginca
    if (!this.data.idioma) {
      // cuando esta editando
    }
    return registro;
  }
}

