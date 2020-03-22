# Primero
yo man-lab-yo-ng:clase-formulario CalificacionProveedor
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario CalificacionProveedor calificacion --tipo number --nombreAPresentarse "Calificación" --tooltip "Ingrese la calificación del cliente" --ejemplo "9" --required  input-number   

yo man-lab-yo-ng:campo-formulario CalificacionProveedor observacion --tipo string --nombreAPresentarse "Observación" --tooltip "Ingrese la observación" --ejemplo "Buen servicio" --minLength 3  input-text --maxLength 100   

# Tercero

yo man-lab-yo-ng:clase CalificacionProveedor

# Cuarto 

yo man-lab-yo-ng:componente CalificacionProveedor
