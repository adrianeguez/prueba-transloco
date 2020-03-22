import { Injectable } from '@angular/core';
import {getConnection} from 'typeorm/browser';
import {ToasterService} from 'angular2-toaster';
import {CargandoService} from 'man-lab-ng';
import {VentaCabeceraRestSqljsService} from './rest/venta-cabecera/venta-cabecera-rest-sqljs.service';

@Injectable({
  providedIn: 'root'
})
export class EliminarDatosLocalesService {

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _ventasCabceraDetalle: VentaCabeceraRestSqljsService
  ) { }

  async eliminarDatosLocales() {
    const estaCargandoVentas = JSON.parse(localStorage.getItem('estaCargandoVentas'));
    const estaCargando = JSON.parse(localStorage.getItem('estaCargando'));
    if (!estaCargandoVentas && !estaCargando) {
      localStorage.setItem('estaBorramdoBase', '1');
      this._cargandoService.habilitarCargando();
      try {
        const connection = await getConnection();
        const queryRunner = await connection.createQueryRunner();
        await queryRunner.connection.synchronize(false);
        await queryRunner
          .connection
          .dropDatabase();
        await queryRunner
          .connection
          .synchronize(true);
        this._toasterService.pop('success', 'Éxito', 'Los datos locales se han eliminado correctamente');
        this._cargandoService.deshabilitarCargando();
        localStorage.setItem('estaBorramdoBase', '0');
      } catch (e) {
        console.error({
          error: e,
          mensaje: 'Ya hay base de datos',
        });
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop('error', 'Error', 'Error eliminando los datos locales.');
        localStorage.setItem('estaBorramdoBase', '0');
      }
    } else {
      this._cargandoService.deshabilitarCargando();
      this._toasterService.pop('error', 'Error', 'Error eliminando los datos locales, carga de datos en curso. Epere unos segundos');
    }
  }
}
