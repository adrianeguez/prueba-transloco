import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCiudadComponent } from './select-ciudad/select-ciudad.component';
import { DropdownModule } from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
  declarations: [SelectCiudadComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
  ],
  exports: [SelectCiudadComponent],
})
export class SelectCiudadModule {}
