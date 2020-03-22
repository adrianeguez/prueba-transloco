import {NgModule} from '@angular/core';
import {TestPretestComponent} from './test-pretest.component';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslocoModule} from '@ngneat/transloco';
import {ManLabNgBootstrapModule} from 'man-lab-ng';
import {TituloPantallaModule} from '../../../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {CountdownModule} from 'ngx-countdown';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    TestPretestComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    TranslocoModule,
    ManLabNgBootstrapModule,
    TituloPantallaModule,
    MatExpansionModule,
    CountdownModule,
    ReactiveFormsModule,
  ],
  exports: [
    TestPretestComponent
  ],
})
export class TestPretestModule {
}
