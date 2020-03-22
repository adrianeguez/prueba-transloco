# Primero
yo man-lab-yo-ng:clase-formulario Diapositiva
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario Diapositiva titulo --tipo string --nombreAPresentarse "Title" --tooltip "Ingrese el titulo de la Diapositiva" --ejemplo "Ej: Signs" --minLength 3 --required --tipoControl input-text --maxLength 80 --tipoCampoHtml text     

yo man-lab-yo-ng:campo-formulario Diapositiva notas --tipo string --nombreAPresentarse "Notes" --tooltip "Ingrese notas para la diapositiva" --ejemplo "Don't forget to take the final exam" --minLength 3 --tipoControl input-text --maxLength 350 --tipoCampoHtml text

yo man-lab-yo-ng:campo-formulario Diapositiva segundoEmpieza --tipo string --nombreAPresentarse "Starts at" --tooltip "At what second starts" --ejemplo "00:00:03" --tipoControl input-text --tipoCampoHtml time 
yo man-lab-yo-ng:campo-formulario Diapositiva duracion --tipo string --nombreAPresentarse "Duration" --tooltip "Duration" --ejemplo "00:01:03" --tipoControl input-text --tipoCampoHtml time

yo man-lab-yo-ng:campo-formulario Diapositiva duracion --tipo string --nombreAPresentarse "Duration time" --tooltip "Slides's duration time" --ejemplo "00:02:03" --tipoControl input-text --tipoCampoHtml time 
yo man-lab-yo-ng:campo-formulario Diapositiva duracion --tipo string --nombreAPresentarse "Duration" --tooltip "Duration" --ejemplo "00:01:03" --tipoControl input-text --tipoCampoHtml time 

yo man-lab-yo-ng:campo-formulario Diapositiva siguienteDiapositiva --tipo "DiapositivaInterface | number | string | any" --tipoControl autocomplete --autocompleteBusqueda "DiapositivaInterface,titulo" --nombreAPresentarse "Next slide" --tooltip "Select the slide that starts after" --ejemplo "Why are you here?"

yo man-lab-yo-ng:campo-formulario Diapositiva anteriorDiapositiva --tipo "DiapositivaInterface | number | string | any" --tipoControl autocomplete --autocompleteBusqueda "DiapositivaInterface,titulo" --nombreAPresentarse "Previous slide" --tooltip "Select the slide that starts before" --ejemplo "Why are you here?"

# Tercero

yo man-lab-yo-ng:clase Diapositiva

# Cuarto 

yo man-lab-yo-ng:componente Diapositiva --nombreModuloInternacionalizacion submoduloCertificadosCuros.diapositiva.diapositivaFormulario

