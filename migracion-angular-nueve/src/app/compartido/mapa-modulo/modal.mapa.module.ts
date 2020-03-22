import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ManLabNgBootstrapModule, ModalModule, SelectEstadoModule} from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import {RadioButtonModule} from 'primeng/primeng';
import {CrearEditarInfoGeoComponent} from './modales/crear-editar-info-geo/crear-editar-info-geo.component';
import {MapaComponent} from './componentes/mapa/mapa.component';
import {OpenlayersService} from './servicios/open-layers/open.layers.service';

@NgModule({
  declarations: [
    MapaComponent,
    CrearEditarInfoGeoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    SelectEstadoModule,
    ModalModule,
    RadioButtonModule,
  ],
  exports: [
    CrearEditarInfoGeoComponent,
    MapaComponent,
  ],
  entryComponents: [
    CrearEditarInfoGeoComponent,
  ],
  providers: [
    OpenlayersService,
  ],
})
export class MapaModule {
}
