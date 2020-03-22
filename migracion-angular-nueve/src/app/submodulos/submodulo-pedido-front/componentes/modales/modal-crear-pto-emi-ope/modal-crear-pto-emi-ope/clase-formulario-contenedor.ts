import { AfterViewInit, OnInit, ViewChild, Directive } from '@angular/core';
import { EstaTipeandoComponent } from 'man-lab-ng';

@Directive()
export class ClaseFormularioContenedor implements AfterViewInit {
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;

  formularioValido = false;

  constructor() {
    /*console.info({
      mensaje: 'Puede ejecutar funciones en el evento "AfterViewInit" mediante  la funcion llamada: "ejecutarEnFuncionAfterViewInit"'
    });*/
  }

  ngAfterViewInit(): void {
    this.componenteEstaTipeando.ocultarTipeando = true;
    this.ejecutarEnFuncionAfterViewInit();
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

  ejecutarEnFuncionAfterViewInit() {}
}
