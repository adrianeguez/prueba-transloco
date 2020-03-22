# Primero
yo man-lab-yo-ng:clase-formulario Empresa
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario Empresa nombreComercial --tipo string --nombreAPresentarse "Nombre Comercial" --tooltip "Ingrese nombre comercial de la empresa" --ejemplo "Manticore" --minLength 2   input-text --maxLength 150   

yo man-lab-yo-ng:campo-formulario Empresa razonSocial --tipo string --nombreAPresentarse "Razón social" --tooltip "Ingrese la razón social de la empresa" --ejemplo "Manticore s.a" --minLength 3 --required  input-text --maxLength 150

yo man-lab-yo-ng:campo-formulario Empresa ruc --tipo string --nombreAPresentarse "RUC" --tooltip "Ingrese el RUC de la empresa" --ejemplo "1724158874001" --minLength 13 --required  input-text --maxLength 13

yo man-lab-yo-ng:campo-formulario Empresa direccionMatriz --tipo string --nombreAPresentarse "Dirección matriz" --tooltip "Ingrese la dirección matriz  de la empresa" --ejemplo "Av. Amazonas N37-61" --minLength 3 --required  input-text --maxLength 100

yo man-lab-yo-ng:campo-formulario Empresa telefono --tipo string --nombreAPresentarse "Teléfono" --tooltip "Ingrese el teléfono de la empresa" --ejemplo "0992998255" --minLength 9 --required  input-text --maxLength 10

yo man-lab-yo-ng:campo-formulario Empresa correo --tipo string --nombreAPresentarse "Correo" --tooltip "Ingrese el correo de la empresa" --ejemplo "manticore-labs@mail.com" --minLength 4 --required  input-text --maxLength 100

yo man-lab-yo-ng:campo-formulario Empresa codigo --tipo string --nombreAPresentarse "Código" --tooltip "Ingrese el código de la empresa" --ejemplo "50012" --minLength 5 --required  input-text --maxLength 10

yo man-lab-yo-ng:campo-formulario Empresa tipo --tipo string --nombreAPresentarse "Tipo"   --tooltip "Seleccione el tipo de empresa" --tipoControl select-many --opcionesSelect "ninguno, reventa - estación de servicio, reventa - lubricadora, estación de servicio EP petroecuador, gerencia, empresa pública, distribuidor"

yo man-lab-yo-ng:campo-formulario Empresa tipoContribuyente --tipo string --nombreAPresentarse "Tipo de Contribuyente"   --tooltip "Seleccione el tipo de contribuyente" --tipoControl select-many --opcionesSelect "Sociedades,Persona Natural, Especial" --required

yo man-lab-yo-ng:campo-formulario Empresa contribuyenteEspecial --tipo number --nombreAPresentarse "Contribuyente especial Nro" --tooltip "Ingrese el númeo de contribuyente especial" --ejemplo "24558" input-number --minLength 3 input-text --maxLength 5 --required

yo man-lab-yo-ng:campo-formulario Empresa obligadoContabilidad --tipo string --nombreAPresentarse "Obligado a contabilidad"  --tipoControl select-many --opcionesSelect "Si,No" --required

# Tercero

yo man-lab-yo-ng:clase Empresa

# Cuarto 

yo man-lab-yo-ng:componente Empresa
