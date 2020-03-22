# Primero
yo man-lab-yo-ng:clase-formulario PruebaFisica
# Segundo
yo man-lab-yo-ng:campo-formulario Articulo nombre --tipo string --nombreAPresentarse "Nombre *" --tooltip "Ingrese el nombre del artículo" --ejemplo "GRASA INDUSTRIAL EP 2" --minLength 3 --required input-text --maxLength 60

yo man-lab-yo-ng:campo-formulario Articulo nombreCorto --tipo string --nombreAPresentarse "Nombre corto *" --tooltip "Ingrese el nombre corto del artículo" --ejemplo "EJ: INDUSTRIAL EP 2" --minLength 3 --required input-text --maxLength 30

yo man-lab-yo-ng:campo-formulario Articulo descripcion --tipo string --nombreAPresentarse "Descripción" --tooltip "Ingrese la descripción del artículo" --minLength 3 input-text --maxLength 100

yo man-lab-yo-ng:campo-formulario Articulo codigo --tipo string --nombreAPresentarse "Código producto *" --tooltip "Ingrese el código del artículo" --ejemplo "ESC001" --minLength 1 --required input-text --maxLength 30

yo man-lab-yo-ng:campo-formulario Articulo codigoAuxiliar --tipo string --nombreAPresentarse "Código auxiliar" --tooltip "Ingrese el código auxiliar del artículo" --ejemplo "ESC001" --minLength 1 input-text --maxLength 30

yo man-lab-yo-ng:campo-formulario Articulo codigoBarras --tipo string --nombreAPresentarse "Código de barras *" --tooltip "Ingrese el código de barras del artículo" --ejemplo "0127890484" --minLength 1 --required input-text --maxLength 100

yo man-lab-yo-ng:campo-formulario Articulo peso --tipo string --nombreAPresentarse "Peso *" --tooltip "Ingrese el peso del artículo" --ejemplo "20.23" --required input-text

yo man-lab-yo-ng:campo-formulario Articulo empresaProductora --tipo string --nombreAPresentarse "Empresa productora" --tooltip "Ingrese la empresa productora" --ejemplo "Petroecuador" --minLength 2 input-text --maxLength 20

yo man-lab-yo-ng:campo-formulario Articulo habilitadoStock --tipo string --nombreAPresentarse "Habilitado stock *"  --tipoControl select-many --opcionesSelect "Si,No" --required

yo man-lab-yo-ng:campo-formulario Articulo esServicio --tipo string --nombreAPresentarse "Es servicio *"  --tipoControl select-many --opcionesSelect "Si,No" --required

yo man-lab-yo-ng:campo-formulario Articulo unidadMedida --tipo string --nombreAPresentarse "Unidad medida *"  --tipoControl autocomplete --autocompleteBusqueda "UnidadMedida,nombre" --required

yo man-lab-yo-ng:campo-formulario Articulo tipoImpuesto --tipo string --nombreAPresentarse "Tipo impuesto *"  --tipoControl autocomplete --autocompleteBusqueda "TipoImpuesto,nombre" --required

yo man-lab-yo-ng:campo-formulario Articulo tarifa --tipo string --nombreAPresentarse "Tarifa *"  --tipoControl autocomplete --autocompleteBusqueda "Tarifa,nombre" --required




# Tercero 
yo man-lab-yo-ng:clase Articulo
# Cuarto
yo man-lab-yo-ng:componente Articulo
