export const COLUMNAS_INGRESO_EGRESO = [
  {field: '', header: '#'},
  {field: 'codigo', header: 'Código'},
  {field: 'descripcion', header: 'Descripción'},
  {field: 'cantidad', header: 'Cantidad'},
  {field: 'valorUnitario', header: 'Valor unitario'},
  {field: 'subtotal', header: 'Subtotal'},
  {field: 'acciones', header: 'Acciones'}
];

export const COLUMNAS_COMPRA_DEVOLUCION_PROVEEDORES = [
  {field: '', header: '#'},
  {field: 'codigo', header: 'Código'},
  {field: 'descripcion', header: 'Descripción'},
  {field: 'cantidad', header: 'Cantidad'},
  {field: 'cantidadPromocion', header: 'Promoción'},
  {field: 'valorUnitario', header: 'Valor unitario'},
  {field: 'descuentoPorcentual', header: '% Desc.'},
  {field: 'descuento', header: 'Desc.'},
  {field: 'subtotal', header: 'Subtotal'},
  {field: 'formaCalculo', header: 'Forma cálculo'},
  {field: 'acciones', header: 'Acciones'},
  /*{field: 'cantidadPedida', header: 'Cantidad pedida'},
  {field: 'cantidadPendiente', header: 'Cantidad pendiente'},
  {field: 'cantidadDadaBaja', header: 'Cantidad dada de baja'},
  {field: 'cantidadEntregada', header: 'Cantidad entregada'}*/
];

export const COLUMNAS_FACTURA_DEVOLUCION_CLIENTES = [
  { field: 'codigo', header: 'Código' },
  { field: 'descripcion', header: 'Descripción' },
  { field: 'cantidad', header: 'Cantidad' },
  { field: 'cantidadPromocion', header: 'Promoción' },
  { field: 'valorUnitario', header: 'Valor unitario' },
  { field: 'descuentos', header: 'Desc.' },
  { field: 'descuentosPorcentuales', header: '% Desc.' },
  { field: 'totalDescuentos', header: 'Total de descuentos' },
  { field: 'totalBruto', header: 'Total bruto' },
  { field: 'descuentoValor', header: 'Desc. val' },
  { field: 'descuentoPromocion', header: 'Desc. promoción' },
  { field: 'subtotal', header: 'Subtotal' },
  { field: 'acciones', header: 'Acciones' },
  { field: 'cantidadPedida', header: 'Cantidad pedida' },
  { field: 'cantidadPendiente', header: 'Cantidad pendiente' },
  { field: 'cantidadDadaBaja', header: 'Cantidad dada de baja' },
  { field: 'cantidadEntregada', header: 'Cantidad entregada' },
];

export const COLUMNAS_FACTURA_VENTA = [
  {field: 'codigo', header: 'Código'},
  {field: 'descripcion', header: 'Descripción'},
  {field: 'cantidad', header: 'Cantidad'},
  {field: 'cantidadPromocion', header: 'Promoción'},
  {field: 'valorUnitario', header: 'Valor unitario'},
  {field: 'ingresarDescuentos', header: 'Descuentos'},
  {field: 'totalDescuentos', header: 'Total de descuentos'},
  {field: 'totalBruto', header: 'Total bruto'},
  {field: 'descuentoValor', header: 'Desc. val'},
  {field: 'descuentoPromocion', header: 'Desc. promoción'},
  {field: 'subtotal', header: 'Subtotal'},
  {field: 'acciones', header: 'Acciones'},
];

export const COLUMNAS_TRANSFERENCIAS_BODEGA = [
  {field: '', header: '#'},
  {field: 'codigo', header: 'Código'},
  {field: 'descripcion', header: 'Descripción'},
  {field: 'cantidad', header: 'Cantidad'},
  {field: 'valorUnitario', header: 'Valor unitario'},
  {field: 'subtotal', header: 'Subtotal'},
  {field: 'acciones', header: 'Acciones'}
];

export const COLUMNAS_PEDIDOS_COMPRA = [
  {field: 'codigo', header: 'Código'},
  {field: 'descripcion', header: 'Descripción'},
  {field: 'especificacion', header: 'Especificación'},
  {field: 'unidadMedida', header: 'Unidad de medida'},
  {field: 'cantidad', header: 'Cantidad'},
  {field: 'acciones', header: 'Acciones'}
];

export const COLUMNAS_LISTAR_PEDIDOS = [
  {field: 'numeroDocumentoMovimiento', header: 'Documento'},
  {field: 'estatus', header: 'Estado'},
  {field: 'subtotal', header: 'Subtotal'},
  {field: 'fechaPedido', header: 'Fecha del pedido'},
  {field: 'descripcionPeriodo', header: 'Periodo'},
  {field: 'idBodegaOrigen', header: 'Bodega de origen'},
  {field: 'acciones', header: 'Acciones'}
];

export const COLUMNAS_LISTAR_PEDIDOS_COMPRA = [
  {field: 'numeroDocumentoMovimiento', header: 'Documento'},
  {field: 'estatus', header: 'Estado'},
  {field: 'subtotal', header: 'Subtotal'},
  {field: 'fechaPedido', header: 'Fecha del pedido'},
  {field: 'descripcionPeriodo', header: 'Periodo'},
  {field: 'idBodegaOrigen', header: 'Bodega de origen'},
  {field: 'idProveedor', header: 'Proveedor'},
  {field: 'acciones', header: 'Acciones'}
];

export const COLUMNAS_LISTAR_PEDIDOS_TRANSFERECIA = [
  {field: 'numeroDocumentoMovimiento', header: 'Documento'},
  {field: 'estatus', header: 'Estado'},
  {field: 'subtotal', header: 'Subtotal'},
  {field: 'fechaPedido', header: 'Fecha del pedido'},
  {field: 'descripcionPeriodo', header: 'Periodo'},
  {field: 'idBodegaOrigen', header: 'Bodega de origen'},
  {field: 'idBodegaDestino', header: 'Bodega destino'},
  {field: 'acciones', header: 'Acciones'}
];

export const COLUMNAS_INGRESO_EGRESO_DETALLE = [
  {field: 'codigo', header: 'Código'},
  {field: 'descripcion', header: 'Descripción'},
  {field: 'cantidad', header: 'Cantidad'},
  {field: 'valorUnitario', header: 'Valor unitario'},
  {field: 'subtotal', header: 'Subtotal'}
];

export const COLUMNAS_COMPRA_DETALLE = [
  {field: 'codigo', header: 'Código'},
  {field: 'descripcion', header: 'Descripción'},
  {field: 'cantidad', header: 'Cantidad'},
  {field: 'cantidadPromocion', header: 'Promoción'},
  {field: 'valorUnitario', header: 'Valor unitario'},
  {field: 'descuentoPorcentual', header: '% Desc.'},
  {field: 'descuento', header: 'Desc.'},
  {field: 'subtotal', header: 'Subtotal'}
];

export const COLUMNAS_TRANSFERENCIA_DETALLE = [
  {field: 'codigo', header: 'Código'},
  {field: 'descripcion', header: 'Descripción'},
  {field: 'cantidad', header: 'Cantidad'},
  {field: 'valorUnitario', header: 'Valor unitario'},
  {field: 'subtotal', header: 'Subtotal'}
];
