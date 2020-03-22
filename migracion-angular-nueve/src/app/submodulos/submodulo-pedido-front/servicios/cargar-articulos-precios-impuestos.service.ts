import { Injectable } from '@angular/core';
import {ArticuloPorEmpresaRestSqljsService} from './rest/articulo-por-empresa/articulo-por-empresa-rest-sqljs.service';
import {ArticuloRestSqljsService} from './rest/articulo/articulo-rest-sqljs.service';
import {TarifaImpuestoRestSqljsService} from './rest/tarifa-impuesto/tarifa-impuesto-rest-sqljs.service';
import {PrecioRestSqljsService} from './rest/precio/precio-rest-sqljs.service';
import {HistorialImpuestoRestSqljsService} from './rest/historial-impuesto/historial-impuesto-rest-sqljs.service';
import {Auth0Service} from '../../submodulo-front-comun/servicios/auth0/auth0.service';
import {ArticuloPorEmpresaEntity} from './rest/articulo-por-empresa/articulo-por-empresa.entity';
import {eliminarDistintos} from '../funciones/eliminar-distintos';
import {ArticuloEntity} from './rest/articulo/articulo.entity';
import {PrecioEntity} from './rest/precio/precio.entity';
import {TarifaImpuestoEntity} from './rest/tarifa-impuesto/tarifa-impuesto.entity';
import {HistorialImpuestoEntity} from './rest/historial-impuesto/historial-impuesto.entity';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {EmpresaRestSqljsService} from './rest/empresa/empresa-rest-sqljs.service';
import {EmpresaEntity} from './rest/empresa/empresa.entity';

@Injectable({
  providedIn: 'root'
})
export class CargarArticulosPreciosImpuestosService {
  estaCargando;
  constructor(
    private readonly _articuloEmpresaRestSqljsService: ArticuloPorEmpresaRestSqljsService,
    private readonly _articuloRestSqljsService: ArticuloRestSqljsService,
    private readonly _tarifaImpuestoRestSqljsService: TarifaImpuestoRestSqljsService,
    private readonly _precioRestSqljsService: PrecioRestSqljsService,
    private readonly _historialRestSqljsService: HistorialImpuestoRestSqljsService,
    private readonly _empresaRestSqljsService: EmpresaRestSqljsService,
    public readonly _auth0Service: Auth0Service,
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
  ) {
    this.estaCargando = localStorage.getItem('estaCargando');
  }

  async cargarArticulosPreciosImpuestos() {
    return new Promise(
      async (res, rej) => {
        const estaCargando = JSON.parse(localStorage.getItem('estaCargando'));
        const estaBorramdoBase = JSON.parse(localStorage.getItem('estaBorramdoBase'));
        const seSeleccionoEmpresa = this._auth0Service.empresaSeleccionada && this._auth0Service.empresaSeleccionada.empresa;
        if (seSeleccionoEmpresa) {
          if (!estaCargando && !estaBorramdoBase) {
            try {
              localStorage.setItem('estaCargando', '1');
              this.estaCargando = 1;
              setTimeout( async () => {
                try {
                  const promesaArticulosEmpresa = this._articuloEmpresaRestSqljsService.obtenerArticuloPrecioImpuestoPorIdEmpresa(
                    {idEmpresa: this._auth0Service.empresaSeleccionada.empresa.id}).toPromise();
                  const respuestaPromesaArticulosEmpresa = await promesaArticulosEmpresa;
                  const articulosEmpresa = respuestaPromesaArticulosEmpresa[0];
                  const articulosEmpresaClonadosEntity = [];
                  const empresasClonadasEntity = [];
                  const articulosClonadosEntity = [];
                  const tarifasImpuestoClonadosEntity = [];
                  const preciosClonadosEntity = [];
                  const historialImpuestoClonadosEntity = [];
                  articulosEmpresa.map( async articuloEmpresa => {
                    const articuloEmpresaClonado = { ... articuloEmpresa};
                    delete articuloEmpresaClonado.empresa;
                    delete articuloEmpresaClonado.articulo;
                    const articuloClonado = { ... articuloEmpresa.articulo};
                    const empresaClonada = { ... articuloEmpresa.empresa};
                    const tarifaImpuesto = [...articuloEmpresa.articulo.tarifaImpuesto];
                    tarifaImpuesto.forEach( tarifaImpuestoValor => {
                      const historialImpuestos = [...tarifaImpuestoValor.historialImpuesto];
                      historialImpuestos.forEach( historialImpuesto => {
                        historialImpuesto.tarifaImpuesto = tarifaImpuestoValor;
                        historialImpuestoClonadosEntity.push(historialImpuesto);
                      });
                      tarifaImpuestoValor.articulo = articuloEmpresa.articulo.id;
                      delete tarifaImpuestoValor.historialImpuesto;
                      tarifasImpuestoClonadosEntity.push(tarifaImpuestoValor);
                    });
                    delete articuloClonado.tarifaImpuesto;
                    articulosClonadosEntity.push(articuloClonado);
                    empresasClonadasEntity.push(empresaClonada);
                    const precios = [...articuloEmpresa.precios];
                    precios.forEach( precio => {
                      precio.articuloPorEmpresa = articuloEmpresa;
                      preciosClonadosEntity.push(precio);
                    });
                    articuloEmpresaClonado.empresa = empresaClonada;
                    articuloEmpresaClonado.articulo = articuloClonado;
                    articulosEmpresaClonadosEntity.push(articuloEmpresaClonado);
                  });
                  const empresasSinRepetidos: EmpresaEntity[] = eliminarDistintos(empresasClonadasEntity, 'id');
                  const articulosSinRepetidos: ArticuloEntity[] = eliminarDistintos(articulosClonadosEntity, 'id');
                  const articulosPorEmpresaSinRepetidos: ArticuloPorEmpresaEntity[] =
                    eliminarDistintos(articulosEmpresaClonadosEntity, 'id');
                  const preciosSinRepetidos: PrecioEntity[] = eliminarDistintos(preciosClonadosEntity, 'id');
                  const tarifasImpuestoSinRepetidos: TarifaImpuestoEntity[] = eliminarDistintos(tarifasImpuestoClonadosEntity, 'id');
                  const historialImpuestoSinRepetidos: HistorialImpuestoEntity[] = eliminarDistintos(historialImpuestoClonadosEntity, 'id');
                  await this._empresaRestSqljsService.upsert(empresasSinRepetidos);
                  await this._articuloRestSqljsService.upsert(articulosSinRepetidos);
                  await this._articuloEmpresaRestSqljsService.upsert(articulosPorEmpresaSinRepetidos);
                  await this._precioRestSqljsService.upsert(preciosSinRepetidos);
                  await this._tarifaImpuestoRestSqljsService.upsert(tarifasImpuestoSinRepetidos);
                  await this._historialRestSqljsService.upsert(historialImpuestoSinRepetidos);
                  localStorage.setItem('estaCargando', '0');
                  localStorage.setItem('cierreForzado', '0');
                  this.estaCargando = 0;
                  this._cargandoService.deshabilitarCargando();
                  res(true);
                } catch (e) {
                  localStorage.setItem('estaCargando', '0');
                  localStorage.setItem('cierreForzado', '0');
                  this.estaCargando = 0;
                  this._cargandoService.deshabilitarCargando();
                  rej(e);
                }
              }, 100);
            } catch (e) {
              localStorage.setItem('estaCargando', '0');
              localStorage.setItem('cierreForzado', '0');
              this.estaCargando = 0;
              this._cargandoService.deshabilitarCargando();
              rej(e);
            }
          }
        } else {
          this._cargandoService.deshabilitarCargando();
          rej({noSeSeleccionoEmpresa: true});
        }
      });
  }

}

