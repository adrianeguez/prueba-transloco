import {GUARDS_FRONT_COMUN} from '../../submodulo-front-comun/constantes/guards-front-comun';

export const RUTAS_ARTICULO = [
  {
    path: 'configuraciones/articulo',
    canActivate: GUARDS_FRONT_COMUN,
    loadChildren: () =>
      import(
        './../../../submodulos/submodulo-articulos-front/ruta/ruta.module'
      ).then(mod => mod.RutaModule),
  },
  {
    path: 'empresa-modulo/:idEmpresa/empresa-proveedores-modulo/gestion-empresas-proveedor/articulo-proveedor-modulo',
    canActivate: GUARDS_FRONT_COMUN,
    loadChildren: () =>
      import(
        './../../../submodulos/submodulo-articulos-front/modulos/articulo-proveedor/articulo-proveedor.module'
        ).then(modulo => modulo.ArticuloProveedorModule),
  }
];
