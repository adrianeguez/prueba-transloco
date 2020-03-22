import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModuloLazyRoutingModule} from './modulo-lazy-routing.module';
import {RutaUnoComponent} from './rutas/ruta-uno/ruta-uno.component';
import { TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';
import {scopeModuloLazy} from './servicios/transloco/loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [RutaUnoComponent],
  imports: [
    CommonModule,
    ModuloLazyRoutingModule,
    TranslocoModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      deps: [HttpClient],
      useFactory: scopeModuloLazy
    }
  ],
})
export class ModuloLazyModule {
}
