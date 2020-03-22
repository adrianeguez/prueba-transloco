import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaGestionPruebaComponent} from './rutas/ruta-gestion-prueba/ruta-gestion-prueba.component';
import {RutaTestComponent} from './rutas/ruta-test/ruta-test.component';

const routes: Routes = [
  {
    path: 'gestion-prueba',
    component: RutaGestionPruebaComponent,
  },
  {
    path: 'test',
    component: RutaTestComponent,
  },
  // {
  //   path: 'pretest',
  //   component: RutaPretestComponent,
  // },
  {
    path: '',
    redirectTo: 'gestion-prueba',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruebaRoutingModule {
}
