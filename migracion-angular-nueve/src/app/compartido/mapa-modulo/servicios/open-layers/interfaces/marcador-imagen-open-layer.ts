export interface MarcadorImagenOpenLayer {
  latitud: number;
  longitud: number;
  objetoMarcadorImagen: ObjetoImagenMarcador;
}

export interface ObjetoImagenMarcador {
  img: string;
  idMarcador: number | string;
  configuracionParaTexto?: {
    estiloPixelesFuenteDelTexto: string;
    nombreAMostrar: string;
    espaciadoDesdeElCentroHaciaAbajo: number;
    alineacionTexto?: 'left' | 'right' | 'center' | 'end' | 'start';
    colorTexto?: string;
    colorBackground?: string;
    padding?: [number, number, number, number]
  };

  [nombre: string]: any;
}
