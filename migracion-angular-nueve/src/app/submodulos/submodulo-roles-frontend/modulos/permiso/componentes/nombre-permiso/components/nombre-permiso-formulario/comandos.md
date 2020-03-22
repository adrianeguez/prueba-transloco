# Primero
yo man-lab-yo-ng:clase-formulario NombrePermiso
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario NombrePermiso nombre --tipo string --nombreAPresentarse "Nombre" --tooltip "Ingrese nombre del permiso" --ejemplo "Puede editar usuario" --minLength 4 --required --tipoControl input-text --maxLength 30   

yo man-lab-yo-ng:campo-formulario NombrePermiso nombreModulo --tipo string --nombreAPresentarse "Nombre módulo" --tooltip "Ingrese nombre del módulo" --ejemplo "Empresa" --minLength 3 --required --tipoControl input-text --maxLength 80 --tipoCampoHtml text
# Tercero

yo man-lab-yo-ng:clase NombrePermiso

# Cuarto 

yo man-lab-yo-ng:componente NombrePermiso
