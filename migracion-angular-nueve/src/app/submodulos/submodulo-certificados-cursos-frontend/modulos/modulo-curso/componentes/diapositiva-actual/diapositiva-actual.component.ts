import {Component, Input, OnInit} from '@angular/core';
import {DiapositivaInterface} from '../../../diapositiva/interfaces/diapositiva.interface';
import {DiapositivaRestService} from '../../../diapositiva/servicios/rest/diapositiva.rest.service';

@Component({
  selector: 'app-diapositiva-actual',
  templateUrl: './diapositiva-actual.component.html',
  styleUrls: ['./diapositiva-actual.component.scss']
})
export class DiapositivaActualComponent implements OnInit {

  @Input()
  idDiapositiva: number;

  constructor(
    private readonly _diapositivaRestService: DiapositivaRestService,
  ) {
  }

  diapositiva: DiapositivaInterface = {
    duracion: 0, habilitado: undefined, tipo: 0, titulo: ''
  };


  ngOnInit() {
    this.consultarDiapositivaActual();
  }

  consultarDiapositivaActual() {
    const diapositivaEncontrada$ = this._diapositivaRestService.findOne(this.idDiapositiva);

    diapositivaEncontrada$
      .subscribe(
        (diapositiva: DiapositivaInterface) => {
          this.diapositiva = diapositiva;
          // console.log(diapositiva);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
