import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaGestionDiapositivaComponent} from './rutas/ruta-gestion-diapositiva/ruta-gestion-diapositiva.component';
import {RutaMenuDiapositivaComponent} from './rutas/ruta-menu-diapositiva/ruta-menu-diapositiva.component';

const routes: Routes = [
  {
    path: 'gestion-diapositivas',
    component: RutaGestionDiapositivaComponent
  },
  {
    path: 'menu-diapositiva',
    component: RutaMenuDiapositivaComponent
  },
  {
    path: '',
    redirectTo: 'gestion-diapositivas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiapositivaRoutingModule {
}
