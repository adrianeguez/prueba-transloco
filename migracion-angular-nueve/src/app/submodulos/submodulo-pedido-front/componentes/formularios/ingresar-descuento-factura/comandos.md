# Primero:
Crear el formulario
```
$ yo man-lab-yo-ng:clase-formulario IngresarDescuentoFactura
```

# Segundo:
Generación de los campos del formulario
```
$ yo man-lab-yo-ng:campo-formulario IngresarDescuentoFactura motivo --tipo string --nombreAPresentarse "Motivo del descuento" --tooltip "Ingrese el motivo para el descuento" --ejemplo "Descuento debido a ..."
$ yo man-lab-yo-ng:campo-formulario IngresarDescuentoFactura descuentoPorcentual --tipo string --nombreAPresentarse "% Descuento" --tooltip "Ingrese el valor porcentual del descuento" --ejemplo "12%"
$ yo man-lab-yo-ng:campo-formulario IngresarDescuentoFactura valor --tipo string --nombreAPresentarse "$ Descuento" --tooltip "Ingrese el valor del descuento" --ejemplo "$15.00"
```

# Tercero 
Creación de la clase con los campos generados
```
$ yo man-lab-yo-ng:clase IngresarDescuentoFactura
```

# Cuarto
Creación del componente
```
$ yo man-lab-yo-ng:componente IngresarDescuentoFactura
```
