import { ESTADOS } from '../enums/estados';

export const OPCIONES_SELECT_ESTADO = [
  { label: 'Filtre por estado', value: undefined },
  { label: 'Activo', value: ESTADOS.Activo },
  { label: 'Inactivo', value: ESTADOS.Inactivo },
];
