import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  CargandoService,
  ManLabNgBootstrapModule,
  OpenlayersService,
} from 'man-lab-ng';
import {HttpClientModule} from '@angular/common/http';
import {MomentModule} from 'angular2-moment';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {BlockUIModule} from 'primeng/blockui';
import {SERVICIOS_EMPRESA} from './submodulos/submodulo-empresa-front/constantes/servicios-empresa';
import {MenuInterfazModule} from './componentes/menu-interfaz/menu-interfaz.module';
import {SERVICIOS_ARTICULO} from './submodulos/submodulo-articulos-front/constantes/servicios-articulo';
import {SERVICIOS_CARGAS_MASIVAS} from './submodulos/submodulo-cargas-masivas-front/constantes/cargas-masivas-servicios';
import {CompartidoModule} from './submodulos/submodulo-front-comun/compartido/compartido.module';
import {SERVICIOS_PEDIDOS} from './submodulos/submodulo-pedido-front/constantes/servicios-pedidos';
import {COMPONENTES_FRONT_COMUN} from './submodulos/submodulo-front-comun/constantes/componentes-front-comun';
import {SERVICIOS_FRONT_COMUN} from './submodulos/submodulo-front-comun/constantes/servicios-front-comun';
import {LocalForageModule} from 'ngx-localforage';
import {ItemMenuModule} from './submodulos/submodulo-front-comun/modulos/item-menu/item-menu.module';
import {TituloPantallaModule} from './submodulos/submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {MenuLateralComponentModule} from './submodulos/submodulo-menu-lateral-front/componentes/menu-lateral/menu-lateral-component.module';
import {CabeceraModule} from './submodulos/submodulo-front-comun/modulos/cabecera/cabecera.module';
import {environment} from '../environments/environment';
import {translocoLoader} from './submodulos/submodulo-internacionalizacion/transloco.loader';
import {TranslocoModule, TRANSLOCO_CONFIG, TranslocoConfig} from '@ngneat/transloco';
import {SERVICIOS_CERTIFICADOS_CURSOS} from './submodulos/submodulo-certificados-cursos-frontend/constantes/servicios-certificados-curso';
import {PermisoDirectiveModule} from './submodulos/submodulo-front-comun/directivas/permiso/permiso.module';
import {GeolocationServices} from './compartido/mapa-modulo/servicios/open-layers/geolocation.service';

@NgModule({
  declarations: [
    AppComponent,
    COMPONENTES_FRONT_COMUN
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ManLabNgBootstrapModule,
        BrowserAnimationsModule,
        ToasterModule.forRoot(),
        HttpClientModule,
        MomentModule,
        BlockUIModule,
        MenuInterfazModule,
        CompartidoModule,
        LocalForageModule.forRoot(),
        ItemMenuModule,
        TituloPantallaModule,
        MenuLateralComponentModule,
        CabeceraModule,
        TranslocoModule,
        PermisoDirectiveModule
    ],
  providers: [
    CargandoService,
    OpenlayersService,
    ToasterService,
    ...SERVICIOS_EMPRESA,
    ...SERVICIOS_ARTICULO,
    ...SERVICIOS_CARGAS_MASIVAS,
    ...SERVICIOS_PEDIDOS,
    ...SERVICIOS_FRONT_COMUN,
    ...SERVICIOS_CERTIFICADOS_CURSOS,
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: [
          {
            id: 'en',
            label: 'English'
          },
          {
            id: 'es',
            label: 'Español'
          }
        ],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        fallbackLang: ['en', 'es'],
        failedRetries: 3,
        missingHandler: {
          allowEmpty: false, // permitir vacios
          useFallbackTranslation: true, // usar los fallback langs si hay vacios
          logMissingKey: false, // Consologear si no hay una traduccion
        },
        prodMode: environment.production,
      } as TranslocoConfig
    },
    translocoLoader
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private readonly _geolocationService: GeolocationServices) {
    this._geolocationService.cargarCoordenadas().then().catch();
  }
}
