# Primero
yo man-lab-yo-ng:clase-formulario UnidadMedida
# Segundo
yo man-lab-yo-ng:campo-formulario UnidadMedida nombre --tipo string --nombreAPresentarse "Nombre *" --tooltip "Ingrese el nombre de la unidad de medida" --ejemplo "Gramos" --minLength 3 --required input-text --maxLength 60

yo man-lab-yo-ng:campo-formulario UnidadMedida abreviacion --tipo string --nombreAPresentarse "Abreviación *" --tooltip "Ingrese la abreviación de la unidad de medida" --ejemplo "gr" --minLength 1 --required input-text --maxLength 10

# Tercero 
yo man-lab-yo-ng:clase UnidadMedida
# Cuarto
yo man-lab-yo-ng:componente UnidadMedida
