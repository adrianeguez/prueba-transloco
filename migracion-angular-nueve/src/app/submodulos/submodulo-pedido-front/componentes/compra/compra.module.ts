import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraComponent } from './compra/compra.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
  declarations: [CompraComponent],
  exports: [CompraComponent],
  imports: [CommonModule, NgbDatepickerModule, NgbModule, FormsModule, TextMaskModule],
})
export class CompraModule {}
