# Primero
yo man-lab-yo-ng:clase-formulario ArticuloBodega
# Segundo
//campos del formulario

yo man-lab-yo-ng:campo-formulario ArticuloBodega articuloEmpresa --tipo string --nombreAPresentarse "Artículo" --tipoControl autocomplete --autocompleteBusqueda "ArticuloPorEmpresa,articulo.codigo" --required

yo man-lab-yo-ng:campo-formulario ArticuloBodega minimo --tipo string --nombreAPresentarse " Stock minímo" --tooltip "Ingrese el mínimo stock"  --ejemplo "20"  input-text   --required

yo man-lab-yo-ng:campo-formulario ArticuloBodega maximo --tipo string --nombreAPresentarse " Stock maximo" --tooltip "Ingrese el máximo stock" --ejemplo "100"  input-text   --required

yo man-lab-yo-ng:campo-formulario ArticuloBodega minimoAlerta --tipo string --nombreAPresentarse "Stock Minímo Alerta" --tooltip "Ingrese el stock mínimo alerta" --ejemplo "25"  input-text   --required

yo man-lab-yo-ng:campo-formulario ArticuloBodega inventarioInicialCantidad --tipo string --nombreAPresentarse "Cantidad en número" --ejemplo "40"  input-text   --required

yo man-lab-yo-ng:campo-formulario ArticuloBodega inventarioInicialDinero --tipo string --nombreAPresentarse "Cantidad en dinero" --ejemplo "50"  input-text   --required


# Tercero

yo man-lab-yo-ng:clase ArticuloBodega

# Cuarto 

yo man-lab-yo-ng:componente ArticuloBodega
