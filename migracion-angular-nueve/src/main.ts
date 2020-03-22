import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

declare var window: any;
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';


// import * as fs from 'fs';
// const initSqlJs = require('sql.js');
declare var initSqlJs;
// window.SQL = initSqlJs;
// window.initSqlJs = initSqlJs;
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
