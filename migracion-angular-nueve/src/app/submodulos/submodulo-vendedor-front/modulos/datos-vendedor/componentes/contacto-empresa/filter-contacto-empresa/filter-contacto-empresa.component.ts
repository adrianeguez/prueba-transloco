import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {ContactoEmpresaRestService} from '../../../../../../submodulo-empresa-front/servicios/rest/contacto-empresa-rest.service';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {toastErrorConexionServidor} from '../../../../../../../constantes/mensajes-toaster';
import {TipoDatosVenRestService} from '../../../../../servicios/rest/tipo-datos-ven-rest.service';

@Component({
  selector: 'ml-filter-contacto-empresa',
  templateUrl: './filter-contacto-empresa.component.html',
  styleUrls: ['./filter-contacto-empresa.component.scss'],
})
export class FilterContactoEmpresaComponent implements OnInit {
  busqueda = '';
  tipoDatoVendedor = [];
  @Input() idEmpresa;
  @Output() contactosEmpresaEncontrados: EventEmitter<[any[], number]> = new EventEmitter();


  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    private readonly _contactoEmpresaRestService: ContactoEmpresaRestService,
    private readonly _tipoDatosVenRestService: TipoDatosVenRestService,
  ) {
  }

  ngOnInit() {
    this.buscarVendedoresTipoVendedor();
    this.buscarContactoEmpresaPorNombreOIdentificacion('');
  }


  buscarContactoEmpresaPorNombreOIdentificacion(busqueda) {
    const valorBusqueda = busqueda.trim();
    this._cargandoService.habilitarCargando();
    const camposABuscar = [
      'nombres', 'apellidos', 'identificacionPais'
    ];
    const camposABuscarTipoCargo = ['nombre'];
    const datos = {
      busqueda: valorBusqueda,
      camposABuscar,
      camposABuscarTipoCargo,
      skip: null,
      take: null,
      idEmpresa: this.idEmpresa,
      habilitado: 1,
      obtenerContactosSinVendedor: true,
    };
    this._contactoEmpresaRestService
      .obtenerContactosEmpresa(
        datos
      ).subscribe(
      r => {
        this.contactosEmpresaEncontrados.emit(r);
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorConexionServidor);
      }
    );
  }

  buscarVendedoresTipoVendedor() {
    const consulta = {
      relations: ['datosVendedor', 'tipoVendedor'],
    };
    this._tipoDatosVenRestService
      .findAll('criterioBusqueda=' + JSON.stringify(consulta))
      .subscribe(
        r => {
          this.tipoDatoVendedor = r[0];
        },
        error => {
          console.error(error);
          this._toasterService.pop(toastErrorConexionServidor);
        }
      );
  }

}
