# Primero
yo man-lab-yo-ng:clase-formulario TipoSistema
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario TipoSistema tipo --tipo string --nombreAPresentarse "Tipo sistema" --tooltip "Seleccione tipo sistema" --ejemplo "Ingreso"  --required --tipoControl select-many --opcionesSelect "Ingreso,Egreso"

yo man-lab-yo-ng:campo-formulario TipoSistema valor --tipo string --nombreAPresentarse "Valor" --tooltip "Ingrese valor" --ejemplo "Ingreso de dinero" --minLength 3 --required --tipoControl input-text --maxLength 100 --tipoCampoHtml text
# Tercero

yo man-lab-yo-ng:clase TipoSistema

# Cuarto 

yo man-lab-yo-ng:componente TipoSistema
