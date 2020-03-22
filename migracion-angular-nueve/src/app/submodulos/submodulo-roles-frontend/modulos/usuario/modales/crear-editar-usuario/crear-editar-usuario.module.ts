import {ModuleWithProviders, NgModule} from '@angular/core';
import {CrearEditarUsuarioComponent} from './crear-editar-usuario.component';
import { MatDialogModule } from '@angular/material/dialog';
import {ManLabNgBootstrapModule, ModalModule} from 'man-lab-ng';
import {TextMaskModule} from 'angular2-text-mask';
import {DatosUsuarioFormularioComponent} from '../../componentes/datos-usuario-formulario/datos-usuario-formulario.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DatosUsuarioRestService} from '../../../../servicios/rest/datos-usuario-rest.service';
import {Auth0Service} from '../../../../servicios/rest/auth0.service';

@NgModule({
  declarations: [
    CrearEditarUsuarioComponent,
    DatosUsuarioFormularioComponent
  ],
  entryComponents: [CrearEditarUsuarioComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ModalModule,
    ManLabNgBootstrapModule,
    TextMaskModule,
    ReactiveFormsModule,
  ],
  exports: [CrearEditarUsuarioComponent]
})
export class CrearEditarUsuarioModule {
  static forRoot(): ModuleWithProviders<CrearEditarUsuarioModule> {
    return {
      ngModule: CrearEditarUsuarioModule,
      providers: [ DatosUsuarioRestService, Auth0Service ]
    };
  }
}
