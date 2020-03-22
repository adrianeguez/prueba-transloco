import {Component, Inject, OnInit} from '@angular/core';
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';
import {
  CONFIGURACION_CURSO,
  ConfiguracionFormluarioCurso
} from '../../componentes/curso-formulario/curso-formulario.component';
import {CursoRestService} from '../../servicios/rest/curso-rest.service';
import {CursoInterface} from '../../interfaces/curso.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToasterService} from 'angular2-toaster';
import {CargandoService} from 'man-lab-ng';
import {ArticuloInterface} from '../../../../../submodulo-articulos-front/interfaces/articulo.interface';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-crear-editar-curso',
  templateUrl: './crear-editar-curso.component.html',
  styleUrls: ['./crear-editar-curso.component.scss']
})
export class CrearEditarCursoComponent extends FormularioModal<CursoInterface,
  ConfiguracionFormluarioCurso,
  CursoRestService>
  implements OnInit {
  constructor(
    public dialogo: MatDialogRef<CrearEditarCursoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      curso: CursoInterface
      idEmpresa: number;
      cursosEnTabla: CursoInterface[]
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _cursoRestService: CursoRestService,
    private readonly _translocoService: TranslocoService,
  ) {
    super(
      _cursoRestService,
      _cargandoService,
      _toasterService,
      data.curso,
    );
    console.log(data);
  }

  ngOnInit(): void {
    this.encerarConfiguracionDisabled();

  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_CURSO();
    if (this.data.curso) {
      // logica para deshabilitar campos aqui
      this.configuracionDisabled.Articulo.disabled = true;
      const cursoEditar = Object.assign(
        {},
        this.data.curso,
      );
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        cursoEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        {},
      );
    }
  }

  prepararRegistroParaEnvio(registro: CursoInterface) {
    // loginca
    this.toasterTitulo = this._translocoService.translate('generales.toasters.toastExitoEditar.title');
    this.toasterDescripcion = this._translocoService.translate('generales.toasters.toastExitoEditar.body',
      {nombre: registro.nombre});
    console.log('El registro', registro);
    if (!this.data.curso) {
      registro.articulo = registro.articulo as ArticuloInterface;
      registro.habilitado = 1;
      registro.diapositivasTotales = 0;
      registro.pruebasTotales = 0;
      this.toasterTitulo = this._translocoService.translate('generales.toasters.toastExitoCrear.title');
      this.toasterDescripcion = this._translocoService.translate('generales.toasters.toastExitoCrearVacio.body');
    }
    return registro;
  }
}

