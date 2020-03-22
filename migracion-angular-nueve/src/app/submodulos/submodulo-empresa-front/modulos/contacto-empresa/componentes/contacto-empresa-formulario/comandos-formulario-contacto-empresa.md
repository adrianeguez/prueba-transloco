# Primero
yo man-lab-yo-ng:clase-formulario ContactoEmpresa
# Segundo
//campos del formulario

yo man-lab-yo-ng:campo-formulario ContactoEmpresa datosUsuario --tipo string --nombreAPresentarse "Contacto" --tipoControl autocomplete --autocompleteBusqueda "DatosUsuario,identificacionPais" --required

yo man-lab-yo-ng:campo-formulario ContactoEmpresa nombres --tipo string --nombreAPresentarse "Nombres" --ejemplo "Andrés David" --minLength 4  input-text --maxLength 50   --required

yo man-lab-yo-ng:campo-formulario ContactoEmpresa apellidos --tipo string --nombreAPresentarse "Apellidos" --ejemplo "Olmedo López" --minLength 4  input-text --maxLength 50   --required

yo man-lab-yo-ng:campo-formulario ContactoEmpresa tipoCargo --tipo string --nombreAPresentarse "Tipo de cargo" --tipoControl autocomplete --autocompleteBusqueda "TipoCargo,nombre" --required

yo man-lab-yo-ng:campo-formulario ContactoEmpresa observacion --tipo string --nombreAPresentarse "Observación" --tooltip "Ingrese una observación del contacto" --ejemplo "tiempo completo" --minLength 4  input-text --maxLength 100

yo man-lab-yo-ng:campo-formulario ContactoEmpresa esOperario --tipo string --nombreAPresentarse "Es operario"  --tipoControl select-many --opcionesSelect "Si,No" --required

yo man-lab-yo-ng:campo-formulario ContactoEmpresa esAdminPtoEmi --tipo string --nombreAPresentarse "Es admnistrador"  --tipoControl select-many --opcionesSelect "Si,No" --required
# Tercero

yo man-lab-yo-ng:clase ContactoEmpresa

# Cuarto 

yo man-lab-yo-ng:componente ContactoEmpresa
