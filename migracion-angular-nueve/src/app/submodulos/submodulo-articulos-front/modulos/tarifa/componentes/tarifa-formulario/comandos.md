# Primero
yo man-lab-yo-ng:clase-formulario Tarifa
# Segundo
yo man-lab-yo-ng:campo-formulario Tarifa nombre --tipo string --nombreAPresentarse "Nombre *" --tooltip "Ingrese el nombre de la tarifa" --minLength 3 --required input-text --maxLength 60

yo man-lab-yo-ng:campo-formulario Tarifa codigoSri --tipo string --nombreAPresentarse "Código SRI *" --tooltip "Ingrese el código SRI de la tarifa" --ejemplo "C001" --minLength 1 --required input-text --maxLength 10

yo man-lab-yo-ng:campo-formulario Tarifa codigo --tipo string --nombreAPresentarse "Código" --tooltip "Ingrese el código de la tarifa" --ejemplo "C45W" --minLength 1 input-text --maxLength 10

yo man-lab-yo-ng:campo-formulario Tarifa unidadMedida --tipo string --nombreAPresentarse "Unidad medida *" --tooltip "Ingrese la unidad medida de la tarifa" --required --minLength 1 input-text --maxLength 10 --ejemplo "litros, Oz"

yo man-lab-yo-ng:campo-formulario Tarifa cantidad --tipo string --nombreAPresentarse "Cantidad" --tooltip "Ingrese la cantidad de la tarifa" input-text --ejemplo "9" --mascara MASK_NUMEROS_ENTEROS

yo man-lab-yo-ng:campo-formulario Tarifa valorPorcentaje --tipo string --nombreAPresentarse "Valor porcentaje *" --tooltip "Ingrese el valor porcentaje de la tarifa" input-text --ejemplo "28.11%" --mascara PORCENTAJE_MASK_DECIMALES --mascaraFuncion quitarMascaraPorcentaje

yo man-lab-yo-ng:campo-formulario Tarifa valor --tipo string --nombreAPresentarse "Valor *" --tooltip "Ingrese el valor de la tarifa" input-text --ejemplo "14.5524" --mascara PRECIO_MASK_DECIMALES --mascaraFuncion quitarMascaraPrecio
# Tercero 
yo man-lab-yo-ng:clase Tarifa
# Cuarto
yo man-lab-yo-ng:componente Tarifa
