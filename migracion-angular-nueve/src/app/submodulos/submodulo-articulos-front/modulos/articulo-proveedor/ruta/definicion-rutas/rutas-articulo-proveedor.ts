import { generarRespuestaRuta } from '@manticore-labs/ng-api';
import {RUTAS_EMPRESA_PROVEEDORES} from '../../../../../submodulo-empresa-front/modulos/empresa-proveedores/rutas/definicion-rutas/rutas-empresa-proveedores';


export let RUTAS_ARTICULO_PROVEEDOR = {
  _rutaInicio: {
    ruta: `articulo-proveedor-modulo`,
    nombre: 'Modulo artículo proveedor',
    generarRuta: () => {
      return `articulo-proveedor-modulo`;
    }
  },

  rutaInicio: function (arreglo = false, migasDePan = false, argumentos?: any[]) {
    const rutaArreglo = [this._rutaInicio];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  _gestionArticuloProveedor: {
    ruta: ':idEmpresaProveedor/gestion-articulo-proveedor',
    nombre: 'Gestión artículo proveedor',
    generarRuta: (...idEmpresaProveedor) => {
      return `${idEmpresaProveedor[1]}/gestion-articulo-proveedor`;
    }
  },

  gestionArticuloProveedor: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_EMPRESA_PROVEEDORES._rutaGestionEmpresa,
      RUTAS_EMPRESA_PROVEEDORES._rutaGestionEmpresaProveedores,
      this._rutaInicio,
      this._gestionArticuloProveedor];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },


};

