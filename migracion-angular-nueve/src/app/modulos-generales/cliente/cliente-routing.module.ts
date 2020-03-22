import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaInicioClienteComponent} from './rutas/ruta-inicio-cliente/ruta-inicio-cliente.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: RutaInicioClienteComponent,
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule {
}
