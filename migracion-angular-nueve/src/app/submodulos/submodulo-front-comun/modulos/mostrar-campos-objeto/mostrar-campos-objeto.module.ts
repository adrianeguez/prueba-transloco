import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarCamposObjetoComponent } from './mostrar-campos-objeto/mostrar-campos-objeto.component';

@NgModule({
    declarations: [MostrarCamposObjetoComponent],
    exports: [
        MostrarCamposObjetoComponent
    ],
    imports: [
        CommonModule
    ]
})
export class MostrarCamposObjetoModule { }
