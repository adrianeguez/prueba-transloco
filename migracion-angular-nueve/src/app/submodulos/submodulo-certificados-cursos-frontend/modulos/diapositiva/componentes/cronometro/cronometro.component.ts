import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CronometroService} from './cronometro.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.scss']
})
export class CronometroComponent implements OnInit, OnDestroy {
  @Input()
  empezar = false;
  @Input()
  enSegundoPlano = false;
  tiempo = 0;
  protected estaContando = false;
  @Output()
  tiempoString: EventEmitter<string> = new EventEmitter<string>();
  suscripcionConteo: Subscription;
  suscripcionReinicio: Subscription;
  constructor(
    private readonly _cronometroService: CronometroService,
  ) {
    this.suscripcionConteo = this._cronometroService.cambioConteo$
      .subscribe(
        (estaContando) => {
          this.estaContando = estaContando;
        }
      );
    this.suscripcionReinicio = this._cronometroService.cambioReinicio$
      .subscribe(
        (reinicio) => {
          if (reinicio) {
            this.tiempo = 0;
          }
        }
      );
  }

  ngOnInit() {
    this.estaContando = this.empezar;
    setInterval(() => {
      if (this.estaContando) {
        this.tiempo++;
        this.tiempoString.emit(
          this.tiempo.toString()
        );
      }
    }, 1000);
  }

  empezarCronometro() {
    this.estaContando = true;
  }

  detenerCronometro() {
    this.estaContando = false;
  }

  reiniciarCronometro() {
    this.detenerCronometro();
    this.tiempo = 0;
  }

  ngOnDestroy(): void {
    this.suscripcionConteo.unsubscribe();
    this.suscripcionReinicio.unsubscribe();
  }
}
