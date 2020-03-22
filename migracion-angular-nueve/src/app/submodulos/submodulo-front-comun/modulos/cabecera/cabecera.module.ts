import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CabeceraComponent} from './cabecera/cabecera.component';
import {RouterModule} from '@angular/router';
import {CrearEditarUsuarioModule} from '../../../submodulo-roles-frontend/modulos/usuario/modales/crear-editar-usuario/crear-editar-usuario.module';
import {TranslocoModule} from '@ngneat/transloco';
import {IdiomaModule} from '../idioma/idioma.module';

@NgModule({
  declarations: [CabeceraComponent],
  imports: [
    CommonModule,
    RouterModule,
    CrearEditarUsuarioModule.forRoot(),
    TranslocoModule,
    IdiomaModule,
  ],
  exports: [CabeceraComponent],
})
export class CabeceraModule {
}
