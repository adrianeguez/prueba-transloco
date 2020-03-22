import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionCargasMasivasComponent } from './rutas/ruta-gestion-cargas-masivas/ruta-gestion-cargas-masivas.component';
import { RutaMenuCargasMasivasComponent } from './rutas/ruta-menu-cargas-masivas/ruta-menu-cargas-masivas.component';
import { RutaCargaMasivaComponent } from './rutas/ruta-carga-masiva/ruta-carga-masiva.component';

const routes: Routes = [
  {
    path: 'menu',
    component: RutaMenuCargasMasivasComponent,
  },
  {
    path: 'gestion-cargas-masivas',
    component: RutaGestionCargasMasivasComponent,
  },
  {
    path: ':nombreCarga',
    component: RutaCargaMasivaComponent,
  },
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargasMasivasRoutingModule {}
