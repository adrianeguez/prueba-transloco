import { Component, OnInit } from '@angular/core';
import { MenuInterface } from '../../../../../../submodulo-roles-frontend/interfaces/menu-interface';
import { CrearEditarMenuComponent } from '../../modales/crear-editar-menu-lateral/crear-editar-menu.component';
import { MatDialog } from '@angular/material';
import { MenuRestService } from '../../../../../servicios/rest/menu.service';
import {
  MigaDePanInterface,
  RutaConMigasDePan,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { RUTAS_PRINCIPAL } from '../../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { RUTAS_MENU } from '../definicion-rutas/rutas-menu-lateral';
import { TreeNode } from 'primeng/api';
import { NombrePermisoInterface } from '../../../../../../submodulo-roles-frontend/interfaces/nombre-permiso-interface';
import { obtenerNodoRaiz } from '../../functions/obtenerNodoRaiz';
import { verificarNodoMovidoEsHijo } from '../../functions/verificar-nodo-movido-es-hijo';
import { actualizarNodosHijos } from '../../functions/actualizar-hijos-nodo-origen';
import { combinacion } from '../../../../../../../funciones/combinaciones-arbol';
import { generarDiccionarioArbol } from '../../functions/generar-diccionario';
import { compararArboles } from '../../functions/comparar-arboles';
import { FILES } from '../../../../../../submodulo-roles-frontend/constantes/files';

@Component({
  selector: 'ml-gestion-menu',
  templateUrl: './ruta-gestion-menu-lateral.component.html',
  styleUrls: ['./ruta-gestion-menu-lateral.component.sass'],
})

// tslint:disable-next-line:max-line-length
export class RutaGestionMenuLateralComponent extends RutaConMigasDePan
  implements OnInit {
  files: TreeNode[] = FILES;
  nodoSeleccionado: TreeNodeCustom;
  loading = true;
  ramaAActualizar: ArbolEnviar = {};
  habilitarGuardar = false;
  arbolClonado: TreeNode[];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _menuRestService: MenuRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    private readonly _dialog: MatDialog,
    private _toasterService: ToasterService,
  ) {
    super(_emitirMigaPanService);
  }

  ngOnInit() {
    console.log(this.files[0]);
    this.loading = false;
    // this.buscarMenu();
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      // las rutas aqui
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_MENU.rutaGestionMenu(false, true),
    ];
    this.establecerMigas(rutas);
  }

  // buscarMenu() {
  //   this._menuRestService.obtenerMenuCompleto().subscribe(
  //     (r: MenuInterface[]) => {
  //       this.cambiarNombresMenu(r);
  //     },
  //     err => {
  //       console.error(err);
  //     },
  //   );
  // }

  cambiarNombresMenu(r: MenuInterface[]) {
    const menuACambiar = r.slice(0, r.length);
    menuACambiar.forEach((menu: MenuInterface) => {
      if (menu.items.length > 0) {
        this.cambiarNombresMenu(menu.items);
      }
      delete Object.assign(menu, { ['children']: menu['items'] })['items'];
      menu['expandedIcon'] = 'fa fa-arrow-down';
      menu['collapsedIcon'] = 'fa fa-arrow-right';
    });

    this.files = menuACambiar;
    this.arbolClonado = [...this.files];
  }

  // region eventos tree
  onDrop(event) {
    // dragNode: origen
    // dropNode: destino
    const nodoOrigen: TreeNodeCustom = Object.assign({}, event.dragNode);
    const nodoDestino: TreeNodeCustom = Object.assign({}, event.dropNode);
    if (this.verificarNodo(nodoOrigen, nodoDestino)) {
      event.accept();
      actualizarNodosHijos(event.dragNode, event, nodoDestino.nivel);
      const idPadreOrigen = obtenerNodoRaiz(nodoOrigen);
      setTimeout(() => {
        let idPadreDestino = idPadreOrigen;
        if (
          (!event.dropNode.parent && event.dropIndex) ||
          !event.dropNode.parent
        ) {
          idPadreDestino = verificarNodoMovidoEsHijo(nodoOrigen, event.dropNode)
            ? obtenerNodoRaiz(event.dropNode)
            : undefined;
        }
        if (event.dropNode.parent && event.dropIndex === 0) {
          idPadreDestino = obtenerNodoRaiz(event.dragNode);
        }
        this.ramaAActualizar = {
          rama: event.dragNode.id,
          nodoOrigen: nodoOrigen.id,
          idPadreDestino: idPadreDestino,
          idPadreOrigen: idPadreOrigen,
          nivelOrigen: nodoOrigen.nivel,
          nivelDestino: event.dragNode.nivel,
          nodoParentId: nodoOrigen.parent ? nodoOrigen.parent.id : undefined,
        };
        this.habilitarGuardar = true;
      }, 1000);
    } else {
      // tslint:disable-next-line:max-line-length
      this._toasterService.pop(
        'warn',
        'Cuidado',
        `El nivel ${nodoOrigen.nivel} tiene subniveles que superan el limite del nivel destino. Nivel destino ${nodoDestino.nivel}`,
      );
    }
  }

  actualizarArbol() {
    const diccionarios = compararArboles(this.files);
    const tuplas = [];
    diccionarios.forEach(diccionario => {
      const combinaciones = [];
      combinaciones.push(combinacion(diccionario[0]).splice(0));
      tuplas.push(combinaciones);
    });
    const arbolFinalTuplas = [];
    tuplas.forEach((valor: any) => {
      valor[0].forEach(val => {
        arbolFinalTuplas.push(val);
      });
    });
    console.log('arbol final', arbolFinalTuplas);
    // this._menuRestService
    //   .moverMenu(this.ramaAActualizar)
    //   .subscribe(
    //     r => {
    //       this.habilitarGuardar = false;
    //       console.log('ok', r);
    //       this.ramaAActualizar = {};
    //       this._cargandoService.deshabilitarCargando();
    //     },
    //     err => {
    //       console.log(err);
    //       console.log(Object.keys(err));
    //       console.error('Error:');
    //       this.habilitarGuardar = false;
    //       this._cargandoService.deshabilitarCargando();
    //     }
    //   );
  }

  nodeSelect(event) {
    console.log('files selected', this.nodoSeleccionado);
  }

  // endregion
  // region Metodos modales
  abrirModalEditarMenu(registro: MenuInterface) {
    // const indiceRegistro = this.menu.indexOf(registro);
    // const dialogRef = this._dialog.open(CrearEditarMenuComponent, {
    //   width: '800px',
    //   data: { menu: registro },
    // });
    // dialogRef.afterClosed().subscribe((registroEditado: MenuInterface) => {
    //   if (registroEditado) {
    //     this.menu[indiceRegistro] = registroEditado;
    //   }
    // });
  }

  abrirModalCrearMenu() {
    // const dialogRef = this._dialog.open(CrearEditarMenuComponent, {
    //   width: '800px',
    //   data: { menu: undefined },
    // });
    // const resultadoModal$ = dialogRef.afterClosed();
    // resultadoModal$.subscribe((registroCreado: MenuInterface) => {
    //   if (registroCreado) {
    //     this.values.unshift(registroCreado);
    //   }
    // });
  }

  // endregion
  private verificarNodo(
    nodoOrigen: TreeNodeCustom,
    nodoDestino: TreeNodeCustom,
  ) {
    return true;
    const nivelSeleccionado = nodoOrigen.nivel;
    const nivelDestino = nodoDestino.nivel;
    switch (nivelSeleccionado) {
      case 1:
        if (nivelDestino === 2 && nodoOrigen.children.length === 0) {
          return true;
        }
        if (nivelDestino === 1) {
          if (nodoOrigen.children.length > 0) {
            const tieneHijos = nodoOrigen.children.some(
              (nodo: TreeNodeCustom) => nodo.children.length > 0,
            );
            if (tieneHijos) {
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          }
        } else {
          return false;
        }
        break;
      case 2:
        if (nivelDestino === 2 && nodoOrigen.children.length === 0) {
          return true;
        }
        if (nivelSeleccionado === 2 && nivelDestino === 1) {
          return true;
        } else {
          return false;
        }
        break;
      case 3:
        return nivelDestino === 2 || nivelDestino === 1 ? true : false;
        break;
    }
    return false;
  }
}
export interface ArbolEnviar {
  rama?: number;
  nodoOrigen?: number;
  idPadreDestino?: number;
  idPadreOrigen?: number;
  nivelOrigen?: number;
  nivelDestino?: number;
  nodoParentId?: number;
}
export interface TreeNodeCustom {
  children: TreeNodeCustom[];
  collapsedIcon: string;
  createdAt: Date;
  expandedIcon: string;
  icon: string;
  id: number;
  label: string;
  parent: TreeNodeCustom;
  nivel: number;
  permisosMenu: NombrePermisoInterface;
  routerLink: string;
  updatedAt: Date;
  url: string;
}

export interface Arbol {
  idRaizOrigen: number;
  idRaizDestino: number;
  idPadre: number;
  idPadreNuevo: number;
  hijoReferencia: number;
  nivelOrigen: number;
  nivelDestino: number;
}
