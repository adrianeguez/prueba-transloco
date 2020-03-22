# Primero
yo man-lab-yo-ng:clase-formulario Opcion
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario Opcion descripcion --tipo string  --required --minLength 3  --tipoControl input-text --maxLength 90  --tipoCampoHtml text 
yo man-lab-yo-ng:campo-formulario Opcion esRespuesta --tipo number  --required --tipoControl select-many --tipoCampoHtml text --opcionesSelect "YES,NO"

# Tercero

yo man-lab-yo-ng:clase Opcion

# Cuarto 

yo man-lab-yo-ng:componente Opcion --nombreModuloInternacionalizacion "submoduloCertificadosCuros.opcionModulo.opcionFormulario"
