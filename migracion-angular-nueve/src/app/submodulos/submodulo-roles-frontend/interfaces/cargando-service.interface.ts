import { EventEmitter } from '@angular/core';

export interface CargandoServiceInterface {
  cargando: boolean;
  cambioCargando: EventEmitter<boolean>;
  habilitarCargando();
  deshabilitarCargando();
}
