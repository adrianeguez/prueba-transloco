import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPermisoComponent } from './components/filter-permiso/filter-permiso.component';
import { FormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ModulosModule} from '../../modulos/modulos/modulos.module';

@NgModule({
  declarations: [FilterPermisoComponent],
  imports: [CommonModule, FormsModule, AutoCompleteModule, ModulosModule],
  exports: [FilterPermisoComponent],
})
export class FilterPermisoNombreModule {}
