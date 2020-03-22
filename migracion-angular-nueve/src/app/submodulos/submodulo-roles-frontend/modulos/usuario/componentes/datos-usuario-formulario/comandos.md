# Primero
yo man-lab-yo-ng:clase-formulario DatosUsuario
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario DatosUsuario nombres --tipo string --nombreAPresentarse "Nombres" --tooltip "Ingrese nombres" --ejemplo "Luis Alberto" --minLength 3 --required --tipoControl input-text --maxLength 70 --pattern SOLO_LETRAS_ESPACIOS_TILDES_ENIES --patternMensaje  "Solo se aceptan letras."

yo man-lab-yo-ng:campo-formulario DatosUsuario apellidos --tipo string --nombreAPresentarse "Apellidos" --tooltip "Ingrese apellidos" --ejemplo "Almeida Salinas" --minLength 3 --required --tipoControl input-text --maxLength 70 --pattern SOLO_LETRAS_ESPACIOS_TILDES_ENIES --patternMensaje  "Solo se aceptan letras."

yo man-lab-yo-ng:campo-formulario DatosUsuario identificacionPais --tipo string --nombreAPresentarse "Cédula" --tooltip "Ingrese una cédula" --ejemplo "171717171-8" --required --tipoControl input-text --mascara CEDULA_MASCARA --mascaraFuncion quitarMaskCedula

yo man-lab-yo-ng:campo-formulario DatosUsuario email --tipo string --nombreAPresentarse "Correo" --tooltip "Ingrese correo electrónico" --ejemplo "correo@correo.com"   --required --tipoControl input-text    --tipoCampoHtml "email"

yo man-lab-yo-ng:campo-formulario DatosUsuario direccion --tipo string --nombreAPresentarse "Dirección" --tooltip "Ingrese dirección" --ejemplo "Av Amazonas" --minLength 5 --tipoControl input-text --maxLength 50 --tipoCampoHtml text

yo man-lab-yo-ng:campo-formulario DatosUsuario celular --tipo string --nombreAPresentarse "Celular" --tooltip "Ingrese celular" --ejemplo "(+593) 9872 2414"  --required --tipoControl input-text --tipoCampoHtml text

# Tercero

yo man-lab-yo-ng:clase DatosUsuario

# Cuarto 

yo man-lab-yo-ng:componente DatosUsuario
