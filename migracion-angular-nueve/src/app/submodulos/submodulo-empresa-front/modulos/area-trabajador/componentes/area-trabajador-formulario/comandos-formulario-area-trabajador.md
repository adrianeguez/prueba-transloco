# Primero
yo man-lab-yo-ng:clase-formulario AreaTrabajador
# Segundo
//campos del formulario

yo man-lab-yo-ng:campo-formulario AreaTrabajador contactoEmpresa --tipo string --nombreAPresentarse "Usuario" --tipoControl autocomplete --autocompleteBusqueda "ContactoEmpresa,datosUsuario.identificacionPais" --required

yo man-lab-yo-ng:campo-formulario AreaTrabajador nombres --tipo string --nombreAPresentarse "Nombres" --ejemplo "Andrés David" --minLength 4  input-text --maxLength 50   --required

yo man-lab-yo-ng:campo-formulario AreaTrabajador apellidos --tipo string --nombreAPresentarse "Apellidos" --ejemplo "Olmedo López" --minLength 4  input-text --maxLength 50   --required

yo man-lab-yo-ng:campo-formulario AreaTrabajador descripcionUbicacion --tipo string --nombreAPresentarse "Ubicación" --tooltip "Ingrese la ubicación del trabajador" --ejemplo "oficina 23" --minLength 3  input-text --maxLength 100   --required

# Tercero

yo man-lab-yo-ng:clase AreaTrabajador

# Cuarto 

yo man-lab-yo-ng:componente AreaTrabajador
