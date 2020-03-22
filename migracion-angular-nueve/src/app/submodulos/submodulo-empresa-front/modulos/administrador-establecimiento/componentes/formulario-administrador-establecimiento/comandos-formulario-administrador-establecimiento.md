# Primero
yo man-lab-yo-ng:clase-formulario AdministradorEstablecimiento
# Segundo
//campos del formulario

yo man-lab-yo-ng:campo-formulario AdministradorEstablecimiento  contactoEmpresa --tipo string --nombreAPresentarse "Contacto" --tipoControl autocomplete --autocompleteBusqueda "ContactoEmpresa,datosUsuario.identificacionPais" --required

yo man-lab-yo-ng:campo-formulario AdministradorEstablecimiento nombreContacto --tipo string --nombreAPresentarse "Nombres" --ejemplo "Carlos Salazar" --minLength 4  input-text --maxLength 80   --required

yo man-lab-yo-ng:campo-formulario AdministradorEstablecimiento documentoContacto --tipo string --nombreAPresentarse "Documento" --ejemplo "1724355713" --minLength 4  input-text --maxLength 15   --required

yo man-lab-yo-ng:campo-formulario AdministradorEstablecimiento gestionaPtoEmision --tipo string --nombreAPresentarse "Gestiona Pto Emision"  --tipoControl select-many --opcionesSelect "Si,No" --required
# Tercero

yo man-lab-yo-ng:clase AdministradorEstablecimiento

# Cuarto 

yo man-lab-yo-ng:componente AdministradorEstablecimiento
