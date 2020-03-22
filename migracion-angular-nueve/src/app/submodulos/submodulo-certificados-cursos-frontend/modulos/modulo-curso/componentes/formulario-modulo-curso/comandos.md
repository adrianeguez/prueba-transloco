# Primero
yo man-lab-yo-ng:clase-formulario ModuloCurso
# Segundo
//campos del formulario
yo man-lab-yo-ng:campo-formulario ModuloCurso anteriorModulo --tipo number  --tipoControl autocomplete --autocompleteBusqueda "ModuloInterface,nombre"
yo man-lab-yo-ng:campo-formulario ModuloCurso siguienteModulo --tipo number  --tipoControl autocomplete --autocompleteBusqueda "ModuloInterface,nombre"
yo man-lab-yo-ng:campo-formulario ModuloCurso nombre --tipo string  --minLength 3  --tipoControl input-text --maxLength 255  --tipoCampoHtml text 
yo man-lab-yo-ng:campo-formulario ModuloCurso descripcion --tipo string  --minLength 3  --tipoControl input-text --maxLength 255  --tipoCampoHtml text 

# Tercero

yo man-lab-yo-ng:clase ModuloCurso

# Cuarto 

yo man-lab-yo-ng:componente ModuloCurso --nombreModuloInternacionalizacion "submoduloCertificadosCuros.moduloCursoModulo.moduloCursoFormulario"
