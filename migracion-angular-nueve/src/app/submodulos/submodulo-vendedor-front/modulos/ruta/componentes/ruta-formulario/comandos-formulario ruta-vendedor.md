# Primero
yo man-lab-yo-ng:clase-formulario RutaVendedor
# Segundo
//campos del formulario

yo man-lab-yo-ng:campo-formulario RutaVendedor lugar --tipo string --nombreAPresentarse "Lugar *" --tipoControl autocomplete --autocompleteBusqueda "Lugar,nombre" --required

yo man-lab-yo-ng:campo-formulario RutaVendedor nombre --tipo string --nombreAPresentarse "Zona *" --tooltip "Ingrese nombre de la zona" --ejemplo "" --minLength 3   input-text --maxLength 60 --required 

yo man-lab-yo-ng:campo-formulario RutaVendedor bodega --tipo string --nombreAPresentarse "Bodega *" --tipoControl autocomplete --autocompleteBusqueda "Bodega,nombre" --required


# Tercero

yo man-lab-yo-ng:clase RutaVendedor

# Cuarto 

yo man-lab-yo-ng:componente RutaVendedor
