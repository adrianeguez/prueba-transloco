# Primero
yo man-lab-yo-ng:clase-formulario DatosVendedor
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario DatosVendedor nombreVendedor --tipo string --nombreAPresentarse "Nombre *" --tooltip "Ingrese nombre del vendedor" --ejemplo "Eduardo" --minLength 3   input-text --maxLength 60 --required 

yo man-lab-yo-ng:campo-formulario DatosVendedor apellidoVendedor --tipo string --nombreAPresentarse "Apellido *" --tooltip "Ingrese apellido del vendedor" --ejemplo "Castillo" --minLength 3   input-text --maxLength 60 --required 

yo man-lab-yo-ng:campo-formulario DatosVendedor documento --tipo string --nombreAPresentarse "Documento de identidad *" --tooltip "Ingrese el documento de identidad a editar" --ejemplo "17245931450" --minLength 10 --required  input-text --maxLength 10

yo man-lab-yo-ng:campo-formulario DatosVendedor fechaIngreso --tipo string --nombreAPresentarse "Fecha ingreso *" --tooltip "Ingrese la fecha de ingreso a la empresa del vendedor" --ejemplo "2018-03-03"  --required  --tipoControl input-text  --tipoCampoHtml Date

yo man-lab-yo-ng:campo-formulario DatosVendedor fechaSalida --tipo string --nombreAPresentarse "Fecha salida" --tooltip "Ingrese la fecha de salida de la empresa del vendedor" --ejemplo "2018-03-03"    --tipoControl input-text  --tipoCampoHtml Date


# Tercero

yo man-lab-yo-ng:clase  DatosVendedor

# Cuarto 

yo man-lab-yo-ng:componente DatosVendedor
