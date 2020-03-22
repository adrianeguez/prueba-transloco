# Primero
yo man-lab-yo-ng:clase-formulario PeriodoVenta
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario PeriodoVenta nombre --tipo string --nombreAPresentarse "Periodo *" --tooltip "Ingrese nombre del periodo de venta" --ejemplo "octubre 2019"  --minLength 3   input-text --maxLength 60 --required 

yo man-lab-yo-ng:campo-formulario PeriodoVenta fechaInicio --tipo string --nombreAPresentarse "Fecha inicio *" --tooltip "Ingrese la fecha de inicio del periodo" --ejemplo "2018-03-03"  --required  --tipoControl input-text  --tipoCampoHtml Date

yo man-lab-yo-ng:campo-formulario PeriodoVenta fechaFin --tipo string --nombreAPresentarse "Fecha fin *" --tooltip "Ingrese la fecha fin del periodo de venta" --ejemplo "2018-03-03"  --tipoControl input-text  --tipoCampoHtml Date

yo man-lab-yo-ng:campo-formulario PeriodoVenta meta --tipo string --nombreAPresentarse "Meta *" --tooltip "Ingrese meta del periodo de venta" --ejemplo "1500" input-text --required 

yo man-lab-yo-ng:campo-formulario PeriodoVenta descripcion --tipo string --nombreAPresentarse "Descripción" --tooltip "Ingrese la descripción del periodo de venta" --ejemplo "" --minLength 7 input-text --maxLength 60  


# Tercero

yo man-lab-yo-ng:clase  PeriodoVenta

# Cuarto 

yo man-lab-yo-ng:componente PeriodoVenta
