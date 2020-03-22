import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectNivelMenuComponent } from './components/select-nivel-menu/select-nivel-menu.component';
import { DropdownModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectNivelMenuComponent],
  imports: [CommonModule, DropdownModule, FormsModule],
  exports: [SelectNivelMenuComponent],
})
export class SelectNivelMenuModule {}
