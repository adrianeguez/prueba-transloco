# Primero
yo man-lab-yo-ng:clase-formulario TipoLogroVisita
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario TipoLogroVisita nombre --tipo string --nombreAPresentarse "Tipo de logro *" --tooltip "Ingrese tipo de logro de visita" --ejemplo "Venta"  --minLength 3   input-text --maxLength 60 --required 

yo man-lab-yo-ng:campo-formulario TipoLogroVisita descripcion --tipo string --nombreAPresentarse " Descripción" --tooltip "Ingrese la descripción del tipo de logro de visita" --ejemplo "Vender promociones" --minLength 7 input-text --maxLength 60  

# Tercero

yo man-lab-yo-ng:clase  TipoLogroVisita

# Cuarto 

yo man-lab-yo-ng:componente TipoLogroVisita
