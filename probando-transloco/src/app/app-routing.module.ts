import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaHomeComponent} from './rutas/ruta-home/ruta-home.component';


const routes: Routes = [
  {
    path: 'mmodulo-lazy',
    loadChildren: () =>
      import(
        './modulo-lazy/modulo-lazy.module'
        ).then(mod => mod.ModuloLazyModule),
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: RutaHomeComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
