import { Routes } from '@angular/router';

export const RUTAS_HORARIO: Routes = [
  {
    path: ':idEmpresa/horario-modulo',
    loadChildren: () =>
      import('../horario.module').then(mod => mod.HorarioModule),
  },
];
