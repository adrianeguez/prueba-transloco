import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisoDirective } from './permiso.directive';

@NgModule({
  declarations: [PermisoDirective],
  imports: [
    CommonModule
  ],
  exports: [PermisoDirective]
})
export class PermisoDirectiveModule { }
