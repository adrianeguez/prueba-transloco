# Primero
yo man-lab-yo-ng:clase-formulario Pregunta
# Segundo
//campos del formulario

yo man-lab-yo-ng:campo-formulario Pregunta descripcion --tipo string --nombreAPresentarse "Descripcion"  --minLength 10  --maxLength 255   --required  --ejemplo "What are the state regulations?" --tipoControl input-text --tipoCampoHtml text  --tooltip "Ingrese la pregunta"   

yo man-lab-yo-ng:campo-formulario Pregunta valor --nombreAPresentarse "Valor" --ejemplo "1" --tipoControl input-text --tipoCampoHtml number --tooltip "Ingrese un valor"

yo man-lab-yo-ng:campo-formulario Pregunta tratarDeNuevo --tipo string --nombreAPresentarse "Tratar de nuevo" --tooltip "Seleccione si se puede volver a intentar" --tipoControl select-many --opcionesSelect "Yes,No" --required --tipoCampoHtml text


# Tercero

yo man-lab-yo-ng:clase Pregunta

# Cuarto 

yo man-lab-yo-ng:componente Pregunta --nombreModuloInternacionalizacion submoduloCertificadosCuros.pregunta.preguntaFormulario
