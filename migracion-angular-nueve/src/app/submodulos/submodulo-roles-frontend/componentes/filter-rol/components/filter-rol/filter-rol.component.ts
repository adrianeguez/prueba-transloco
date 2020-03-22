import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RolRestService } from '../../../../servicios/rest/rol.service';
import { RolInterface } from '../../../../interfaces/rol-interface';
import { ESTADOS } from '../../../../../../enums/estados';
import { CargandoService } from 'man-lab-ng';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';

@Component({
  selector: 'ml-filter-rol',
  templateUrl: './filter-rol.component.html',
  styleUrls: ['./filter-rol.component.sass'],
})
export class FilterRolComponent implements OnInit {
  @Input() filtrarSoloActivos = true;
  @Output() rolesEncontrados: EventEmitter<RolInterface> = new EventEmitter();
  estados = ESTADOS;
  constructor(
    private readonly _rolRestService: RolRestService,
    private readonly _cargandoRestService: CargandoService,
    private readonly _auth0Service: Auth0Service,
  ) {}
  ngOnInit() {
    this.buscarRol('');
  }

  buscarRol(value: string) {
    this._cargandoRestService.habilitarCargando();
    const query = this.filtrarSoloActivos
      ? {
        where: {
          estado: this.estados.Activo,
          empresa: this._auth0Service.empresaSeleccionada.empresa.id,
          nombre: `Like(\"%25${value}%25\")`,
        },
        order: {
          id: 'DESC',
        },
      }
      : {
        where: {
          nombre: `Like(\"%25${value}%25\")`,
          empresa: this._auth0Service.empresaSeleccionada.empresa.id,
        },
        order: {
          id: 'DESC',
        },
      };
    this._rolRestService
      .findAll('criterioBusqueda=' + JSON.stringify(query))
      .subscribe(
        (r: any) => {
          this._cargandoRestService.deshabilitarCargando();
          this.rolesEncontrados.emit(r[0]);
        },
        error => {
          console.error(error);
          this._cargandoRestService.deshabilitarCargando();
        },
      );
  }
}
