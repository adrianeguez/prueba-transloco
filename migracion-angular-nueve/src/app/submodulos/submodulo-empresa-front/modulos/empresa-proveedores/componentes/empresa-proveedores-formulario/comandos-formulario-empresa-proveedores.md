# Primero
yo man-lab-yo-ng:clase-formulario EmpresaProveedores
# Segundo
//campos del formulario

yo man-lab-yo-ng:campo-formulario EmpresaProveedores empresaProveedor --tipo string --nombreAPresentarse "Empresa" --tipoControl autocomplete --autocompleteBusqueda "Empresa,razonSocial" --required

yo man-lab-yo-ng:campo-formulario EmpresaProveedores razonSocial --tipo string --nombreAPresentarse "Razón social" --ejemplo "Manticore" --minLength 4  input-text --maxLength 50   --required

yo man-lab-yo-ng:campo-formulario EmpresaProveedores ruc --tipo string --nombreAPresentarse "RUC" --ejemplo "1744878998001" --minLength 13  input-text --maxLength 13   --required

# Tercero

yo man-lab-yo-ng:clase EmpresaProveedores

# Cuarto 


