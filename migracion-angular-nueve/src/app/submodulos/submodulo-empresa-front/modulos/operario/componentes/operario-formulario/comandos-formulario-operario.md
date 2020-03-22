# Primero
yo man-lab-yo-ng:clase-formulario Operario
# Segundo
//campos del formulario

yo man-lab-yo-ng:campo-formulario Operario contactoEmpresa --tipo string --nombreAPresentarse "Contacto" --tipoControl autocomplete --autocompleteBusqueda "ContactoEmpresa,datosUsuario.identificacionPais" --required

yo man-lab-yo-ng:campo-formulario Operario nombres --tipo string --nombreAPresentarse "Nombres" --ejemplo "Andrés David" --minLength 4  input-text --maxLength 50   --required

yo man-lab-yo-ng:campo-formulario Operario apellidos --tipo string --nombreAPresentarse "Apellidos" --ejemplo "Olmedo López" --minLength 4  input-text --maxLength 50   --required

# Tercero

yo man-lab-yo-ng:clase Operario

# Cuarto 

yo man-lab-yo-ng:componente Operario
