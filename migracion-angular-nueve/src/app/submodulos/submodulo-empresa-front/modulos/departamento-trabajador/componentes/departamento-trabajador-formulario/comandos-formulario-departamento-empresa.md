# Primero
yo man-lab-yo-ng:clase-formulario DepartamentoTrabajador
# Segundo
//campos del formulario

yo man-lab-yo-ng:campo-formulario DepartamentoTrabajador contactoEmpresa --tipo string --nombreAPresentarse "Contacto" --tipoControl autocomplete --autocompleteBusqueda "ContactoEmpresa,datosUsuario.identificacionPais" --required

yo man-lab-yo-ng:campo-formulario DepartamentoTrabajador nombres --tipo string --nombreAPresentarse "Nombres" --ejemplo "Andrés David" --minLength 4  input-text --maxLength 50   --required

yo man-lab-yo-ng:campo-formulario DepartamentoTrabajador apellidos --tipo string --nombreAPresentarse "Apellidos" --ejemplo "Olmedo López" --minLength 4  input-text --maxLength 50   --required

yo man-lab-yo-ng:campo-formulario DepartamentoTrabajador tipoCargo --tipo string --nombreAPresentarse "Tipo de cargo" --tipoControl autocomplete --autocompleteBusqueda "TipoCargo,nombre" --required

yo man-lab-yo-ng:campo-formulario DepartamentoTrabajador descripcion --tipo string --nombreAPresentarse "Descripción" --tooltip "Ingrese una descripción del trabajador" --ejemplo "trabajador a medio tiempo" --minLength 3  input-text --maxLength 100   

# Tercero

yo man-lab-yo-ng:clase DepartamentoTrabajador

# Cuarto 

yo man-lab-yo-ng:componente DepartamentoTrabajador
