# Primero
yo man-lab-yo-ng:clase-formulario Movimiento
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario Movimiento nombre --tipo string --nombreAPresentarse "Nombre" --tooltip "Ingrese nombre del movimiento" --ejemplo "Egreso por ajuste" --minLength 1   input-text --maxLength 30   --required

yo man-lab-yo-ng:campo-formulario Movimiento codigo --tipo string --nombreAPresentarse "Código" --tooltip "Ingrese el código del movimiento" --ejemplo "001" --minLength 1 --required  input-text --maxLength 3

yo man-lab-yo-ng:campo-formulario Movimiento descripcion --tipo string --nombreAPresentarse "descripción" --tooltip "Ingrese la descripción del movimiento" --ejemplo "egreso" --minLength 3  input-text --maxLength 50

yo man-lab-yo-ng:campo-formulario Movimiento numero --tipo string --nombreAPresentarse "Numero" --tooltip "Ingrese el número del movimiento" --ejemplo "1234" --minLength 1 --required  input-text --maxLength 4

yo man-lab-yo-ng:campo-formulario Movimiento numeroInventario --tipo string --nombreAPresentarse "Numero de inventario" --tooltip "Ingrese el número de inventario del movimiento" --ejemplo "1234" --minLength 1 --required  input-text

yo man-lab-yo-ng:campo-formulario Movimiento nombreReferencia --tipo string --nombreAPresentarse "Nombre de referencia" --tooltip "Ingrese el nombre de referencia del movimiento" --ejemplo "egreso" --minLength 1  input-text --maxLength 30

yo man-lab-yo-ng:campo-formulario Movimiento formaNumerar --tipo string --nombreAPresentarse "Forma de numerar"  --tooltip "Elija la forma de numerar para el movimiento" --tipoControl select-many --opcionesSelect "automático,manual" --required

yo man-lab-yo-ng:campo-formulario Movimiento factorStock --tipo string --nombreAPresentarse "Factor de stock"  --tooltip "Elija el factor de stock para el movimiento" --tipoControl select-many --opcionesSelect "1,0,-1" --required

yo man-lab-yo-ng:campo-formulario Movimiento afectaCostoPromedio --tipo string --nombreAPresentarse "Afecta al costo promedio"  --tooltip "Indique si el movimiento afecta al costo promedio" --tipoControl select-many --opcionesSelect "si, no" --required

yo man-lab-yo-ng:campo-formulario Movimiento afectaCostoUltimo --tipo string --nombreAPresentarse "Afecta al costo último"  --tooltip "Indique si el movimiento afecta al costo último" --tipoControl select-many --opcionesSelect "si, no" --required

yo man-lab-yo-ng:campo-formulario Movimiento afectaCostoUltimaTransaccion --tipo string --nombreAPresentarse "Afecta al costo última transacción"  --tooltip "Indique si el movimiento afecta al costo última transacción" --tipoControl select-many --opcionesSelect "si, no" --required

yo man-lab-yo-ng:campo-formulario Movimiento cobrarIVA --tipo string --nombreAPresentarse "Cobrar IVA"  --tooltip "Indique si el movimiento cobra IVA" --tipoControl select-many --opcionesSelect "si, no" --required

yo man-lab-yo-ng:campo-formulario Movimiento retencionIVA --tipo string --nombreAPresentarse "Retención IVA"  --tooltip "Indique si el movimiento tiene retención de IVA" --tipoControl select-many --opcionesSelect "si, no" --required

yo man-lab-yo-ng:campo-formulario Movimiento retencionRenta --tipo string --nombreAPresentarse "Retención renta"  --tooltip "Indique si el movimiento tiene retención de venta" --tipoControl select-many --opcionesSelect "si, no" --required

yo man-lab-yo-ng:campo-formulario Movimiento formaValorarInventario --tipo string --nombreAPresentarse "Forma de valorar inventario"  --tooltip "Elija la forma de valorar el inventario" --tipoControl select-many --opcionesSelect "1,0,-1" --required

yo man-lab-yo-ng:campo-formulario Movimiento afectaDatosUltimaCompra --tipo string --nombreAPresentarse "Afecta datos de última compra"  --tooltip "Indique si el movimiento afecta los datos de última compra" --tipoControl select-many --opcionesSelect "si, no" --required

yo man-lab-yo-ng:campo-formulario Movimiento afectaDatosUltimaVenta --tipo string --nombreAPresentarse "Afecta datos de última venta"  --tooltip "Indique si el movimiento afecta los datos de última venta" --tipoControl select-many --opcionesSelect "si, no" --required

# Tercero

yo man-lab-yo-ng:clase Movimiento

# Cuarto 

yo man-lab-yo-ng:componente Movimiento
