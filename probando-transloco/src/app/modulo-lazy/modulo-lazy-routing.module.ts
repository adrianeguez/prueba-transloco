import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaUnoComponent} from './rutas/ruta-uno/ruta-uno.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'uno',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: RutaUnoComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloLazyRoutingModule {
}
