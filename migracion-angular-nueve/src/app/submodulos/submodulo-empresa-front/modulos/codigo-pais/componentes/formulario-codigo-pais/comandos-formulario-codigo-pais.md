# Primero
yo man-lab-yo-ng:clase-formulario CodigoPais
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario CodigoPais nombre --tipo string --nombreAPresentarse "Nombre del país" --tooltip "Ingrese el nombre del país" --ejemplo "Ecuador" --minLength 3 --required  input-text --maxLength 30   

yo man-lab-yo-ng:campo-formulario CodigoPais codigoIso3166 --tipo string --nombreAPresentarse "Código ISO 3166" --tooltip "Ingrese el código ISO 3166" --ejemplo "218" --minLength 3 --required  input-text --maxLength 3 

# Tercero

yo man-lab-yo-ng:clase CodigoPais

# Cuarto 

yo man-lab-yo-ng:componente CodigoPais
