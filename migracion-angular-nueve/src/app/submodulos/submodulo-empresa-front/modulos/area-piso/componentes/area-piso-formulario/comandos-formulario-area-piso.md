# Primero
yo man-lab-yo-ng:clase-formulario AreaPiso
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario AreaPiso nombre --tipo string --nombreAPresentarse "Nombre" --tooltip "Ingrese nombre del área" --ejemplo "Área de ventas" --minLength 1 --required  input-text --maxLength 30   
yo man-lab-yo-ng:campo-formulario AreaPiso descripcion --tipo string --nombreAPresentarse "Descripción"  "Ingrese descripción del area" --ejemplo "Área de ventas matriz" --minLength 3  input-text --maxLength 100   
yo man-lab-yo-ng:campo-formulario AreaPiso nivel --tipo number --nombreAPresentarse "Nivel" --tooltip "" --ejemplo "1"  input-number

# Tercero

yo man-lab-yo-ng:clase AreaPiso

# Cuarto 

yo man-lab-yo-ng:componente AreaPiso
