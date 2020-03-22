import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {mergeMap} from 'rxjs/operators';
// tslint:disable-next-line:max-line-length
import {EdificioRestService} from '../../../../../submodulo-empresa-front/servicios/rest/edificio-rest.service';
import {Observable, of} from 'rxjs';
import {TranslocoService} from '@ngneat/transloco';
@Component({
  selector: 'ml-formulario-buscar-edificio',
  templateUrl: './formulario-buscar-edificio.component.html',
  styleUrls: ['./formulario-buscar-edificio.component.scss']
})
export class FormularioBuscarEdificioComponent implements OnInit {
  @Input()
  consultaCustomizada = undefined;
  @Output()
  edificioEmiter: EventEmitter<any> = new EventEmitter<any>();

  protected consulta;

  esquemaFormulario = [
    {
      controlName: 'edificio',
      label: this._translocoService.translate('submoduloCertificadosCuros.moduloCurso.fomularioBuscarEdificio.edificio.label'),
      placeholder: this._translocoService.translate('submoduloCertificadosCuros.moduloCurso.fomularioBuscarEdificio.edificio.placeholder'),
      type: {
        typeName: 'autocomplete',
        maxLength: 30,
        completeMethod: this.buscarEdificio,
        nameAutoComplete: 'nombre', // object attribute that will be displayed in the component
        componentReference: this
      },
      hint: this._translocoService.translate('submoduloCertificadosCuros.moduloCurso.fomularioBuscarEdificio.edificio.hint'),
    }
  ];

  constructor(
    private readonly _edificioService: EdificioRestService,
    private readonly _translocoService: TranslocoService,
  ) {
  }

  ngOnInit() {
  }

  buscarEdificio(evento, context: FormularioBuscarEdificioComponent): Observable<any[]> {
    if (context.consultaCustomizada) {
      context.consulta = context.consultaCustomizada;
      context.consulta.where.nombre = [`Like("%25${evento.query ? evento.query : evento}%25")`];
    } else {
      context.consulta = {
        where: {
          nombre: [`Like("%25${evento.query ? evento.query : evento}%25")`]
        }
      };
    }
    return context._edificioService.findAll(
      'criterioBusqueda=' + JSON.stringify(context.consulta)
    ).pipe(
      mergeMap(
        (respuestaEdificios: [any[], number]) => {
          return of(respuestaEdificios[0]);
        }
      )
    );
  }

  escucharEdificio(datosFormulario: { edificio: any }) {
    if (datosFormulario) {
      this.edificioEmiter.emit(datosFormulario.edificio);
    }
  }
}
