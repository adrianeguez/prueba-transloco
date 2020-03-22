# Primero
yo man-lab-yo-ng:clase-formulario Rol
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario Rol nombre --tipo string --nombreAPresentarse "Nombre" --tooltip "Ingrese nombre del rol" --ejemplo "Admin" --minLength 4 --required --tipoControl input-text --maxLength 30   

yo man-lab-yo-ng:campo-formulario Rol estado --tipo string --nombreAPresentarse "Estado" --tooltip "Activo" --ejemplo "Activo" --required --tipoControl select-many 
# Tercero

yo man-lab-yo-ng:clase Rol

# Cuarto 

yo man-lab-yo-ng:componente Rol
