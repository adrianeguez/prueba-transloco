# Primero
yo man-lab-yo-ng:clase-formulario Bodega
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario Bodega nombre --tipo string --nombreAPresentarse "Nombre" --tooltip "Ingrese nombre de la bodega" --ejemplo "Bodega 1 Manticore" --minLength 3 --required  input-text --maxLength 60   

yo man-lab-yo-ng:campo-formulario Bodega codigo --tipo string --nombreAPresentarse "Código" --tooltip "Ingrese codigo de la bodega" --ejemplo "BOD0001" --minLength 1 --required  input-text --maxLength 30   

yo man-lab-yo-ng:campo-formulario Bodega direccion --tipo string --nombreAPresentarse "Dirección" --tooltip "Ingrese la dirección de la bodega" --ejemplo "Av. Amazonas N37-61" --minLength 3 --required  input-text --maxLength 100

yo man-lab-yo-ng:campo-formulario Bodega esPercha --tipo string --nombreAPresentarse "Es percha"  --tipoControl select-many --opcionesSelect "Si,No" --required

yo man-lab-yo-ng:campo-formulario Bodega contactoEmpresa --tipo string --nombreAPresentarse "Administrador" --tipoControl autocomplete --autocompleteBusqueda "ContactoEmpresa,datosUsuario.identificacionPais" --required

yo man-lab-yo-ng:campo-formulario Bodega nombres --tipo string --nombreAPresentarse "Nombres" --ejemplo "Andrés David" --minLength 4  input-text --maxLength 50   --required

yo man-lab-yo-ng:campo-formulario Bodega apellidos --tipo string --nombreAPresentarse "Apellidos" --ejemplo "Olmedo López" --minLength 4  input-text --maxLength 50   --required

# Tercero

yo man-lab-yo-ng:clase Bodega

# Cuarto 

yo man-lab-yo-ng:componente Bodega
