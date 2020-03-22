# Primero
yo man-lab-yo-ng:clase-formulario PuntoEmision
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario PuntoEmision nombre --tipo string --nombreAPresentarse "Nombre" --tooltip "Ingrese nombre del punto de emisión" --ejemplo " punto de emisión 1 Manticore" --minLength 1 --required  input-text --maxLength 60   

yo man-lab-yo-ng:campo-formulario PuntoEmision codigo --tipo string --nombreAPresentarse "Código" --tooltip "Ingrese codigo del  punto de emisión" --ejemplo "PE0001" --minLength 1 --required  input-text --maxLength 30   

yo man-lab-yo-ng:campo-formulario PuntoEmision secuencialActual --tipo string --nombreAPresentarse "Secuencial actual" --tooltip "Ingrese secuencial actual del  punto de emisión" --ejemplo "123456789" --minLength 1 --required  input-text --maxLength 30  

yo man-lab-yo-ng:campo-formulario PuntoEmision enUso --tipo string --nombreAPresentarse "En uso"  --tipoControl select-many --opcionesSelect "Si,No" --required

yo man-lab-yo-ng:campo-formulario PuntoEmision bodega --tipo string --nombreAPresentarse "Bodega" --tipoControl autocomplete --autocompleteBusqueda "Bodega,nombre" --required


# Tercero

yo man-lab-yo-ng:clase PuntoEmision

# Cuarto 

yo man-lab-yo-ng:componente PuntoEmision
