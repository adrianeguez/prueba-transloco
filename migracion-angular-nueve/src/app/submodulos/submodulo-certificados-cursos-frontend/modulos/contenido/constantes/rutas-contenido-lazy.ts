import {Routes} from '@angular/router';


export const RUTAS_CONTENIDO_LAZY: Routes = [
  {
    path: 'empresa-modulo/:idEmpresa/curso-modulo/:idCurso/modulo-curso-modulo/:idModuloCurso/tema-modulo/:idTema/diapositiva-modulo/idDiapositiva/contenido-modulo',
    loadChildren: () => import( '../contenido.module').then(mod => mod.ContenidoModule)
  }
];
