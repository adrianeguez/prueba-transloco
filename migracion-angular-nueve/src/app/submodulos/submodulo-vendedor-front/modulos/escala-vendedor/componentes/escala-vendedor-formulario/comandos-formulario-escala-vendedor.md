# Primero
yo man-lab-yo-ng:clase-formulario EscalaVendedor
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario EscalaVendedor nombre --tipo string --nombreAPresentarse "Nombre *" --tooltip "Ingrese el nombre de la escala vendedor" --ejemplo "Escala 1" --minLength 3   input-text --maxLength 60 --required

yo man-lab-yo-ng:campo-formulario EscalaVendedor minimo --tipo string --nombreAPresentarse "Mínimo *" --tooltip "Ingrese el mínimo valor de la escala" --ejemplo "10" --required input-text 

yo man-lab-yo-ng:campo-formulario EscalaVendedor maximo --tipo string --nombreAPresentarse "Máximo *" --tooltip "Ingrese el máximo valor de la escala vendedor" --ejemplo "100" --required --tipoControl input-text 

yo man-lab-yo-ng:campo-formulario EscalaVendedor porcentajeIndividual --tipo string --nombreAPresentarse "Porcentaje individual *" --tooltip "Ingrese el porcentaje individual de la escala vendedor" --ejemplo "5" --required input-text 

yo man-lab-yo-ng:campo-formulario EscalaVendedor porcentajeMultiple --tipo string --nombreAPresentarse "Porcentaje múltiple " --tooltip "Ingrese el porcentaje múltiple de la escala vendedor" --ejemplo "10" input-text 
# Tercero

yo man-lab-yo-ng:clase EscalaVendedor

# Cuarto 

yo man-lab-yo-ng:componente EscalaVendedor
