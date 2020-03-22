# Primero
yo man-lab-yo-ng:clase-formulario Edificio
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario Edificio nombre --tipo string --nombreAPresentarse "Nombre" --tooltip "Ingrese nombre de la empresa" --ejemplo "Manticore" --minLength 3 --required  input-text --maxLength 150   

yo man-lab-yo-ng:campo-formulario Edificio esMatriz --tipo string --nombreAPresentarse "Es matriz"  --tipoControl select-many --opcionesSelect "Si,No" --required

yo man-lab-yo-ng:campo-formulario Edificio telefono --tipo string --nombreAPresentarse "Teléfono" --tooltip "Ingrese el teléfono del edificio" --ejemplo "22677427" --minLength 7  input-text --maxLength 9   

yo man-lab-yo-ng:campo-formulario Edificio extension --tipo string --nombreAPresentarse "Extensión" --tooltip "Ingrese la extensión del edificio" --ejemplo "22677427" --minLength 2  input-text --maxLength 5   

yo man-lab-yo-ng:campo-formulario Edificio whatsapp --tipo string --nombreAPresentarse "Whatsapp" --tooltip "Ingrese el whatsapp del edificio" --ejemplo "593985810896" --minLength 12  input-text --maxLength 12  

yo man-lab-yo-ng:campo-formulario Edificio nombreResponsable --tipo string --nombreAPresentarse "Nombre Responsable" --tooltip "Ingrese el nombre del responsable del edificio" --ejemplo "Adrián Alvarado" --minLength 3  input-text --maxLength 70   

# Tercero

yo man-lab-yo-ng:clase Edificio

# Cuarto 

yo man-lab-yo-ng:componente Edificio
