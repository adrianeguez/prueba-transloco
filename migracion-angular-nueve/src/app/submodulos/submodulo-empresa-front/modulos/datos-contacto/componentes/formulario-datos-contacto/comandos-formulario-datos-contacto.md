# Primero
yo man-lab-yo-ng:clase-formulario DatosContacto

# Segundo
yo man-lab-yo-ng:campo-formulario DatosContacto telefono --tipo string --nombreAPresentarse "Teléfono" --tooltip "Ingrese el teléfono del contacto" --ejemplo "025989652" --minLength 9  input-text --maxLength 9

yo man-lab-yo-ng:campo-formulario DatosContacto celular --tipo string --nombreAPresentarse "Celular" --tooltip "Ingrese el celular del contacto" --ejemplo "0995887410" --minLength 10 --required  input-text --maxLength 10 

 yo man-lab-yo-ng:campo-formulario DatosContacto email --tipo string --nombreAPresentarse "Email" --tooltip "Ingrese el email del contacto" --ejemplo "juan.perez@manticore-labs.com" --minLength 1  input-text --maxLength 50 

yo man-lab-yo-ng:campo-formulario DatosContacto fax --tipo string --nombreAPresentarse "Fax" --tooltip "Ingrese el fax del contacto" --ejemplo "09952200101" --minLength 5  input-text --maxLength 20  

yo man-lab-yo-ng:campo-formulario DatosContacto esPrincipal --tipo string --nombreAPresentarse "Es principal"  --tipoControl select-many --opcionesSelect "Sí,No" --required

# Tercero
yo man-lab-yo-ng:clase DatosContacto

# Cuarto 
yo man-lab-yo-ng:componente DatosContacto


