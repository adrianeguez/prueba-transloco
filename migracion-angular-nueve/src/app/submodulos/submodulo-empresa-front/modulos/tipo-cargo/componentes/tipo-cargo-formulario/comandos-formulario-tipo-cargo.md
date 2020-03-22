# Primero
yo man-lab-yo-ng:clase-formulario TipoCargo
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario TipoCargo nombre --tipo string --nombreAPresentarse "Nombre" --tooltip "Ingrese nombre del tipo de cargo" --ejemplo "Gerente" --minLength 3 --required  input-text --maxLength 30   

yo man-lab-yo-ng:campo-formulario TipoCargo codigo --tipo string --nombreAPresentarse "Código" --tooltip "Ingrese codigo del tipo de cargo" --ejemplo "TC0001" --minLength 1 --required  input-text --maxLength 10   


# Tercero

yo man-lab-yo-ng:clase TipoCargo

# Cuarto 

yo man-lab-yo-ng:componente TipoCargo
