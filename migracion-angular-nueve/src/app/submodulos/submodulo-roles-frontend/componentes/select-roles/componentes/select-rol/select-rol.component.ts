import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RolRestService } from '../../../../servicios/rest/rol.service';
import { RolInterface } from '../../../../interfaces/rol-interface';
import { CargandoService } from 'man-lab-ng';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';

@Component({
  selector: 'ml-select-rol',
  templateUrl: './select-rol.component.html',
  styleUrls: ['./select-rol.component.sass'],
})
export class SelectRolComponent implements OnInit {
  roles: RolInterface[] = [];
  rolSeleccionado: RolInterface;
  @Output() rolSeleccionadoEmitir: EventEmitter<
    RolInterface | boolean
    > = new EventEmitter();
  constructor(
    private readonly _rolRestService: RolRestService,
    private readonly _cargandoService: CargandoService,
    private readonly _auth0Service: Auth0Service
  ) {}

  ngOnInit() {
    this._cargarRoles();
  }

  private _cargarRoles() {
    this._cargandoService.habilitarCargando();
    const query = {
      where: {
        estado: 1,
        empresa: this._auth0Service.empresaSeleccionada.empresa.id,
      },
      skip: 0,
      take: 30,
      order: {
        id: 'DESC',
      },
    };
    const rolesCargados$ = this._rolRestService.findAll(
      'criterioBusqueda=' + JSON.stringify(query),
    );
    rolesCargados$.subscribe(
      r => {
        this._cargandoService.deshabilitarCargando();
        if (r[0].length > 0) {
          this.roles = r[0];
          this.rolSeleccionadoEmitir.emit(this.roles[0]);
          this.rolSeleccionado = this.roles[0];
        }
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
      },
    );
  }

  enviarRolSeleccionado(evento: any) {
    this.rolSeleccionadoEmitir.emit(
      evento.value ? this.rolSeleccionado : false,
    );
  }
}
