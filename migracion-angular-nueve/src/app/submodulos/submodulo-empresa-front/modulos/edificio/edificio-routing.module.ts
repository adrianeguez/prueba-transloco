import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionEdificiosComponent } from './rutas/ruta-gestion-edificios/ruta-gestion-edificios.component';

const routes: Routes = [
  {
    path: 'gestion-edificios',
    component: RutaGestionEdificiosComponent,
  },
  {
    path: ':idEdificio/bodega-modulo',
    loadChildren: () =>
      import('../bodega/bodega.module').then(mod => mod.BodegaModule),
  },
  {
    path: ':idEdificio/establecimiento-modulo',
    loadChildren: () =>
      import('../establecimiento/establecimiento.module').then(
        mod => mod.EstablecimientoModule,
      ),
  },
  {
    path: ':idEdificio/piso-modulo',
    loadChildren: () =>
      import('../piso/piso.module').then(mod => mod.PisoModule),
  },
  {
    path: '',
    redirectTo: 'gestion-edificios',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdificioRoutingModule {}
