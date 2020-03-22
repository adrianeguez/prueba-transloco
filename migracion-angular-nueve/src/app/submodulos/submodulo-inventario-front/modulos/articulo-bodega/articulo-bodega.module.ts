import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RutasArticuloBodegaComponent} from './rutas/rutas-articulo-bodega/rutas-articulo-bodega.component';
import {ManLabNgBootstrapModule} from 'man-lab-ng';
import {ArticuloBodegaRoutingModule} from './articulo-bodega-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {TableModule} from 'primeng/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AnadirArticuloBodegaComponent} from './modales/anadir-articulo-bodega/anadir-articulo-bodega.component';
import {ArticuloBodegaFormularioComponent} from '../../componentes/formularios/formulario-articulo-bodega/articulo-bodega-formulario.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TextMaskModule} from 'angular2-text-mask';
import {CurrencyMaskModule} from 'ng2-currency-mask';

@NgModule({
  declarations: [RutasArticuloBodegaComponent, AnadirArticuloBodegaComponent, ArticuloBodegaFormularioComponent],
  imports: [
    CommonModule,
    ManLabNgBootstrapModule,
    ArticuloBodegaRoutingModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    TextMaskModule,
    CurrencyMaskModule,
  ],
  entryComponents: [
    AnadirArticuloBodegaComponent
  ],
  exports: [
    ArticuloBodegaFormularioComponent,
  ]
})
export class ArticuloBodegaModule {
}
