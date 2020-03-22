'';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {TipoSistemaRestService} from '../../../../submodulo-empresa-front/modulos/tipo-sistema/servicios/tipo-sistema.service';
import {TipoSistemaInterface} from '../../../../submodulo-empresa-front/modulos/tipo-sistema/interfaces/tipo-sistema.interface';

@Component({
  selector: 'mlab-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent implements OnInit {
  @Input()
  tipoAjuste: string;

  @Input()
  empresaId: number;

  @Output()
  seleccionoDatosAjustes: EventEmitter<DatosAjustesInterface> = new EventEmitter();
  tipoSistema: TipoSistemaInterface[];
  formulario: DatosAjustesInterface = {
    observacion1: null,
    transportista: null,
    motivo: null,
    /* documentoRelacionado: undefined,
    tipoDocumentoRelacionado: undefined,
    idDocumentoRelacionado: undefined, */
  };

  constructor(
    private readonly _tipoSistemaRestService: TipoSistemaRestService
  ) {
  }

  ngOnInit() {
    const consulta = {
      where: {
        tipo: this.tipoAjuste === 'ingreso' ? 'ingreso-razon' : 'egreso-razon',
        empresa: this.empresaId,
      }
    };
    this._tipoSistemaRestService
      .findAll(
        'criterioBusqueda=' +
        JSON.stringify(consulta)
      )
      .subscribe(
        r => {
          this.tipoSistema = r[0] as TipoSistemaInterface[];
        }
      );
  }

  emitirDatosAjustesSeleccionados(formulario: NgForm) {
    this.seleccionoDatosAjustes.emit(this.formulario);
  }
}

export interface DatosAjustesInterface {
  observacion1: string;
  transportista: any;
  motivo: string;
  /* documentoRelacionado: string;
  tipoDocumentoRelacionado: string;
  idDocumentoRelacionado: string; */
}

'';
