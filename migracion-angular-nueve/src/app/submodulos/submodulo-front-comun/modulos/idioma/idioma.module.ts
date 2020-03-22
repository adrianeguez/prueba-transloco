import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CambiarIdiomaComponent } from './cambiar-idioma/cambiar-idioma.component';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [CambiarIdiomaComponent],
  exports: [
    CambiarIdiomaComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    TranslocoModule
  ]
})
export class IdiomaModule { }
