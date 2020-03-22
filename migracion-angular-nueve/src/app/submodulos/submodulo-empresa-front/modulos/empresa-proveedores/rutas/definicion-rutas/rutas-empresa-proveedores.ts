import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_EMPRESA_PROVEEDORES = {
  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo/:idEmpresa',
    nombre: 'Gestión de Empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },
  rutaGestionEmpresa: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaGestionEmpresaProveedores: {
    ruta: 'empresa-proveedores-modulo',
    nombre: 'Gestión de Empresas Proveedores',
    generarRuta: () => {
      return `empresa-proveedores-modulo/gestion-empresas-proveedor`;
    },
  },
  rutaGestionEmpresaProveedores: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionEmpresaProveedores,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },


};
