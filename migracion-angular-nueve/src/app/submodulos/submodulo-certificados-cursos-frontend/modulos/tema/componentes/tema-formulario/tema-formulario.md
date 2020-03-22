# Primero
yo man-lab-yo-ng:clase-formulario Tema
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario Tema nombre --tipo string --nombreAPresentarse "nombre" --tooltip "Ingrese el nombre del Tema" --ejemplo "Ej: Signs" --minLength 3 --required --tipoControl input-text --maxLength 60 --tipoCampoHtml text     
yo man-lab-yo-ng:campo-formulario Tema descripcion --tipo string --nombreAPresentarse "Descripción" --tooltip "Ingrese la descripción" --ejemplo "Road Signal" --minLength 3 --required --tipoControl input-text --maxLength 255 --tipoCampoHtml text

# Tercero

yo man-lab-yo-ng:clase Tema

# Cuarto 

yo man-lab-yo-ng:componente Tema --nombreModuloInternacionalizacion submoduloCertificadosCuros.tema.temaFormulario

