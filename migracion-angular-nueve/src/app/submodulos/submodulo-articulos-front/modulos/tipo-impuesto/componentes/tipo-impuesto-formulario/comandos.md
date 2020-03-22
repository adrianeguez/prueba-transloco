# Primero
yo man-lab-yo-ng:clase-formulario TipoImpuesto
# Segundo
yo man-lab-yo-ng:campo-formulario TipoImpuesto nombre --tipo string --nombreAPresentarse "Nombre *" --tooltip "Ingrese el nombre del tipo de impuesto" --ejemplo "Impuesto a los Consumos Especiales" --minLength 3 --required input-text --maxLength 60

yo man-lab-yo-ng:campo-formulario TipoImpuesto siglas --tipo string --nombreAPresentarse "Siglas *" --tooltip "Ingrese las siglas del tipo impuesto" --required --minLength 1 input-text --maxLength 10

yo man-lab-yo-ng:campo-formulario TipoImpuesto descripcion --tipo string --nombreAPresentarse "Descripción" --tooltip "Ingrese la descripción del tipo impuesto" --minLength 3 input-text --maxLength 100

yo man-lab-yo-ng:campo-formulario TipoImpuesto codigoSri --tipo string --nombreAPresentarse "Código SRI *" --tooltip "Ingrese el código SRI del tipo de impuesto" --ejemplo "C001" --minLength 1 --required input-text --maxLength 10

yo man-lab-yo-ng:campo-formulario TipoImpuesto codigo --tipo string --nombreAPresentarse "Código" --tooltip "Ingrese el código del tipo de impuesto" --ejemplo "DE001" --minLength 1 input-text --maxLength 10

# Tercero 
yo man-lab-yo-ng:clase TipoImpuesto
# Cuarto
yo man-lab-yo-ng:componente TipoImpuesto
