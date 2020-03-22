import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatosUsuarioRestService } from '../../../servicios/rest/datos-usuario-rest.service';
import { Auth0UsuarioInterface } from '../../../interfaces/auth0-usuario.interface';
import { UsuarioInterface } from '../../../interfaces/usuario.interface';
import {DatosUsuarioInterface} from '../../../../submodulo-empresa-front/interfaces/datos-usuario.interface';
import {CargandoService} from 'man-lab-ng';

@Component({
  selector: 'ml-select-usuario',
  templateUrl: './select-usuario.component.html',
  styleUrls: ['./select-usuario.component.sass'],
})
export class SelectUsuarioComponent implements OnInit {
  usuarioEncontrado: string;
  usuarios: DatosUsuarioInterface[];
  @Output() usuarioSeleccionado: EventEmitter<
    DatosUsuarioInterface
  > = new EventEmitter();

  constructor(private readonly _usuarioRestService: DatosUsuarioRestService,
              private readonly _cargandoService: CargandoService) {}

  ngOnInit() {}

  buscarUsuarios(criterio) {
    const valor = criterio.query;
    const query = {
      where: [
        {
          campo: 'nombre',
          valor: `%25${valor}%25`,
        },
        {
          campo: 'identificacionPais',
          valor: `%25${valor}%25`,
        },
      ],
    };
    const consulta = `?criterioBusqueda=${JSON.stringify(query)}`;
    this._cargandoService.habilitarCargando();
    this._usuarioRestService.findAll(consulta).subscribe(
      r => {
        this.usuarios = r[0];
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        this.usuarios = [];
        console.error('error', error);
      },
    );
  }

  emitirUsuarioSeleccionado(usuarioSeleccionado: DatosUsuarioInterface) {
    // this.usuarioEncontrado = usuarioSeleccionado.nombres;
    this.usuarioSeleccionado.emit(usuarioSeleccionado);
  }
}
