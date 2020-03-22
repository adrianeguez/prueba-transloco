export const LETRAS_NUMEROS_ESPACIOS = /^[_A-z0-9À-ÿ\u00f1\u00d1]*((-|\s)*[_A-z0-9À-ÿ\u00f1\u00d1])*$/;

export const NO_ESPACIOS_BN_BLANCO = /^\S+$/;

export const SOLO_LETRAS_NUMEROS = /^[_A-z0-9]*$/;

export const SOLO_LETRAS_ESPACIOS_NUMEROS = /^[A-Za-z0-9\s]+$/;

export const SOLO_LETRAS = /^[_A-z]*$/;

export const SOLO_ENTEROS_O_DECIMALES__POSITIVOS = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;

export const RANGO_LONGITUD_LOCALIZAIION = /^-?([0-9]|[0-9][0-9]|1[0-7][0-9]|180)(\.\d{1,5})?$/;

export const RANGO_LATITUD_LOCALIZAIION = /^-?([0-9]|[1-8][0-9]|90)(\.\d{1,5})?$/;

export const SOLO_LETRAS_ESPACIOS_NUMEROS_TILDE_ENIES = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9.¨\s]*$/;
