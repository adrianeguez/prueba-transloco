import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionEmpresasComponent } from './rutas/ruta-gestion-empresas/ruta-gestion-empresas.component';

const routes: Routes = [
  {
    path: 'gestion',
    component: RutaGestionEmpresasComponent,
  },
  {
    path: ':idEmpresa/edificio-modulo',
    loadChildren: () =>
      import('../edificio/edificio.module').then(mod => mod.EdificioModule),
  },
  {
    path: ':idEmpresa/contacto-empresa-modulo',
    loadChildren: () =>
      import('../contacto-empresa/contacto-empresa.module').then(
        mod => mod.ContactoEmpresaModule,
      ),
  },
  {
    path: ':idEmpresa/departamento-empresa-modulo',
    loadChildren: () =>
      import('../departamento-empresa/departamento-empresa.module').then(
        mod => mod.DepartamentoEmpresaModule,
      ),
  },
  {
    path: ':idEmpresa/empresa-clientes-modulo',
    loadChildren: () =>
      import('../empresa-clientes/empresa-clientes.module').then(
        mod => mod.EmpresaClientesModule,
      ),
  },
  {
    path: ':idEmpresa/empresa-proveedores-modulo',
    loadChildren: () =>
      import('../empresa-proveedores/empresa-proveedores.module').then(
        mod => mod.EmpresaProveedoresModule,
      ),
  },
  {
    path: ':idEmpresa/subempresa-modulo',
    loadChildren: () =>
      import('../subempresa/subempresa.module').then(
        mod => mod.SubempresaModule,
      ),
  },
  {
    path: ':idEmpresa/tipo-cargo-modulo',
    loadChildren: () =>
      import('../tipo-cargo/tipo-cargo.module').then(
        mod => mod.TipoCargoModule,
      ),
  },
  {
    path: ':idEmpresa/articulo-empresa-modulo',
    loadChildren: () =>
      import('../articulo-empresa/articulo-empresa.module').then(
        mod => mod.ArticuloEmpresaModule,
      ),
  },
  {
    path: ':idEmpresa/vendedor-modulo',
    // tslint:disable-next-line: max-line-length
    loadChildren: () =>
      import(
        './../../../submodulo-vendedor-front/modulos/datos-vendedor/datos-vendedor.module'
      ).then(mod => mod.DatosVendedorModule),
  },
  {
    path: ':idEmpresa/monitoreo-vendedores-modulo',
    // tslint:disable-next-line: max-line-length
    loadChildren: () =>
      import(
        './../../../submodulo-vendedor-front/modulos/monitoreo-vendedores/monitoreo-vendedores.module'
      ).then(mod => mod.MonitoreoVendedoresModule),
  },
  {
    path: ':idEmpresa/asignar-vendedores-modulo',
    // tslint:disable-next-line: max-line-length
    loadChildren: () =>
      import(
        './../../../submodulo-vendedor-front/modulos/ruta-cliente/ruta-cliente.module'
      ).then(mod => mod.RutaClienteModule),
  },
  {
    path: ':idEmpresa/tipo-movimiento-modulo',
    loadChildren: () =>
      import('../tipo-movimiento/tipo-movimiento.module').then(
        mod => mod.TipoMovimientoModule,
      ),
  },
  {
    path: ':idEmpresa/tipo-vendedor-modulo',
    // tslint:disable-next-line:max-line-length
    loadChildren: () =>
      import(
        '../../../submodulo-vendedor-front/modulos/tipo-vendedor/tipo-vendedor.module'
      ).then(mod => mod.TipoVendedorModule),
  },
  {
    path: ':idEmpresa/periodo-venta-modulo',
    // tslint:disable-next-line:max-line-length
    loadChildren: () =>
      import(
        '../../../submodulo-vendedor-front/modulos/periodo-venta/periodo-venta.module'
      ).then(mod => mod.PeriodoVentaModule),
  },
  {
    path: ':idEmpresa/escala-vendedor-modulo',
    // tslint:disable-next-line:max-line-length
    loadChildren: () =>
      import(
        '../../../submodulo-vendedor-front/modulos/escala-vendedor/escala-vendedor.module'
      ).then(mod => mod.EscalaVendedorModule),
  },
  {
    path: ':idEmpresa/ruta-modulo',
    loadChildren: () =>
      import('../../../submodulo-vendedor-front/modulos/ruta/ruta.module').then(
        mod => mod.RutaModule,
      ),
  },
  {
    path: ':idEmpresa/tipo-logro-visita-modulo',
    // tslint:disable-next-line:max-line-length
    loadChildren: () =>
      import(
        '../../../submodulo-vendedor-front/modulos/tipo-logro-visita/tipo-logro-visita.module'
      ).then(mod => mod.TipoLogroVisitaModule),
  },
  {
    path: ':idEmpresa/cronogramas-modulo',
    // tslint:disable-next-line:max-line-length
    loadChildren: () =>
      import(
        '../../../submodulo-vendedor-front/modulos/cronograma-vendedor/cronograma-vendedor.module'
      ).then(mod => mod.CronogramaVendedorModule),
  },
  {
    path: ':idEmpresa/pedidos-modulo',
    loadChildren: () =>
      import(
        '../../../submodulo-pedido-front/modulos/pedidos/pedidos.module'
      ).then(mod => mod.PedidosModule),
  },
  {
    path: '',
    redirectTo: 'gestion',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaRoutingModule {}
