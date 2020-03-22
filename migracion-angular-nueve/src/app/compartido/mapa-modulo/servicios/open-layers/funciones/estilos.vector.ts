declare var ol;
declare var styleCache;

export function generarEstiloRuta(f) {
  return new ol.style.Style({
    image: new ol.style.Circle({
      radius: 10,
      stroke: new ol.style.Stroke({width: 4, color: f.get('color') || [255, 128, 0]}),
      fill: new ol.style.Fill({color: (f.get('color') || [255, 128, 0]).concat([.3])})
    }),
    stroke: new ol.style.Stroke({width: 8, color: f.get('color') || [255, 128, 0]}),
    fill: new ol.style.Fill({color: (f.get('color') || [255, 128, 0]).concat([.3])})
  });
}

export function getFeatureStyle(feature, resolution, sel) {
  const objeto = feature.get('objetoImagen');
  if (objeto) {
    let estilo = styleCache[objeto.idMarcador];
    const configuracionParaTexto = objeto.configuracionTexto;
    let estiloTexto;
    if (configuracionParaTexto) {
      estiloTexto = {
        font: configuracionParaTexto.estiloPixelesFuenteDelTexto ?
          configuracionParaTexto.estiloPixelesFuenteDelTexto : '12px sans-serif',
        text: configuracionParaTexto.nombreAMostrar ? configuracionParaTexto.nombreAMostrar : 'No hay texto',
        offsetY: configuracionParaTexto.espaciadoDesdeElCentroHaciaAbajo ?
          configuracionParaTexto.espaciadoDesdeElCentroHaciaAbajo : '50',
        textBaseline: 'bottom',
        textAlign: configuracionParaTexto.alineacionTexto ? configuracionParaTexto.alineacionTexto : 'center',
        fill: new ol.style.Fill({color: configuracionParaTexto.colorTexto ? configuracionParaTexto.colorTexto : '#171717'}),
        overflow: false,
        scale: 1,
        padding: configuracionParaTexto.padding ? configuracionParaTexto.padding : [5, 5, 5, 5]
      };
    }
    if (estilo) {
      if (objeto.focus && !styleCache[objeto.idMarcador].focus) {
        estiloTexto.backgroundFill = new ol.style.Fill({
          color: configuracionParaTexto.colorBackground ? configuracionParaTexto.colorBackground : '#00091f'
        });
        estiloTexto.fill = new ol.style.Fill({color: '#fff'});
        estiloTexto.font = '16px sans-serif';
        estiloTexto.offsetY = '68';

        styleCache[objeto.idMarcador].setText(new ol.style.Text(estiloTexto));
        styleCache[objeto.idMarcador].getImage().setScale(1.4);
        styleCache[objeto.idMarcador].focus = true;
      } else {
        if (styleCache[objeto.idMarcador].focus === true) {
          styleCache[objeto.idMarcador].setText(new ol.style.Text(estiloTexto));
          styleCache[objeto.idMarcador].getImage().setScale(1);
          estiloTexto.fill = new ol.style.Fill({color: '#171717'});
          estiloTexto.font = '12px sans-serif';
          estiloTexto.offsetY = '50';
          styleCache[objeto.idMarcador].focus = false;
        }
      }
      styleCache[objeto.idMarcador].objeto = objeto;
      return styleCache[objeto.idMarcador];
    } else {
      estiloTexto.fill = new ol.style.Fill({color: '#00091f'});
      styleCache[objeto.idMarcador] = estilo = new ol.style.Style
      ({
        image: new ol.style.Photo({
          src: objeto.img,
          radius: 25,
          shadow: 1,
          crop: true,
          kind: 'folio',
          stroke: new ol.style.Stroke(
            {
              width: 2,
              color: objeto.focus ? 'rgb(43,85,204)' : 'rgb(254,253,255)',
            })
        }),
        text: new ol.style.Text(estiloTexto)
      });
      styleCache[objeto.idMarcador].objeto = objeto;
      return styleCache[objeto.idMarcador];
    }
  }
}

export function estiloRuta(f) {
  return [
    new ol.style.Style({
      stroke: new ol.style.Stroke({color: '#ff081c', width: 8}),
      fill: new ol.style.Fill({color: [255, 255, 255, .5]})
    }),
    new ol.style.Style({
      image: new ol.style.RegularShape({radius: 4, points: 4, fill: new ol.style.Fill({color: '#f00'})})
    })
  ];
}
