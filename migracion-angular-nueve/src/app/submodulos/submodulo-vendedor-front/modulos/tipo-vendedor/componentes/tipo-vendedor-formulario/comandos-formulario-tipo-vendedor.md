# Primero
yo man-lab-yo-ng:clase-formulario TipoVendedor
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario TipoVendedor nombre --tipo string --nombreAPresentarse "Tipo vendedor *" --tooltip "Ingrese tipo de vendedor" --ejemplo "Telefónico" --minLength 3 --required  input-text --maxLength 60  
yo man-lab-yo-ng:campo-formulario TipoVendedor codigo --tipo string --nombreAPresentarse "Código *"  "Ingrese el codigó del tipo vendedor" --ejemplo "TE" --minLength 1  input-text --maxLength 10

# Tercero

yo man-lab-yo-ng:clase TipoVendedor

# Cuarto 

yo man-lab-yo-ng:componente TipoVendedor
