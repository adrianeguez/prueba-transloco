import { createNumberMask } from 'text-mask-addons/dist/textMaskAddons';

export const MASK_NUMEROS_DECIMALES = {
  mask: createNumberMask({
    prefix: '',
    thousands: '',
    decimal: '.',
    align: 'right',
    suffix: '',
    integerLimit: 10,
    decimalLimit: 4,
    allowDecimal: true,
    includeThousandsSeparator: false,
    requireDecimal: false,
  })
};

export const MASK_NUMEROS_ENTEROS = {
  mask: createNumberMask({
    prefix: '',
    thousands: '',
    decimal: '',
    align: 'right',
    suffix: '',
    integerLimit: 6,
    decimalLimit: 4,
    allowDecimal: false,
    includeThousandsSeparator: false
  })
};

export const MASK_NUMERO_FACTURA = {
  mask: createNumberMask({
    prefix: '',
    thousands: '',
    decimal: '',
    align: '',
    integerLimit: 9,
    allowDecimal: false,
    allowLeadingZeroes: true,
    includeThousandsSeparator: false
  })
};

export const MASK_NUMERO_SERIE = {
  mask: createNumberMask({
    prefix: '',
    thousands: '',
    decimal: '',
    align: '',
    integerLimit: 6,
    allowDecimal: false,
    allowLeadingZeroes: true,
    includeThousandsSeparator: false
  })
};

export const MASK_NUMERO_AUTORIZACION = {
  mask: createNumberMask({
    prefix: '',
    thousands: '',
    decimal: '',
    align: '',
    allowDecimal: false,
    includeThousandsSeparator: false
  })
};

export const MASK_DINERO = {
  align: 'left',
  thousands: ',',
  decimal: '.',
  precision: 4,
  prefix: '$ '
};

export const MASK_NUMERO_PORCENTUAL = {
  align: 'left',
  thousands: ',',
  decimal: '.',
  precision: 4,
  prefix: '',
  suffix: ' %'
};

export const MASK_DESCUENTO_PORCENTUAL = {
  mask: [ /[1-9]/, /[0-9]/],
  guide: false
};
