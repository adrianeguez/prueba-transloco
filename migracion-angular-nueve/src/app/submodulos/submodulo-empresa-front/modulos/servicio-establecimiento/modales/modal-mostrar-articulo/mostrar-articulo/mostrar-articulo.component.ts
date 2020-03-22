import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CargandoService, EstaTipeandoComponent} from 'man-lab-ng';
import {
  CONFIGURACION_ARTICULO,
  ConfiguracionFormluarioArticulo
} from '../../../../../../submodulo-articulos-front/modulos/articulo/componentes/articulo-formulario/articulo-formulario.component';
import {ArticuloInterface} from '../../../../../../submodulo-articulos-front/interfaces/articulo.interface';
import {RutaGestionArticulosComponent} from '../../../../../../submodulo-articulos-front/modulos/articulo/rutas/ruta-gestion-articulos/ruta-gestion-articulos.component';
import {ToasterService} from 'angular2-toaster';
import {ArticulosRestService} from '../../../../../../submodulo-articulos-front/servicios/rest/articulos-rest.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RutaGestionServicioComponent} from '../../../rutas/ruta-gestion-servicio/ruta-gestion-servicio.component';
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';

@Component({
  selector: 'app-mostrar-articulo',
  templateUrl: './mostrar-articulo.component.html',
  styleUrls: ['./mostrar-articulo.component.scss']
})
export class MostrarArticuloComponent extends FormularioModal<ArticuloInterface, ConfiguracionFormluarioArticulo, ArticulosRestService>
  implements OnInit, AfterViewInit {
  descripcion: string;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionArticulo: ConfiguracionFormluarioArticulo;
  private rutaTraduccion;

  constructor(
    public dialogo: MatDialogRef<RutaGestionServicioComponent>,
    // tslint:disable-next-line:max-line-length
    @Inject(MAT_DIALOG_DATA)
    public data: { articulo: ArticuloInterface; idSubgrupo: any },
    private readonly _toasterService: ToasterService,
    private readonly _articulosRestService: ArticulosRestService,
    private readonly _cargandoService: CargandoService,
  ) {
    super(
      _articulosRestService,
      _cargandoService,
      _toasterService,
      data.articulo
    );
  }


  ngOnInit() {
    this.rutaTraduccion = 'submoduloArticulos.articulo.componentes.mostrarArticulo';
    this.encerarConfiguracionDisabled();
  }

  ngAfterViewInit(): void {
    this.componenteEstaTipeando.ocultarTipeando = true;
  }

  encerarConfiguracionDisabled() {
    this.configuracionArticulo = CONFIGURACION_ARTICULO();
    this.configuracionArticulo.HabilitadoStock.hidden = true;
    this.configuracionArticulo.HabilitadoStock.hidden = true;
    this.configuracionArticulo.UnidadMedida.valor = 'valor';
    this.configuracionArticulo.TipoImpuesto.valor = 'valor';
    this.configuracionArticulo.Tarifa.valor = 'valor';
    this.configuracionArticulo.UnidadMedida.hidden = true;
    this.configuracionArticulo.TipoImpuesto.hidden = true;
    this.configuracionArticulo.Tarifa.hidden = true;
    this.configuracionArticulo.EsServicio.hidden = true;

    this.configuracionArticulo.Nombre.disabled = true;
    this.configuracionArticulo.Codigo.disabled = true;
    this.configuracionArticulo.CodigoAuxiliar.disabled = true;
    this.configuracionArticulo.CodigoBarras.disabled = true;
    this.configuracionArticulo.Descripcion.disabled = true;
    this.configuracionArticulo.EmpresaProductora.disabled = true;
    this.configuracionArticulo.NombreCorto.disabled = true;
    this.configuracionArticulo.EsCurso.disabled = true;
    this.configuracionArticulo.Peso.disabled = true;
    const articuloEditar = this.data.articulo;
    establecerValoresConfiguracionAbstractControl(
      this.configuracionArticulo,
      articuloEditar,
    );
  }

  OcultarEstaTipeando() {
    this.componenteEstaTipeando.eliminarAnimacion();
  }

  mostrarEstaTipeando() {
    this.componenteEstaTipeando.ocultarTipeando = false;
    this.componenteEstaTipeando.seVaAnimacion = false;
  }

}
