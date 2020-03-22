import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RutaHomeComponent } from './rutas/ruta-home/ruta-home.component';
import {environment} from '../environments/environment';
import {TRANSLOCO_CONFIG, TranslocoConfig, TranslocoModule} from '@ngneat/transloco';
import {translocoLoader} from './servicios/transloco/loader';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RutaHomeComponent
  ],
  imports: [
    BrowserModule,
    TranslocoModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
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
  bootstrap: [AppComponent]
})
export class AppModule { }
