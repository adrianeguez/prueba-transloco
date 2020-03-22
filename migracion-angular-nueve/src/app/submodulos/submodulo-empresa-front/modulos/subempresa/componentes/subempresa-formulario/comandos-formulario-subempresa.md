# Primero
yo man-lab-yo-ng:clase-formulario Subempresa
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario Subempresa empresaHijo --tipo string --nombreAPresentarse "Empresa" --tipoControl autocomplete --autocompleteBusqueda "Empresa,razonSocial" --required

yo man-lab-yo-ng:campo-formulario Subempresa razonSocial --tipo string --nombreAPresentarse "Razón Social" --ejemplo "Manticore" --minLength 4  input-text --maxLength 50   --required

yo man-lab-yo-ng:campo-formulario Subempresa ruc --tipo string --nombreAPresentarse "RUC" --ejemplo "1744878998001" --minLength 13  input-text --maxLength 13   --required

yo man-lab-yo-ng:campo-formulario Subempresa nivel --tipo number --nombreAPresentarse "Nivel" --tooltip "Ingrese nivel de la empresa" --ejemplo "1"  input-number --required


# Tercero

yo man-lab-yo-ng:clase Subempresa

# Cuarto 

yo man-lab-yo-ng:componente Subempresa
