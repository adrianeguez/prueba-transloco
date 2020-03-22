import { Component, OnInit } from '@angular/core';
import { MenuInterface } from '../../../../interfaces/menu-interface';
import { RolInterface } from '../../../../interfaces/rol-interface';
import { RolMenuRestService } from '../../../../servicios/rest/rol-menu.service';
import { RolMenuInterface } from '../../../../interfaces/rol-menu.interface';
import { MatDialog } from '@angular/material/dialog';
// tslint:disable-next-line:max-line-length
import { ToasterService } from 'angular2-toaster';
import { CargandoService, ModalConfirmacionComponent } from 'man-lab-ng';

@Component({
  selector: 'ml-gestion-rol-menu',
  templateUrl: './ruta-gestion-rol-menu.component.html',
  styleUrls: ['./ruta-gestion-rol-menu.component.sass'],
})
export class RutaGestionRolMenuComponent implements OnInit {
  rolEncontrado: RolInterface;
  menusEncontrados: MenuInterface[];
  columnas = [
    { field: 'icono', header: 'Icono' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'nivel', header: 'Nivel' },
    { field: 'id', header: 'Acciones' },
  ];
  columnasRolMenu = [
    { field: 'menu', header: 'Nombre' },
    { field: 'menu', header: 'Nivel' },
    { field: 'rol', header: 'Rol' },
    { field: 'id', header: 'Acciones' },
  ];
  totalRegistros = 0;
  rows = 3;
  rolesMenu: RolMenuInterface[] = [];
  totalRegistrosRolMenu = 0;

  constructor(
    private readonly _rolMenuRestService: RolMenuRestService,
    private readonly _dialog: MatDialog,
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {}

  setearMenusEncontrados(menuEncontrado: MenuInterface[]) {
    this.menusEncontrados = menuEncontrado;
    this.totalRegistros = this.menusEncontrados.length;
  }

  setearRolSeleccionado(rolSeleccionado: RolInterface | boolean) {
    if (rolSeleccionado) {
      this.rolEncontrado = rolSeleccionado as RolInterface;
      this._buscarRolesMenu(this.rolEncontrado);
    } else {
      this.rolEncontrado = undefined;
    }
  }
  agrearARolMenu(menu: MenuInterface) {
    const mensajeModal = `Estas seguro de agregar el menu <strong>${menu.label}</strong>`;
    const dialogRef = this._dialog.open(ModalConfirmacionComponent, {
      height: '270px',
      width: '600px',
      data: { mensaje: mensajeModal },
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((respuesta: boolean) => {
      if (respuesta) {
        const existeMenuEnRol = this._verificarMenuRol(menu);
        if (existeMenuEnRol) {
          this._toasterService.pop(
            'warning',
            'Cuidado',
            'No se puede agregar el registro ya existe.',
          );
        } else {
          this._cargandoService.habilitarCargando();
          const rolMenuCrear: RolMenuInterface = {
            menu: menu.id as number,
            rol: this.rolEncontrado.id as number,
          };
          this._rolMenuRestService.create(rolMenuCrear).subscribe(
            r => {
              this._cargandoService.deshabilitarCargando();
              this.rolesMenu.push({ menu: menu, rol: this.rolEncontrado });
              this.rows = this.rows + 1;
              this.totalRegistrosRolMenu = this.rolesMenu.length;
              this._toasterService.pop(
                'success',
                'Correcto',
                'Se creó correctamente.',
              );
            },
            err => {
              this._cargandoService.deshabilitarCargando();
              console.error(err);
            },
          );
        }
      }
    });
  }

  private _buscarRolesMenu(rolSeleccionado: RolInterface) {
    this._cargandoService.habilitarCargando();
    const consulta = JSON.stringify({
      where: {
        rol: rolSeleccionado.id,
      },
    });
    this._rolMenuRestService.findAll(`criterioBusqueda=${consulta}`).subscribe(
      r => {
        this._cargandoService.deshabilitarCargando();
        this.rolesMenu = r[0];
        this.totalRegistrosRolMenu = r[1];
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
      },
    );
  }

  quitarRolMenu(menu) {
    const mensajeModal = `Estas seguro de quitar el menu <strong>${menu.menu.nombre}</strong> `;
    const dialogRef = this._dialog.open(ModalConfirmacionComponent, {
      height: '270px',
      width: '600px',
      data: { mensaje: mensajeModal },
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((respuesta: boolean) => {
      if (respuesta) {
        const indiceMenuRol = this.rolesMenu.indexOf(menu);
        this._cargandoService.habilitarCargando();
        this._rolMenuRestService.deleteOne(menu.id).subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            this.rolesMenu.splice(indiceMenuRol, 1);
            this.totalRegistrosRolMenu = this.rolesMenu.length;
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
          },
        );
      }
    });
  }

  private _verificarMenuRol(menu: MenuInterface): boolean {
    return this.rolesMenu.some((valor: RolMenuInterface) => {
      const menuObjeto = valor.menu as MenuInterface;
      return menu.id === menuObjeto.id;
    });
  }
}
