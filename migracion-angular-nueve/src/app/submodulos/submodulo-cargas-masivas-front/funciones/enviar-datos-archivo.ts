import { CargaMasivaInterface } from '../interfaces/carga-masiva.interface';
import { toastExitoCrearDatosArchivoCargaMasiva } from '../constantes/mensajes-toaster';
import { toastErrorCrear } from '../../../constantes/mensajes-toaster';
import { ToasterService } from 'angular2-toaster';
import { CargaMasivaRestService } from '../servicios/rest/carga-masiva-rest.service';
import { CargandoService } from 'man-lab-ng';

export function enviarDatosArchivo(
  archivoAGuardar: CargaMasivaInterface,
  servicio: CargaMasivaRestService,
  cargandoService: CargandoService,
  servicioToast: ToasterService,
) {
  const datosArchivo$ = servicio.create(archivoAGuardar);
  cargandoService.habilitarCargando();
  datosArchivo$.subscribe(
    r => {
      cargandoService.deshabilitarCargando();
      servicioToast.pop(toastExitoCrearDatosArchivoCargaMasiva);
      this.values.push(r);
    },
    e => {
      cargandoService.deshabilitarCargando();
      console.error('Error', e);
      servicioToast.pop(toastErrorCrear);
    },
  );
}
