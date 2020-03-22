import {Component, OnInit} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';
import {IdiomaInterface} from '../interfaces/idioma.interface';
import {mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-cambiar-idioma',
  templateUrl: './cambiar-idioma.component.html',
  styleUrls: ['./cambiar-idioma.component.scss']
})
export class CambiarIdiomaComponent implements OnInit {
  idiomaSeleccionado: IdiomaInterface;
  idiomas: IdiomaInterface[] = [];
  idiomaActivo: string;
  constructor(
    private readonly _translocoService: TranslocoService,
  ) {
    this.obtenerIdiomasDisponibles()
      .subscribe(
        (idiomas: IdiomaInterface[]) => {
          this.idiomas = idiomas;
        }
      );
  }

  ngOnInit() {
    this.idiomaActivo = this._translocoService.getActiveLang();
  }

  protected obtenerIdiomasDisponibles() {
    return this._translocoService.selectTranslateObject(
      'submoduloFrontComun.idiomas',
    ).pipe(
      mergeMap(
        (
          objetoTraducido: { [key: string]: any }
        ) => {
          const llaves = Object.keys(objetoTraducido);
          this.idiomaSeleccionado = objetoTraducido[this.idiomaActivo];
          const idiomas: IdiomaInterface[] = llaves.map(llave => objetoTraducido[llave]);
          return of(idiomas);
        }
      )
    );
  }

  cambiarIdioma(idioma) {
    this.idiomaSeleccionado = idioma;
    console.log(this.idiomaSeleccionado);
    this._translocoService.setActiveLang(this.idiomaSeleccionado.codigo);
  }

}
