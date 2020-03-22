import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CronometroService {
  conteo: boolean;
  private cambioConteo = new BehaviorSubject<boolean>(this.conteo);
  cambioConteo$ = this.cambioConteo.asObservable();
  reinicio: boolean;
  private cambioReinicio = new BehaviorSubject<boolean>(this.reinicio);
  cambioReinicio$ = this.cambioReinicio.asObservable();

  constructor() {
  }

  deternerTiempo() {
    this.conteo = false;
    this.cambioConteo.next(this.conteo);
  }

  reanudarConteo() {
    this.conteo = true;
    this.cambioConteo.next(this.conteo);
  }

  reiniciarTiempo() {
    this.reinicio = true;
    this.cambioReinicio.next(this.reinicio);
  }
}
