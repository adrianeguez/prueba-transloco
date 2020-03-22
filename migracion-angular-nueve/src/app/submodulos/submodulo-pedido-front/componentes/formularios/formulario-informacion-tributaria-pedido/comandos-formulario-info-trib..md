# Primero
```
$ yo man-lab-yo-ng:clase-formulario InformacionTributaria
```
# Segundo
```

yo man-lab-yo-ng:campo-formulario InformacionTributaria tipoIdentificacion --tipo string --nombreAPresentarse "Tipo de documento" --tipoControl autocomplete --autocompleteBusqueda "TipoIdentificacion,nombre" --required

yo man-lab-yo-ng:campo-formulario InformacionTributaria documento --tipo string --nombreAPresentarse "# Documento" --tooltip "Ingrese el número del documento" --ejemplo "1724158874001" --minLength 1 --required  input-text --maxLength 50

yo man-lab-yo-ng:campo-formulario InformacionTributaria razonSocial --tipo string --nombreAPresentarse "Razón social" --tooltip "Ingrese la razón social de la empresa" --ejemplo "Manticore s.a" --minLength 3 --required  input-text --maxLength 150

yo man-lab-yo-ng:campo-formulario InformacionTributaria direccion --tipo string --nombreAPresentarse "Dirección" --tooltip "Ingrese la dirección" --ejemplo "Av. Amazonas N37-61" --minLength 1 --required  input-text --maxLength 100

yo man-lab-yo-ng:campo-formulario InformacionTributaria telefono --tipo string --nombreAPresentarse "Teléfono" --tooltip "Ingrese el teléfono" --ejemplo "0992998255" --minLength 9 --required  input-text --maxLength 10

yo man-lab-yo-ng:campo-formulario InformacionTributaria correo --tipo string --nombreAPresentarse "Correo" --tooltip "Ingrese el correo" --ejemplo "manticore-labs@mail.com" --minLength 5 --required  input-text --maxLength 60

yo man-lab-yo-ng:campo-formulario InformacionTributaria tipoContribuyente --tipo string --nombreAPresentarse "Tipo de Contribuyente"   --tooltip "Seleccione el tipo de contribuyente" --tipoControl select-many --opcionesSelect "Sociedades,Persona Natural" --required

yo man-lab-yo-ng:campo-formulario InformacionTributaria contribuyenteEspecial --tipo number --nombreAPresentarse "Contribuyente especial Nro" --tooltip "Ingrese el númeo de contribuyente especial" --ejemplo "24558" input-number --minLength 3 input-text --maxLength 5 

yo man-lab-yo-ng:campo-formulario InformacionTributaria obligadoContabilidad --tipo string --nombreAPresentarse "Obligado a contabilidad"  --tipoControl select-many --opcionesSelect "Si,No" --required
```

# Tercero 
```
$ yo man-lab-yo-ng:clase InformacionTributaria
```

# Cuarto
```
$ yo man-lab-yo-ng:componente InformacionTributaria
```
