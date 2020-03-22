import { createNumberMask } from 'text-mask-addons/dist/textMaskAddons';
export const PORCENTAJE_MASK_DECIMALES = {
  mask: createNumberMask({
    prefix: '',
    thousands: '.',
    decimal: ',',
    align: 'right',
    suffix: ' %',
    integerLimit: 2,
    decimalLimit: 2,
    allowDecimal: false,
    includeThousandsSeparator: false,
    requireDecimal: true,
  }),
};

export const PRECIO_MASK_DECIMALES = {
  mask: createNumberMask({
    prefix: '',
    thousands: '.',
    decimal: ',',
    align: 'right',
    suffix: ' $',
    integerLimit: 6,
    decimalLimit: 4,
    includeThousandsSeparator: false,
    requireDecimal: true,
    allowDecimal: false,
  }),
};

export const MASK_NUMEROS_ENTEROS = {
  mask: createNumberMask({
    prefix: '',
    thousands: '',
    decimal: '',
    align: 'right',
    suffix: '',
    integerLimit: 6,
    decimalLimit: 0,
    allowDecimal: false,
    includeThousandsSeparator: false,
  }),
};

export const MASK_NUMEROS_DECIMALES = {
  mask: createNumberMask({
    prefix: '',
    thousands: '',
    decimal: '',
    align: 'right',
    suffix: '',
    integerLimit: 6,
    decimalLimit: 4,
    allowDecimal: false,
    includeThousandsSeparator: false,
    requireDecimal: true,
  }),
};
