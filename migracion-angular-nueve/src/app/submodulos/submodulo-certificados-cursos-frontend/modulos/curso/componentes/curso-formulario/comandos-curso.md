# Primero
yo man-lab-yo-ng:clase-formulario Curso
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario Curso articulo --tipo "ArticuloInterface | number | string | any" --tipoControl autocomplete --autocompleteBusqueda "ArticuloInterface,nombre" --nombreAPresentarse "Articulo" --tooltip "Select the course item" --ejemplo "DIP course?" --required

yo man-lab-yo-ng:campo-formulario Curso nombre --tipo string  --minLength 3 --required --tipoControl input-text --maxLength 255  --tipoCampoHtml text 


yo man-lab-yo-ng:campo-formulario Curso descripcion --tipo string  --minLength 3  --tipoControl input-text --maxLength 255  --tipoCampoHtml text --required


# Tercero

yo man-lab-yo-ng:clase Curso

# Cuarto 

yo man-lab-yo-ng:componente Curso --nombreModuloInternacionalizacion "submoduloCertificadosCuros.moduloCurso.cursoFormulario"
