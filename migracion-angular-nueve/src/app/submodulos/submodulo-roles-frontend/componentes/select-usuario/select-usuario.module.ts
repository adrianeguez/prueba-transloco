import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectUsuarioComponent } from './select-usuario/select-usuario.component';
import { AutoCompleteModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectUsuarioComponent],
  imports: [CommonModule, AutoCompleteModule, FormsModule],
  exports: [SelectUsuarioComponent],
})
export class SelectUsuarioModule {}
