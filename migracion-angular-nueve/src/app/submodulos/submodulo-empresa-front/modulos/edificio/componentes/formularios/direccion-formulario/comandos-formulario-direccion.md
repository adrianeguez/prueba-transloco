# Primero
yo man-lab-yo-ng:clase-formulario Direccion
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario Direccion numeroCalle --tipo string --nombreAPresentarse "N° calle" --tooltip "Ingrese el número de la calle" --ejemplo "N12-96" --minLength 1  input-text --maxLength 10   

yo man-lab-yo-ng:campo-formulario Direccion callePrincipal --tipo string --nombreAPresentarse "Calle principal" --tooltip "Ingrese la calle principal" --ejemplo "Av. 6 de Diciembre " --minLength 1 --required  input-text --maxLength 100   

yo man-lab-yo-ng:campo-formulario Direccion calleSecundaria --tipo string --nombreAPresentarse "Calle secundaria" --tooltip "Ingrese la calle secundaria" --ejemplo "Av. 6 de Diciembre " --minLength 1  input-text --maxLength 100   

yo man-lab-yo-ng:campo-formulario Direccion nombreEdificio --tipo string --nombreAPresentarse "Nombre edificio" --tooltip "Ingrese el nombre del edificio" --ejemplo "Edificio Quito " --minLength 1  input-text --maxLength 50   

yo man-lab-yo-ng:campo-formulario Direccion piso --tipo string --nombreAPresentarse "Piso" --tooltip "Ingrese el piso" --ejemplo "1" --minLength 1  input-text --maxLength 3   

yo man-lab-yo-ng:campo-formulario Direccion lugar --tipo string --nombreAPresentarse "Lugar" --tipoControl autocomplete --autocompleteBusqueda "Lugar,nombre" --required

yo man-lab-yo-ng:campo-formulario Direccion referencia --tipo string --nombreAPresentarse "Referencia" --tooltip "Ingrese la referencia" --ejemplo "Al frente de un parque" --minLength 3  input-text --maxLength 60



# Tercero

yo man-lab-yo-ng:clase Direccion

# Cuarto 

yo man-lab-yo-ng:componente Direccion
