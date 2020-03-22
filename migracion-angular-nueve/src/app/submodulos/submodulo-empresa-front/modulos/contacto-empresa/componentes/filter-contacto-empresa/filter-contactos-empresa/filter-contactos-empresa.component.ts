import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CargandoService} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';
import {ToasterService} from 'angular2-toaster';
import {NO_EXISTEN_REGISTROS} from '@manticore-labs/ng-api';
import {ContactoEmpresaInterface} from '../../../../../interfaces/contacto-empresa.interface';
import {ContactoEmpresaRestService} from '../../../../../servicios/rest/contacto-empresa-rest.service';

@Component({
  selector: 'ml-filter-contactos-empresa',
  templateUrl: './filter-contactos-empresa.component.html',
  styleUrls: ['./filter-contactos-empresa.component.scss']
})
export class FilterContactosEmpresaComponent implements OnInit {

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;
  @Input() idEmpresa: number;
  @Output() contactosEncontrados: EventEmitter<[ContactoEmpresaInterface[], number]> = new EventEmitter();
  skip = 0;

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _translocoService: TranslocoService,
    private _toasterService: ToasterService,
    private _contactoEmpresaRestService: ContactoEmpresaRestService,
  ) { }

  ngOnInit() {
  }

  buscarContactoPorNombreOIdentificacion(busqueda: string) {
    busqueda = busqueda.trim();
    this._cargandoService.habilitarCargando();
    let consulta;
    if (busqueda !== '') {
      consulta = {
        skip: this.skip,
        take: 5,
        where: {
          empresa: {
            id: this.idEmpresa,
          },
          datosUsuario: {
            identificacionPais: `Like(\"%25${busqueda}%25\")`,
            apellidos: `Like(\"%25${busqueda}%25\")`,
            mlabOr: true,
          },
          tipoCargo: {}
        }
      };
    } else {
      consulta = {
        skip: this.skip,
        take: 5,
        where: {
          empresa: {
            id: this.idEmpresa,
          },
          datosUsuario: {},
          tipoCargo: {}
        }
      };
    }
    let siguienteContacto$;
    siguienteContacto$ = this._contactoEmpresaRestService.findAll(
      'criterioBusqueda=' + JSON.stringify(consulta));
    siguienteContacto$
      .subscribe(
        (listaContactos: [ContactoEmpresaInterface[], number]) => {
          this._cargandoService.deshabilitarCargando();
          console.log('lalista de contactos a mostrar', listaContactos);
          this.contactosEncontrados.emit(listaContactos);
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
          this._toasterService.pop(
            'error',
            this._translocoService
              .translate('errores.errorTitulo'),
            this._translocoService
              .translate('errores.errorServidor'),
          );
          // Manejar errores
        }
      );
  }

}
