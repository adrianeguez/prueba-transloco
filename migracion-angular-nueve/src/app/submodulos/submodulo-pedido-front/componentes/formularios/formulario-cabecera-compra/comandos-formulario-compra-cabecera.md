# Primero
```
$ yo man-lab-yo-ng:clase-formulario CabeceraCompra
```
# Segundo
```
$ yo man-lab-yo-ng:campo-formulario CabeceraCompra numeroFactura --tipo string --nombreAPresentarse "No. de factura" --tooltip "Ingrese el número de factura" --ejemplo "000001" --required

$ yo man-lab-yo-ng:campo-formulario CabeceraCompra numeroSerie --tipo string --nombreAPresentarse "No. de serie" --tooltip "Ingrese el número de serie" --ejemplo "0001" --required

$ yo man-lab-yo-ng:campo-formulario CabeceraCompra numeroAutorizacion --tipo string --nombreAPresentarse "No. de autorizacion " --tooltip "Ingrese el número de autorización" --ejemplo "1231231231231231" --required

$ yo man-lab-yo-ng:campo-formulario CabeceraCompra tipoFactura --tipo string --nombreAPresentarse "Tipo de factura" --tooltip "Ingrese el número de serie" --tipoControl select-many --opcionesSelect "Electrónica,Física" --required
```

# Tercero 
```
$ yo man-lab-yo-ng:clase CabeceraCompra
```

# Cuarto
```
$ yo man-lab-yo-ng:componente CabeceraCompra
```
