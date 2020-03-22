import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Auth0UsuarioInterface } from '../../../../interfaces/auth0-usuario.interface';
import { DatosUsuarioRestService } from '../../../../servicios/rest/datos-usuario-rest.service';
import { ESTADOS } from '../../../../../../enums/estados';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-filter-usuario',
  templateUrl: './filter-usuario.component.html',
  styleUrls: ['./filter-usuario.component.sass'],
})
export class FilterUsuarioComponent implements OnInit {
  estados = ESTADOS;
  @Output() usuariosEncontrados: EventEmitter<
    Auth0UsuarioInterface[]
  > = new EventEmitter();
  @Input() buscarActivos = true;
  constructor(
    private readonly _usuarioRestService: DatosUsuarioRestService,
    private readonly _cargandoService: CargandoService,
  ) {}
  ngOnInit() {
    this.buscarUsuario('');
  }

  buscarUsuario(value: string) {
    this._cargandoService.habilitarCargando();
    const query = this.buscarActivos
      ? {
          where: [
            {
              estado: this.estados.Activo,
              nombre: `Like(\"%25${value}%25\")`,
            },
            {
              estado: this.estados.Activo,
              cedula: `${value}`,
            },
          ],
        }
      : {
          where: [
            {
              nombre: `Like(\"%25${value}%25\")`,
            },
            {
              cedula: `Like(\"%25${value}%25\")`,
            },
          ],
        };

    this._usuarioRestService.findAllDatosUsuario(query).subscribe(
      (r: any) => {
        this._cargandoService.deshabilitarCargando();
        this.usuariosEncontrados.emit(r[0]);
      },
      error => {
        console.error(error);
        this.usuariosEncontrados.emit([]);
        this._cargandoService.deshabilitarCargando();
      },
    );
  }
}
