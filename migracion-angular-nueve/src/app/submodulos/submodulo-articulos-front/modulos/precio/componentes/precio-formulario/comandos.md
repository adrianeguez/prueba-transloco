# Primero
yo man-lab-yo-ng:clase-formulario Precio
# Segundo
yo man-lab-yo-ng:campo-formulario Precio valor --tipo string --nombreAPresentarse "Precio *" --tooltip "Ingrese el precio del articulo" --required input-text --ejemplo "15.00"

yo man-lab-yo-ng:campo-formulario Precio valorIncentivo --tipo string --nombreAPresentarse "Valor incentivo" --tooltip "Ingrese el valor incentivo del articulo" input-text --ejemplo "15.00"

yo man-lab-yo-ng:campo-formulario Precio esPrincipal --tipo string --nombreAPresentarse "Es principal *"  --tipoControl select-many --opcionesSelect "Si,No" --required


# Tercero 
yo man-lab-yo-ng:clase Precio
# Cuarto
yo man-lab-yo-ng:componente Precio
