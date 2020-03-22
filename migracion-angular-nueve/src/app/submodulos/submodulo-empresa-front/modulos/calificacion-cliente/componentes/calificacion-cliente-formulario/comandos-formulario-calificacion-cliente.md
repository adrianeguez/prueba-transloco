# Primero
yo man-lab-yo-ng:clase-formulario CalificacionCliente
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario CalificacionCliente calificacion --tipo number --nombreAPresentarse "Calificación" --tooltip "Ingrese la calificación del cliente" --ejemplo "9" --required  input-number   

yo man-lab-yo-ng:campo-formulario CalificacionCliente observacion --tipo string --nombreAPresentarse "Observación" --tooltip "Ingrese la observación" --ejemplo "Buen servicio" --minLength 3  input-text --maxLength 100   

# Tercero

yo man-lab-yo-ng:clase CalificacionCliente

# Cuarto 

yo man-lab-yo-ng:componente CalificacionCliente
