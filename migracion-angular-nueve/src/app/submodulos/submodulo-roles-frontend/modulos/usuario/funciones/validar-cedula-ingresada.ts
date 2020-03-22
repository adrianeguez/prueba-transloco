import { quitarMaskCedula } from '@manticore-labs/ng-api';

export function validarCedulaIngresada(cedula) {
  const numeroDeDigitosCedula = quitarMaskCedula(cedula).length;
  return numeroDeDigitosCedula < 10 ? false : true;
}
