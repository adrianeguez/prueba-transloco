# Primero
```
$ yo man-lab-yo-ng:clase-formulario CronoVendCabecera
```
# Segundo
```
$ yo man-lab-yo-ng:campo-formulario CronoVendCabecera nombreCronograma --tipo string --nombreAPresentarse "Nombre*" --tooltip "Ingrese nombre" --ejemplo "Ventas norte quito enero" --required
$ yo man-lab-yo-ng:campo-formulario CronoVendCabecera descripcion --tipo string --nombreAPresentarse "Descripción*" --tooltip "Ingrese descripción" --ejemplo "Cronograma de venta para la zona."
$ yo man-lab-yo-ng:campo-formulario CronoVendCabecera ruta --tipo "RutaInterface | number | string | any" --tipoControl autocomplete --autocompleteBusqueda "Ruta,id" --nombreAPresentarse "Ruta*" --tooltip "Ruta donde va a servir el cronograma" --ejemplo "Norte Quito" --required
```

# Tercero 
```
$ yo man-lab-yo-ng:clase CronoVendCabecera
```

# Cuarto
```
$ yo man-lab-yo-ng:componente CronoVendCabecera
```
