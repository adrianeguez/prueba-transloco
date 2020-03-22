# Primero
yo man-lab-yo-ng:clase-formulario Idioma
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario Idioma nombre --tipo string  --required --tipoControl select-many  --tipoCampoHtml text 
yo man-lab-yo-ng:campo-formulario Idioma idiomaCurso --tipo string  --tipoControl autocomplete --autocompleteBusqueda "EmpresaInterface,nombreComercial" --required

# Tercero

yo man-lab-yo-ng:clase Idioma

# Cuarto 

yo man-lab-yo-ng:componente Idioma --nombreModuloInternacionalizacion "submoduloCertificadosCuros.moduloCurso.idiomaCursoFormulario"
