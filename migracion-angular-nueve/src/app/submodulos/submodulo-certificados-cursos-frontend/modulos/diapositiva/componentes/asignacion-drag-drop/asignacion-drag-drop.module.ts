import {NgModule} from '@angular/core';
import {AsignacionDragDropComponent} from './asignacion-drag-drop.component';
import {PickListModule} from 'primeng/picklist';
import {ManLabNgBootstrapModule, ModalModule} from 'man-lab-ng';
import {CommonModule} from '@angular/common';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule(
  {
    declarations: [
      AsignacionDragDropComponent,
    ],
    imports: [
      CommonModule,
      PickListModule,
      ManLabNgBootstrapModule,
      ModalModule,
      TranslocoModule,
    ],
    entryComponents: [
      AsignacionDragDropComponent,
    ],
    exports: [
      AsignacionDragDropComponent,
    ],
  }
)
export class AsignacionDragDropModule {

}
