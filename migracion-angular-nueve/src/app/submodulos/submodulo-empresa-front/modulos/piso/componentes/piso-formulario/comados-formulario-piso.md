# Primero
yo man-lab-yo-ng:clase-formulario Piso
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario Piso nombre --tipo string --nombreAPresentarse "Nombre" --tooltip "Ingrese nombre del piso" --ejemplo "Piso de bodegas" --minLength 1 --required  input-text --maxLength 60   

yo man-lab-yo-ng:campo-formulario Piso ordenPiso --tipo number --nombreAPresentarse "Orden"  -tooltip "Ingrese orden del piso" --ejemplo "1" --required input-number 

# Tercero

yo man-lab-yo-ng:clase Piso

# Cuarto 

yo man-lab-yo-ng:componente Piso
