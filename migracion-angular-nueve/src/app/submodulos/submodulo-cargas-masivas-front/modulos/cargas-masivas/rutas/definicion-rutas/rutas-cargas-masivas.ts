import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_CARGAS_MASIVAS = {
  _rutaConfiguraciones: {
    ruta: 'configuraciones',
    nombre: 'Configuraciones',
    generarRuta: () => {
      return 'configuraciones';
    },
  },
  _rutaMenuCargasMasivas: {
    ruta: 'menu',
    nombre: 'Menú de cargas masivas',
    generarRuta: () => {
      return '/configuraciones/cargas-masivas/menu';
    },
  },
  _rutaGestionCargasMasivas: {
    ruta: 'gestion-cargas-masivas',
    nombre: 'Gestión de cargas masivas',
    generarRuta: () => {
      return '/configuraciones/cargas-masivas/gestion-cargas-masivas';
    },
  },
  _rutaCargaMasiva: {
    ruta: 'carga-masiva',
    nombre: 'Carga masiva',
    generarRuta: nombreCarga => {
      return `/configuraciones/cargas-masivas/${nombreCarga}`;
    },
  },

  rutaConfiguraciones: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaConfiguraciones];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  rutaMenuCargasMasivas: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaMenuCargasMasivas];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  rutaGestionCargasMasivas: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaGestionCargasMasivas];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  rutaCargaMasiva: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaCargaMasiva];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
