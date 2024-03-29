import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuInterfazComponent } from './components/menu-interfaz/menu-interfaz.component';
import { MenuPanelComponent } from './components/menu-panel/menu-panel.component';
import { MenuLateralIconosComponent } from './components/menu-lateral-iconos/menu-lateral-iconos.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { InputTextModule, MenuModule, PanelMenuModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    MenuInterfazComponent,
    MenuPanelComponent,
    MenuLateralIconosComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MenuModule,
    PanelMenuModule,
    InputTextModule,
  ],
  exports: [MenuInterfazComponent],
})
export class MenuInterfazModule {}
