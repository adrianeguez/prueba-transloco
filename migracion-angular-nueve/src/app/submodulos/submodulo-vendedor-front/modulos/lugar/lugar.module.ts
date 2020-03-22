import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LugarRoutingModule } from './lugar-routing.module';
import { RutaGestionLugarComponent } from './rutas/ruta-gestion-lugar/ruta-gestion-lugar.component';

@NgModule({
  declarations: [RutaGestionLugarComponent],
  imports: [CommonModule, LugarRoutingModule],
})
export class LugarModule {}
