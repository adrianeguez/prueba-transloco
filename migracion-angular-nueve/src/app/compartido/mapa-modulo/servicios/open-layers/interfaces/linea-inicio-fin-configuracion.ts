export interface LineaInicioFinConfiguracion {
  coordenadaInicial: {
    latitud?: number;
    longitud?: number;
  };
  coordenadaFinal: {
    latitud?: number;
    longitud?: number;
  };
  configuracionPuntoInicioFin: {
    radio?: number | 10;
    colorLlenado?: [number, number, number, number];
    colorLinea?: [number, number, number, number];
    anchoLinea?: number | 1.5;
  };
  configuracionLinea: {
    colorLlenado?: [number, number, number, number];
    anchoLinea?: number | 8;
    lineaCap?: 'round' | any;
    visible?: boolean | any;
  };
  arregloCoordenadas: [number, number][];
  lineasCreciendo: {
    color?: any;
    color2?: any;
    width?: number;
    width2?: number;
  };
}
