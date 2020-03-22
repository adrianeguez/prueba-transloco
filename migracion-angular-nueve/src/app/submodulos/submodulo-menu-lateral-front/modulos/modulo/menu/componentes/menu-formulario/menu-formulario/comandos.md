# Primero
yo man-lab-yo-ng:clase-formulario MenuLateral
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario MenuLateral nombre --tipo string --nombreAPresentarse "Nombre menú" --tooltip "Ingrese un nombre de menú" --ejemplo "Configuracion" --minLength 3 --required --tipoControl input-text --maxLength 30 --tipoCampoHtml text --patternMensaje "Solo se aceptan letras" --pattern SOLO_LETRAS_ESPACIOS_TILDES_ENIES

yo man-lab-yo-ng:campo-formulario MenuLateral routerLink --tipo string --nombreAPresentarse "Ruta angular" --tooltip "Ingrese una ruta angular" --ejemplo "['/app']" --minLength 2 --required --tipoControl input-text --maxLength 40 --tipoCampoHtml text 

yo man-lab-yo-ng:campo-formulario MenuLateral url --tipo string --nombreAPresentarse "Url" --tooltip "Ingrese una url" --ejemplo "https://google.com" --minLength 2 --required --tipoControl input-text --maxLength 200 --tipoCampoHtml text

yo man-lab-yo-ng:campo-formulario MenuLateral icono --tipo string --nombreAPresentarse "Icono" --tooltip "Ingrese icono" --ejemplo "fa fa-home" --minLength 3 --required --tipoControl input-text --maxLength 50 --tipoCampoHtml text

# Tercero

yo man-lab-yo-ng:clase MenuLateral

# Cuarto 

yo man-lab-yo-ng:componente MenuLateral
