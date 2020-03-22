import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RutaGestionMenuLateralComponent } from '../../rutas/ruta-gestion-menu-lateral/ruta-gestion-menu-lateral.component';
import { ToasterService } from 'angular2-toaster';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import { MenuInterface } from '../../../../../../submodulo-roles-frontend/interfaces/menu-interface';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import { MenuRestService } from '../../../../../servicios/rest/menu.service';
import {
  CONFIGURACION_MENU,
  ConfiguracionFormluarioMenu,
} from '../../componentes/menu-formulario/menu-formulario/menu-lateral-formulario.component';

@Component({
  selector: 'ml-crear-editar-menu',
  templateUrl: './crear-editar-menu.component.html',
  styleUrls: ['./crear-editar-menu.component.sass'],
})
export class CrearEditarMenuComponent implements OnInit, AfterViewInit {
  configuracionMenu: ConfiguracionFormluarioMenu;
  descripcion = '';
  formularioValido = false;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  menuCrearEditar: MenuInterface;

  constructor(
    public dialogo: MatDialogRef<RutaGestionMenuLateralComponent>,
    private readonly _menuRestService: MenuRestService,
    @Inject(MAT_DIALOG_DATA) public data: { menu: MenuInterface },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.menu ? 'Llene' : 'Modifique'
    } los campos necesarios para el menu.`;
    this.encerarConfiguracionDisabled();
  }
  ngAfterViewInit(): void {
    this.componenteEstaTipeando.ocultarTipeando = true;
  }
  OcultarEstaTipeando() {
    this.componenteEstaTipeando.eliminarAnimacion();
  }

  mostrarEstaTipeando() {
    this.componenteEstaTipeando.ocultarTipeando = false;
    this.componenteEstaTipeando.seVaAnimacion = false;
  }
  establecerFormularioInvalido() {
    this.formularioValido = false;
    this.mostrarEstaTipeando();
  }
  validarFormulario(menu) {
    if (menu) {
      this.menuCrearEditar = menu;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.menuCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  private encerarConfiguracionDisabled() {
    this.configuracionMenu = CONFIGURACION_MENU();
    if (this.data.menu) {
      const menuAEditar = this.data.menu;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionMenu,
        menuAEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(this.configuracionMenu, {});
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.menu) {
      this._menuRestService
        .updateOne(this.data.menu.id, this.menuCrearEditar)
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(
              'success',
              'Correcto',
              'Se actualizó correctamente',
            );
            this.dialogo.close(r);
          },
          err => {
            console.error(err);
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(
              'error',
              'Error',
              'Ocurrió un problema con el servidor',
            );
          },
        );
    } else {
      this._menuRestService.create(this.menuCrearEditar).subscribe(
        r => {
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(
            'success',
            'Correcto',
            'Se creó correctamente',
          );
          this.dialogo.close(r);
        },
        err => {
          console.error(err);
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(
            'error',
            'Error',
            'Ocurrió un problema con el servidor',
          );
        },
      );
    }
  }
}
