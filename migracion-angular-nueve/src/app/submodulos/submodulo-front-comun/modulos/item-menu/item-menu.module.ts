import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemMenuComponent} from './item-menu/item-menu.component';

@NgModule({
  declarations: [ItemMenuComponent],
  imports: [
    CommonModule
  ],
  exports: [ItemMenuComponent]
})
export class ItemMenuModule {
}
