import {Routes} from '@angular/router';

export const RUTAS_STRIPE_LAZY: Routes = [
  {
    path: 'cliente-modulo/curso-modulo/menu-mis-cursos/:idCurso/establecimientos-curso-modulo/:idServicioEstablecimiento/horario-modulo/:idHorario/stripe',
    loadChildren: () =>
      import(
        '../stripe.module'
        ).then(mod => mod.StripeModule),
  },

];
