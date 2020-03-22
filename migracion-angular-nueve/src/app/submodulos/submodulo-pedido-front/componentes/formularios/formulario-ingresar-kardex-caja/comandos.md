# Primero
```
$ yo man-lab-yo-ng:clase-formulario IngresarKardexCaja
```
# Segundo
```
$ yo man-lab-yo-ng:campo-formulario IngresarKardexCaja valor --tipo string --nombreAPresentarse "Valor*" --tooltip "Ingrese el $ valor" --ejemplo "$15.00" --mascaraCurrency --required
$ yo man-lab-yo-ng:campo-formulario IngresarKardexCaja operacionSuma --tipo string --nombreAPresentarse "Tipo operación*" --tooltip "Suma o Resta a la caja" --tipoControl select-many --opcionesSelect "Suma,Resta" --required
$ yo man-lab-yo-ng:campo-formulario IngresarKardexCaja razon --tipo string --nombreAPresentarse "Razon" --tooltip "Ingrese razón" --ejemplo "Falta efectivo..."
```

# Tercero 
```
$ yo man-lab-yo-ng:clase IngresarKardexCaja
```

# Cuarto
```
$ yo man-lab-yo-ng:componente IngresarKardexCaja
```
