import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombrePermisoFormularioComponent } from './components/nombre-permiso-formulario/nombre-permiso-formulario.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NombrePermisoFormularioComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [NombrePermisoFormularioComponent],
  providers: [],
})
export class NombrePermisoModule {}
