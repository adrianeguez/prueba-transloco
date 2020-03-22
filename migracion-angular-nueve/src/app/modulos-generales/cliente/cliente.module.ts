import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { RutaInicioClienteComponent } from './rutas/ruta-inicio-cliente/ruta-inicio-cliente.component';
import {ManLabNgBootstrapModule} from 'man-lab-ng';
import {TituloPantallaModule} from '../../submodulos/submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {ItemMenuModule} from '../../submodulos/submodulo-front-comun/modulos/item-menu/item-menu.module';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [RutaInicioClienteComponent],
    imports: [
        CommonModule,
        ClienteRoutingModule,
        ManLabNgBootstrapModule,
        TituloPantallaModule,
        ItemMenuModule,
        TranslocoModule
    ]
})
export class ClienteModule { }
