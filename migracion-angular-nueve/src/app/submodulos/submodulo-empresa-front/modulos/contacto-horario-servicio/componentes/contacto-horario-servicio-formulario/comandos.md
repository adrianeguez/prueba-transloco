# Primero
yo man-lab-yo-ng:clase-formulario ContactoHorarioServicio
# Segundo
//campos del formulario

yo man-lab-yo-ng:campo-formulario ContactoHorarioServicio datosUsuario --tipo "ContactoEmpresaInterface | number | string | any" --tipoControl autocomplete --autocompleteBusqueda "DatosUsuario,identificacionPais" --nombreAPresentarse "Datos usuario" --tooltip "Select the user" --ejemplo "0987535795"--required

yo man-lab-yo-ng:campo-formulario ContactoHorarioServicio nombres --tipo string --nombreAPresentarse "Nombres" --ejemplo "Andrés David" --minLength 4  input-text --maxLength 50   --required

yo man-lab-yo-ng:campo-formulario ContactoHorarioServicio apellidos --tipo string --nombreAPresentarse "Apellidos" --ejemplo "Olmedo López" --minLength 4  input-text --maxLength 50   --required

yo man-lab-yo-ng:campo-formulario ContactoHorarioServicio tipoCargo --tipo "TipoCargoInterface | string | number | any" --nombreAPresentarse "Tipo de cargo" --tipoControl autocomplete --autocompleteBusqueda "TipoCargo,nombre" --required

# Tercero

yo man-lab-yo-ng:clase ContactoHorarioServicio

# Cuarto 

yo man-lab-yo-ng:componente ContactoHorarioServicio --nombreModuloInternacionalizacion submoduloCertificadosCuros.diapositiva.diapositivaFormulario

