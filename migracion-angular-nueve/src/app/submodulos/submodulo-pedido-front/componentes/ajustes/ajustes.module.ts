import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjustesComponent } from './ajustes/ajustes.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AjustesComponent],
  imports: [CommonModule, FormsModule],
  exports: [AjustesComponent],
})
export class AjustesModule {}
