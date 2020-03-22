import {RUTAS_ARTICULO} from './submodulos/submodulo-articulos-front/constantes/rutas-articulo';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RUTAS_EMPRESA} from './submodulos/submodulo-empresa-front/constantes/rutas-empresa';
import {RUTAS_PEDIDOS} from './submodulos/submodulo-pedido-front/constantes/rutas-pedidos';
import {RUTAS_CARGAS_MASIVAS} from './submodulos/submodulo-cargas-masivas-front/constantes/rutas-cargas-masivas';
import {RutaNoEncontradoComponent} from './submodulos/submodulo-front-comun/rutas/ruta-no-encontrado/ruta-no-encontrado.component';
import {RUTAS_INVENTARIO} from './submodulos/submodulo-inventario-front/constantes/rutas-inventario';
import {RUTAS_FRONT_COMUN} from './submodulos/submodulo-front-comun/constantes/rutas-front-comun';
import {RUTAS_ROLES_USUARIO} from './submodulos/submodulo-roles-frontend/constantes/rutas-roles-usuario';
import {RUTAS_CERTIFICADOS_CURSOS} from './submodulos/submodulo-certificados-cursos-frontend/constantes/rutas-certificados-cursos';
import {RUTAS_CLIENTE_LAZY} from './modulos-generales/cliente/constantes/rutas-lazy-cliente';


const routes: Routes = [
  ...RUTAS_FRONT_COMUN,
  ...RUTAS_EMPRESA,
  ...RUTAS_CARGAS_MASIVAS,
  ...RUTAS_ARTICULO,
  ...RUTAS_PEDIDOS,
  ...RUTAS_INVENTARIO,
  ...RUTAS_ROLES_USUARIO,
  ...RUTAS_CERTIFICADOS_CURSOS,
  ...RUTAS_CLIENTE_LAZY,
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: RutaNoEncontradoComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
