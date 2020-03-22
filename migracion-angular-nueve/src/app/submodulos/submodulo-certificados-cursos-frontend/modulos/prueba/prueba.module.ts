import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PruebaRoutingModule} from './prueba-routing.module';
import {CrearEditarPruebaComponent} from './modales/crear-editar-prueba/crear-editar-prueba.component';
import {RutaGestionPruebaComponent} from './rutas/ruta-gestion-prueba/ruta-gestion-prueba.component';
import {TableModule} from 'primeng/table';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {ManLabNgBootstrapModule, ModalModule, SelectEstadoModule} from 'man-lab-ng';
import {RutaTestComponent} from './rutas/ruta-test/ruta-test.component';
import {RadioButtonModule} from 'primeng/primeng';
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {PruebaFormularioModule} from './componentes/prueba-formulario/prueba-formulario.module';
import {CronometroModule} from '../diapositiva/componentes/cronometro/cronometro.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {CountdownModule} from 'ngx-countdown';
import {TranslocoModule} from '@ngneat/transloco';
import {TestPretestModule} from './componentes/test-pretest/test-pretest.module';

@NgModule({
  declarations: [
    CrearEditarPruebaComponent,
    RutaGestionPruebaComponent,
    RutaTestComponent,
  ],
  imports: [
    CommonModule,
    PruebaRoutingModule,
    TableModule,
    TituloPantallaModule,
    ManLabNgBootstrapModule,
    RadioButtonModule,
    MatStepperModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PruebaFormularioModule,
    ModalModule,
    CronometroModule,
    MatExpansionModule,
    CountdownModule,
    SelectEstadoModule,
    TranslocoModule,
    TestPretestModule
  ],
  entryComponents: [
    CrearEditarPruebaComponent
  ]
})
export class PruebaModule {
}
