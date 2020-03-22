import {Directive, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {Auth0Service} from '../../servicios/auth0/auth0.service';
import {ActivatedRoute} from '@angular/router';

@Directive({
  selector: '[mlabPermiso]'
})
export class PermisoDirective {

  @Input() permiso: PermisoDirectivaInterface;
  @Input() estado: { valor: boolean, otroAtributo?: boolean };

  constructor(
    private elementoHtml: ElementRef,
    private nuevoElementoHtml: ElementRef,
    private renderer: Renderer2,
    private readonly _authService: Auth0Service,
    private readonly _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (!this.buscarRol(this.permiso.nombrePermiso, this.permiso.nombreModulo)) {
      if (this.estado) {
        let texto;
        let text;
        console.log('estadooo');
        const botonAEliminar = this.elementoHtml.nativeElement.children[0];
        this.renderer
          .removeChild(
            this.elementoHtml
              .nativeElement,
            botonAEliminar);

        const div = this.renderer.createElement('div');
        const color = this.estado.valor ? '#08a300' : '#a30315';
        this.renderer.setStyle(this.elementoHtml.nativeElement, 'color', color);
        this.renderer.appendChild(this.nuevoElementoHtml.nativeElement, div);

        if (this.estado.otroAtributo) {
          texto = this.estado.valor ? 'SI' : 'NO';
          text = this.renderer.createText(texto);
          this.renderer.appendChild(div, text);
        } else {
          texto = this.estado.valor ? 'Activo' : 'Inactivo';
          text = this.renderer.createText(texto);
          this.renderer.appendChild(div, text);
        }
      } else {
        console.log(' sin   estadooo');
        this.renderer
          .removeChild(
            this.elementoHtml
              .nativeElement,
            this.elementoHtml
              .nativeElement);
      }
    }
  }

  private buscarRol(permiso: string, modulo: string) {
    if (!this.permiso.idEmpresa) {
      return this._authService.empresaSeleccionada.permisosUsuario.some(nombre =>
        nombre.nombrePermiso === permiso &&
        nombre.nombreModulo === modulo);
    } else {
      return this._authService.empresaSeleccionada.permisosUsuario.some(nombre =>
        nombre.nombrePermiso === permiso &&
        nombre.nombreModulo === modulo &&
        nombre.empresaId === this.permiso.idEmpresa
      );
    }
  }
}

export interface PermisoDirectivaInterface {
  nombrePermiso?: string;
  nombreModulo?: string;
  idEmpresa?: number;
}
