# Primero
yo man-lab-yo-ng:clase-formulario Pedido
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario Pedido curso --tipo string  --minLength 3 --required --tipoControl input-text --maxLength 100  --tipoCampoHtml text 

yo man-lab-yo-ng:campo-formulario Pedido horarioServicio --tipo string  --minLength 3 --required --tipoControl input-text --maxLength 100  --tipoCampoHtml text 

yo man-lab-yo-ng:campo-formulario Pedido valor --tipo string  --minLength 3 --required --tipoControl input-text --maxLength 60  --tipoCampoHtml text 

yo man-lab-yo-ng:campo-formulario Pedido nombres --tipo string  --minLength 3 --required --tipoControl input-text --maxLength 60  --tipoCampoHtml text 


yo man-lab-yo-ng:campo-formulario Pedido apellidos --tipo string  --minLength 3  --tipoControl input-text --maxLength 60  --tipoCampoHtml text --required


# Tercero

yo man-lab-yo-ng:clase Pedido

# Cuarto 

yo man-lab-yo-ng:componente Pedido --nombreModuloInternacionalizacion "submoduloCertificadosCuros.pedido.pedidoFormulario"


