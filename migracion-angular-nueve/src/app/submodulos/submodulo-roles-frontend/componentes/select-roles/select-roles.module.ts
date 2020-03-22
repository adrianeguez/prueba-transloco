import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { SelectRolComponent } from './componentes/select-rol/select-rol.component';
import { ConfiguracionModuloInterface } from '../../../submodulo-front-comun/interfaces/configuracion-modulo.interface';

@NgModule({
  declarations: [SelectRolComponent],
  imports: [CommonModule, DropdownModule, FormsModule],
  exports: [SelectRolComponent],
})
export class SelectRolesModule {}
