# Primero
```
$ yo man-lab-yo-ng:clase-formulario CronoVendDetalle
```
# Segundo
```
$ yo man-lab-yo-ng:campo-formulario CronoVendDetalle orden --tipo string --nombreAPresentarse "Orden*" --tooltip "Ingrese el orden" --ejemplo "1 o 2 - a o b" --required
$ yo man-lab-yo-ng:campo-formulario CronoVendDetalle fecha --tipo Date --nombreAPresentarse "Fecha" --tooltip "Ingrese fecha" --ejemplo "10/12/2019"
$ yo man-lab-yo-ng:campo-formulario CronoVendDetalle lunes --tipo boolean --nombreAPresentarse "Lunes" --tooltip "Disponible en lunes" --ejemplo "[ ]" --tipoCampoHtml checkbox
$ yo man-lab-yo-ng:campo-formulario CronoVendDetalle martes --tipo boolean --nombreAPresentarse "Martes" --tooltip "Disponible en martes" --ejemplo "[ ]" --tipoCampoHtml checkbox
$ yo man-lab-yo-ng:campo-formulario CronoVendDetalle miercoles --tipo boolean --nombreAPresentarse "Miércoles" --tooltip "Disponible en miércoles" --ejemplo "[ ]" --tipoCampoHtml checkbox
$ yo man-lab-yo-ng:campo-formulario CronoVendDetalle jueves --tipo boolean --nombreAPresentarse "Jueves" --tooltip "Disponible en jueves" --ejemplo "[ ]" --tipoCampoHtml checkbox
$ yo man-lab-yo-ng:campo-formulario CronoVendDetalle viernes --tipo boolean --nombreAPresentarse "Viernes" --tooltip "Disponible en viernes" --ejemplo "[ ]" --tipoCampoHtml checkbox
$ yo man-lab-yo-ng:campo-formulario CronoVendDetalle sabado --tipo boolean --nombreAPresentarse "Sábado" --tooltip "Disponible en sabado" --ejemplo "[ ]" --tipoCampoHtml checkbox
$ yo man-lab-yo-ng:campo-formulario CronoVendDetalle domingo --tipo boolean --nombreAPresentarse "Domingo" --tooltip "Disponible en domingo" --ejemplo "[ ]" --tipoCampoHtml checkbox
$ yo man-lab-yo-ng:campo-formulario CronoVendDetalle horaVisita --tipo string --nombreAPresentarse "Hora visita" --tooltip "Ingrese hora de visita" --ejemplo "8:00" --tipoCampoHtml text
$ yo man-lab-yo-ng:campo-formulario CronoVendDetalle rutaCliente --tipo "RutaClienteInterface | number | string | any" --tipoControl autocomplete --autocompleteBusqueda "RutaCliente,id" --nombreAPresentarse "Ruta Cliente*" --tooltip "Ruta cliente donde aplica el cronograma" --ejemplo "1" --required
```

# Tercero 
```
$ yo man-lab-yo-ng:clase CronoVendDetalle
```

# Cuarto
```
$ yo man-lab-yo-ng:componente CronoVendDetalle
```

