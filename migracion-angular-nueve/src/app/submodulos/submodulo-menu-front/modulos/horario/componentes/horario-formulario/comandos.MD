# Primero
yo man-lab-yo-ng:clase-formulario Horario
# Segundo
yo man-lab-yo-ng:campo-formulario Horario descripcion --tipo string --nombreAPresentarse "Descripcion" --tooltip "Ingrese la descripcion" --ejemplo "Todos los dias" --minLength 3 --required --tipoControl input-text --maxLength 255 --tipoCampoHtml text
yo man-lab-yo-ng:campo-formulario Horario tipo --tipo string --nombreAPresentarse "Horario" --tooltip "Seleccione un tipo de horario" --ejemplo "D" --required --tipoControl select-many --tipoCampoHtml text --opcionesSelect "D,F"
yo man-lab-yo-ng:campo-formulario Horario fechaInicia --tipo string --nombreAPresentarse "Fecha inicio" --tooltip "Escoga la fecha de inicio" --ejemplo "2020/02/02" --tipoControl input-text  --tipoCampoHtml date
yo man-lab-yo-ng:campo-formulario Horario fechaFinaliza --tipo string --nombreAPresentarse "Fecha fin" --tooltip "Escoga la fecha de fin" --ejemplo "2020/02/02" --tipoControl input-text  --tipoCampoHtml date
yo man-lab-yo-ng:campo-formulario Horario horaInicia --tipo string --nombreAPresentarse "Hora inicia" --tooltip "Escoga la hora de fin" --ejemplo "2020/02/02" --required --tipoControl input-text  --tipoCampoHtml time
yo man-lab-yo-ng:campo-formulario Horario horaFinaliza --tipo string --nombreAPresentarse "Hora fin" --tooltip "Escoga la hora de fin" --ejemplo "2020/02/02" --required --tipoControl input-text  --tipoCampoHtml time
yo man-lab-yo-ng:campo-formulario Horario lunes --tipo string --nombreAPresentarse "Lunes" --tipoControl input-text --tipoCampoHtml checkbox
yo man-lab-yo-ng:campo-formulario Horario martes --tipo string --nombreAPresentarse "Martes" --tipoControl input-text --tipoCampoHtml checkbox
yo man-lab-yo-ng:campo-formulario Horario miercoles --tipo string --nombreAPresentarse "Miercoles" --tipoControl input-text --tipoCampoHtml checkbox
yo man-lab-yo-ng:campo-formulario Horario jueves --tipo string --nombreAPresentarse "Jueves" --tipoControl input-text --tipoCampoHtml checkbox
yo man-lab-yo-ng:campo-formulario Horario viernes --tipo string --nombreAPresentarse "Viernes" --tipoControl input-text --tipoCampoHtml checkbox
yo man-lab-yo-ng:campo-formulario Horario sabado --tipo string --nombreAPresentarse "Sabado" --tipoControl input-text --tipoCampoHtml checkbox
yo man-lab-yo-ng:campo-formulario Horario domingo --tipo string --nombreAPresentarse "Domingo" --tipoControl input-text --tipoCampoHtml checkbox
# Tercero

yo man-lab-yo-ng:clase Horario

# Cuarto

yo man-lab-yo-ng:componente Horario --nombreModuloInternacionalizacion submoduloMenu.horario.horarioFormulario
