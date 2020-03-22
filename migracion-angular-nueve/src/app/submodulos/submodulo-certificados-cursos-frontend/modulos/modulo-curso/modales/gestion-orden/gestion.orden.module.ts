import {NgModule} from '@angular/core';
import {GestionOrdenComponent} from './gestion-orden.component';
import {PickListModule} from 'primeng/picklist';
import {ManLabNgBootstrapModule, ModalModule} from 'man-lab-ng';
import {ListboxModule} from 'primeng/listbox';
import {CommonModule} from '@angular/common';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule(
  {
    declarations: [
      GestionOrdenComponent,
    ],
      imports: [
          PickListModule,
          ManLabNgBootstrapModule,
          ModalModule,
          ListboxModule,
          CommonModule,
          TranslocoModule,
      ],
    entryComponents: [
      GestionOrdenComponent,
    ],
    exports: [
      GestionOrdenComponent,
    ],
  }
)
export class GestionOrdenModule {

}
