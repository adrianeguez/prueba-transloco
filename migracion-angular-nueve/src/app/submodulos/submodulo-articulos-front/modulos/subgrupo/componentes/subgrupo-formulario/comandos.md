# Primero
yo man-lab-yo-ng:clase-formulario Subgrupo
# Segundo
yo man-lab-yo-ng:campo-formulario Subgrupo nombre --tipo string --nombreAPresentarse "Nombre*" --tooltip "Ingrese el nombre del subgrupo" --ejemplo "Res" --minLength 3 --required input-text --maxLength 60

yo man-lab-yo-ng:campo-formulario Subgrupo descripcion --tipo string --nombreAPresentarse "Descripción" --tooltip "Ingrese la descripción del subgrupo" --minLength 3 input-text --maxLength 100

yo man-lab-yo-ng:campo-formulario Subgrupo empresaProductora --tipo string --nombreAPresentarse " Empresa productora" --tooltip "Ingrese la empresa productora" --ejemplo "BOSCH" --minLength 3 input-text --maxLength 60

yo man-lab-yo-ng:campo-formulario Subgrupo codigo --tipo string --nombreAPresentarse "Código*" --tooltip "Ingrese el código del subgrupo" --ejemplo "1" --minLength 1 --required input-text --maxLength 30

# Tercero 
yo man-lab-yo-ng:clase Subgrupo
# Cuarto
yo man-lab-yo-ng:componente Subgrupo
