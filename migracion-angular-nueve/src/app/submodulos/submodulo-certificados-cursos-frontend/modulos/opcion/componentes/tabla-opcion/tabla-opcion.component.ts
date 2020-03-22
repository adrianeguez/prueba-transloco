import {Component, Input, OnInit} from '@angular/core';
import {ESTADOS} from '../../../../../../enums/estados';
import {OpcionInterface} from '../../interfaces/opcion.interface';
import {OpcionRestService} from '../../servicios/rest/opcion-rest.service';
import {traducirColumnas} from '../../../../../../funciones/traducir-columnas';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'ml-tabla-opcion',
  templateUrl: './tabla-opcion.component.html',
  styleUrls: ['./tabla-opcion.component.scss']
})
export class TablaOpcionComponent implements OnInit {

  rows = 5;

  estados = ESTADOS;

  skip = 0;
  arregloOpciones: OpcionInterface[] = [];
  loading = false;
  columnas = [
    {field: 'id', header: '#', llaveATraducir: '#', traduccion: ''},
    {field: 'descripcion', header: 'Descripción', llaveATraducir: 'descripcion', traduccion: ''},
    {field: 'esRespuesta', header: 'Es la respuesta', llaveATraducir: 'esRespuesta', traduccion: ''},
  ];
  registrosTotales: number;
  @Input() idPregunta: number;

  constructor(
    private readonly _opcionRestService: OpcionRestService,
    protected readonly _translocoService: TranslocoService,
  ) { }

  ngOnInit() {
    traducirColumnas(this._translocoService, 'submoduloCertificadosCuros.opcionModulo.componentes.mostrarOpciones.tablas', this.columnas);
    this.listarOpciones();
  }

  listarOpciones() {
    const consulta = {
      skip: this.skip,
      take: 5,
      where: {
        habilitado: 1,
        pregunta: {id: this.idPregunta},
      },
    };
    this._opcionRestService.findAll(JSON.stringify(consulta))
      .subscribe(
        (respuesta: [OpcionInterface[], number]) => {
          this.arregloOpciones = respuesta[0];
          this.registrosTotales = respuesta[1];
        }, error => {
          console.error({
            mensaje: 'Error trayendo datos',
            error,
            data: consulta
          });
        }
      );
  }
  cargarDatosLazy(evento) {
    this.loading = true;
    this.skip = evento.first;
    const consulta = {
      where: {
        habilitado: 1,
        pregunta: {id: this.idPregunta}
      },
      skip: this.skip,
      take: 5,
    };
    this._opcionRestService.findAll('criterioBusqueda=' + JSON.stringify(consulta))
      .subscribe(
        (respuesta: [OpcionInterface[], number]) => {
          this.arregloOpciones = respuesta[0];
          this.loading = false;
        }
      );
  }

}
