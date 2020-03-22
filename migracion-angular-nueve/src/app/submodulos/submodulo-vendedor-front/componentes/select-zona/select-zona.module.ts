import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectZonaComponent} from './select-zona/select-zona.component';
import {AutoCompleteModule, DropdownModule} from 'primeng/primeng';

@NgModule({
  declarations: [SelectZonaComponent],
  imports: [CommonModule, DropdownModule, FormsModule, ReactiveFormsModule, AutoCompleteModule],
  exports: [SelectZonaComponent],
})
export class SelectZonaModule {
}
