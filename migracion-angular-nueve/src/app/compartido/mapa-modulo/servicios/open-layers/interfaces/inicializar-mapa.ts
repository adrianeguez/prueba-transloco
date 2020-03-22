import { EdificioLocalizacionInterface } from '../../../interfaces/edificions.localizacion.interface';

export interface InicializarMapa {
  latitud: number;
  longitud: number;
  zoom?: 17 | number;
  nombreMapa: 'map' | string;
  intervalo: 300 | string;
  mostrarPuntoUsuario?: boolean;
  mostrarEscala?: boolean;
  mostrarIrAPuntoUsuario?: boolean;
  tipo?: string;
  configuracionBotonIrAPuntoUsuario?: {
    html: string,
    claseCss: string,
    titulo: string,
  };
  imagenPuntoUsuario?: any;
  mostrarBarraEdicion?: boolean;
  configuracionBarraEdicion?: InteractionsInterface;
  edificios?: EdificioLocalizacionInterface[];
}

export interface InteractionsInterface {
  Select?: boolean | string;
  Offset?: boolean | string;
  DrawPolygon?: boolean | string;
  DrawPoint?: boolean | string;
  DrawLine?: boolean | string;
  Info?: boolean | string;
  Split?: boolean | string;
  DrawHole?: boolean | string;
  DrawRegular?: boolean;
  Undo?: boolean | string;
  Redo?: boolean | string;
  Point?: boolean | string;
  Transform?: boolean | string;
  FillAttribute?: boolean | string;
  Delete?: boolean | string;
}
