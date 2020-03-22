# Primero
yo man-lab-yo-ng:clase-formulario Grupo
# Segundo
yo man-lab-yo-ng:campo-formulario Grupo nombre --tipo string --nombreAPresentarse "Nombre *" --tooltip "Ingrese el nombre del grupo" --ejemplo "Res" --minLength 3 --required input-text --maxLength 60

yo man-lab-yo-ng:campo-formulario Grupo descripcion --tipo string --nombreAPresentarse "Descripción" --tooltip "Ingrese el descripción del grupo" --minLength 3  input-text --maxLength 100

yo man-lab-yo-ng:campo-formulario Grupo empresaProductora --tipo string --nombreAPresentarse " Empresa productora" --tooltip "Ingrese la empresa productora" --ejemplo "BOSCH" --minLength 3 input-text --maxLength 60  

yo man-lab-yo-ng:campo-formulario Grupo codigo --tipo string --nombreAPresentarse "Código *" --tooltip "Ingrese el código del grupo" --required --ejemplo "C01" --minLength 1 input-text --maxLength 30 

# Tercero 
yo man-lab-yo-ng:clase Grupo
# Cuarto
yo man-lab-yo-ng:componente Grupo
