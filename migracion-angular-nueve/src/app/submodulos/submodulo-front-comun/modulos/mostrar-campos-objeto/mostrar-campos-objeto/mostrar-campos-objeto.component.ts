import {Component, Input, OnInit} from '@angular/core';
import {ObjetoCampoMostrarInterface} from '../interfaces/objeto-campo-mostrar.interface';

@Component({
  selector: 'app-mostrar-campos-objeto',
  templateUrl: './mostrar-campos-objeto.component.html',
  styleUrls: ['./mostrar-campos-objeto.component.scss']
})
export class MostrarCamposObjetoComponent implements OnInit {

  @Input()
  objeto: any;

  @Input()
  arregloCampos: any[];

  @Input()
  numeroColumnas: string;

  arregloCamposAMostrar: ObjetoCampoMostrarInterface[] = [];

  nivel = 0;

  constructor() {
  }

  ngOnInit() {
    this.iterarObjeto(this.objeto);
    console.log(this.arregloCamposAMostrar);
  }

  iterarObjeto(
    objeto: object,
    nombrePropiedadPapa?: string
  ) {
    console.log(this.nivel);
    console.log(nombrePropiedadPapa);
    const arregloPropiedades = Object.keys(objeto);
    arregloPropiedades
      .map(propiedad => {
          const esPropiedadValida = this.propiedadEsValida(objeto[propiedad]);
          if (esPropiedadValida) {
            const objetoCampoMostrar = this.setearObjetoCampoAMostrar(
              propiedad,
              objeto[propiedad],
              this.nivel,
              nombrePropiedadPapa
            );
            this.arregloCamposAMostrar.push(objetoCampoMostrar);
          }

          const propiedadEsObjeto = objeto[propiedad] !== undefined &&
            objeto[propiedad] !== null &&
            typeof (objeto[propiedad]) === 'object' &&
            !Array.isArray(objeto[propiedad]);
        if (propiedadEsObjeto) {
          this.nivel = this.nivel + 1;
          this.iterarObjeto(
              objeto[propiedad],
              propiedad
            );
          }
        }
      );
  }

  propiedadEsValida(valorPropiedad: any): boolean {
    const esArreglo = Array.isArray(valorPropiedad);
    const esObjeto = typeof (valorPropiedad) === 'object';
    const esNull = typeof (valorPropiedad) === null;
    const esUndefined = typeof (valorPropiedad) === 'undefined';
    return !(esArreglo || esNull || esObjeto || esUndefined);
  }

  setearObjetoCampoAMostrar(
    propiedad: string,
    valor: any,
    nivel: number,
    nombrePropiedadPapa: string
  ): ObjetoCampoMostrarInterface {
    return {
      valor,
      propiedadOriginal: propiedad,
      propiedadNivel: propiedad + nivel,
      propiedad: (nombrePropiedadPapa ? (nombrePropiedadPapa + '_') : '') + propiedad,
      etiqueta: this.setearPropiedadAEtiqueta(propiedad) + (nombrePropiedadPapa ? (' ' + nombrePropiedadPapa) : ''),
    };
  }
  setearPropiedadAEtiqueta(propiedad: string): string {
    const arregloLetrasPropiedad = propiedad.split('');
    let etiqueta = '';
    arregloLetrasPropiedad
      .map( letra => {
        const esLetraMayuscula = letra === letra.toUpperCase();
        if (esLetraMayuscula) {
          etiqueta = etiqueta + ' ' + letra;
        } else {
          etiqueta = etiqueta + letra;
        }
      });
    console.log(etiqueta);
    return etiqueta;
  }
}
