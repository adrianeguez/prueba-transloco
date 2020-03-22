import {HttpClient} from '@angular/common/http';

export const scopeModuloLazy = (http: HttpClient) => {
  const loaderArticulo = ['en', 'es'].reduce((acc, lang) => {
    acc[lang] = () => http.get(`/assets/i18n/modulo-lazy/articulo/${lang}.json`).toPromise();
    return acc;
  }, {});

  return {scope: 'core', loader: loaderArticulo};
};

