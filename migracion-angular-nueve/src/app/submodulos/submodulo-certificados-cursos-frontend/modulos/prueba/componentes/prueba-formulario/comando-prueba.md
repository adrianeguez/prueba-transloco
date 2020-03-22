# Primero
yo man-lab-yo-ng:clase-formulario Prueba
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario Prueba nombre --tipo string  --required --minLength 3  --tipoControl input-text --maxLength 60  --tipoCampoHtml text 
yo man-lab-yo-ng:campo-formulario Prueba tipo --tipo string  --required --tipoControl select-many --tipoCampoHtml text --opcionesSelect "test,pretest"
yo man-lab-yo-ng:campo-formulario Prueba tiempoMaximo --tipo string  --required --tipoControl input-text --tipoCampoHtml time 
yo man-lab-yo-ng:campo-formulario Prueba numeroIntentos --tipo number --required --tipoControl input-text --tipoCampoHtml text 

# Tercero

yo man-lab-yo-ng:clase Prueba

# Cuarto 

yo man-lab-yo-ng:componente Prueba --nombreModuloInternacionalizacion "submoduloCertificadosCuros.pruebaModulo.pruebaFormulario"
