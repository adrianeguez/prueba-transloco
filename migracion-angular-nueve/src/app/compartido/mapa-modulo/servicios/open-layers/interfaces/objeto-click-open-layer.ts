export interface ObjetoEventoClickOpenLayer<ObjetoMapa> {
    objetoImagen: ObjetoMapa;
    coordenadas: {
        latitud: number;
        longitud: number;
    };
    elemento: any;
    salioDeFoco?: boolean;
}
