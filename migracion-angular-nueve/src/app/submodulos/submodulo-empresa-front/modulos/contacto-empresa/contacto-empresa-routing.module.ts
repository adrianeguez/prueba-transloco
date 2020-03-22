import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionContactosEmpresaComponent } from './rutas/ruta-gestion-contactos-empresa/ruta-gestion-contactos-empresa.component';

const routes: Routes = [
  {
    path: 'gestion-contactos-empresa',
    component: RutaGestionContactosEmpresaComponent,
  },
  {
    path: ':idContactoEmpresa/datos-contacto-modulo',
    loadChildren: () =>
      import('../datos-contacto/datos-contacto.module').then(
        mod => mod.DatosContactoModule,
      ),
  },
  {
    path: '',
    redirectTo: 'gestion-contactos-empresa',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactoEmpresaRoutingModule {}
