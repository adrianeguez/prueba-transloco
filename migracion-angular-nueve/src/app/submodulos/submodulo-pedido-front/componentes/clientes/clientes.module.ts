import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { FieldsetModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClientesComponent],
  exports: [ClientesComponent],
  imports: [CommonModule, FieldsetModule, FormsModule],
})
export class ClientesModule {}
