# Primero
yo man-lab-yo-ng:clase-formulario EmpresaClientes
# Segundo
//campos del formulario

yo man-lab-yo-ng:campo-formulario EmpresaClientes empresaCliente --tipo string --nombreAPresentarse "Empresa" --tipoControl autocomplete --autocompleteBusqueda "Empresa,razonSocial" --required

yo man-lab-yo-ng:campo-formulario EmpresaClientes razonSocial --tipo string --nombreAPresentarse "Razón social" --ejemplo "Manticore" --minLength 4  input-text --maxLength 50   --required

yo man-lab-yo-ng:campo-formulario EmpresaClientes ruc --tipo string --nombreAPresentarse "RUC" --ejemplo "1744878998001" --minLength 13  input-text --maxLength 13   --required

# Tercero

yo man-lab-yo-ng:clase EmpresaClientes

# Cuarto 

yo man-lab-yo-ng:componente EmpresaClientes
