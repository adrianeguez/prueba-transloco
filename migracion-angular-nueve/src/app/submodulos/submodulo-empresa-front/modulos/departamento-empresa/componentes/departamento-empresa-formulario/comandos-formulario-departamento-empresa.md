# Primero
yo man-lab-yo-ng:clase-formulario DepartamentoEmpresa
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario DepartamentoEmpresa nombre --tipo string --nombreAPresentarse "Nombre" --tooltip "Ingrese nombre del departamento" --ejemplo "Departamento de ventas" --minLength 1 --required  input-text --maxLength 30   
yo man-lab-yo-ng:campo-formulario DepartamentoEmpresa descripcion --tipo string --nombreAPresentarse "Descripción"  "Ingrese descripción del departamento" --ejemplo "departamento de ventas matriz" --minLength 3 --required  input-text --maxLength 100   
yo man-lab-yo-ng:campo-formulario DepartamentoEmpresa nivel --tipo number --nombreAPresentarse "Nivel" --tooltip "" --ejemplo "1"  input-number

// yo man-lab-yo-ng:campo-formulario DepartamentoEmpresa departamentoEmpresaPadre --tipo string --nombreAPresentarse "Departamento" --tipoControl autocomplete --autocompleteBusqueda "DepartamentoEmpresa,nombre"

# Tercero

yo man-lab-yo-ng:clase DepartamentoEmpresa

# Cuarto 

yo man-lab-yo-ng:componente DepartamentoEmpresa
