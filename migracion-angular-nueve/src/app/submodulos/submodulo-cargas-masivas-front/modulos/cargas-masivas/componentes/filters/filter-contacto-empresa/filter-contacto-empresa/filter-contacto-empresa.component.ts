import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { toastErrorConexionServidor } from '../../../../../../../../constantes/mensajes-toaster';
import { ContactoEmpresaRestService } from '../../../../../../../submodulo-empresa-front/servicios/rest/contacto-empresa-rest.service';
import { ContactoEmpresaInterface } from '../../../../../../../submodulo-empresa-front/interfaces/contacto-empresa.interface';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-filter-contacto-empresa',
  templateUrl: './filter-contacto-empresa.component.html',
  styleUrls: ['./filter-contacto-empresa.component.scss'],
})
export class FilterContactoEmpresaComponent implements OnInit {
  skip = 0;
  busqueda = '';
  @Output() contatoEmpresaEncontrada: EventEmitter<
    [ContactoEmpresaInterface[], number]
  > = new EventEmitter();

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    private readonly _contactoEmpresaRestService: ContactoEmpresaRestService,
  ) {}

  ngOnInit() {}

  buscarContactoEmpresaPorEmpresa() {
    let contactoEmpresa$;
    let consulta;

    if (this.busqueda === '') {
      consulta = {
        relations: ['empresa', 'datosUsuario'],
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
        habilitado: 1,
      };
      contactoEmpresa$ = this._contactoEmpresaRestService.findAll(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    } else {
      this._cargandoService.habilitarCargando();
      consulta = {
        busqueda: this.busqueda,
        camposABuscar: ['nombres', 'apellidos'],
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
        habilitado: 1,
      };
      contactoEmpresa$ = this._contactoEmpresaRestService.obtenerContactosEmpresa(
        consulta,
      );
    }

    contactoEmpresa$.subscribe(
      respuesta => {
        this._cargandoService.deshabilitarCargando();
        this.contatoEmpresaEncontrada.emit(respuesta);
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorConexionServidor);
      },
    );
  }

  buscarContactoEmpresa() {
    this._cargandoService.habilitarCargando();
    this.buscarContactoEmpresaPorEmpresa();
  }
}
