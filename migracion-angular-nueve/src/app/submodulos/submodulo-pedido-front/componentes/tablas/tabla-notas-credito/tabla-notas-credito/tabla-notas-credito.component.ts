import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ml-tabla-notas-credito',
  templateUrl: './tabla-notas-credito.component.html',
  styleUrls: ['./tabla-notas-credito.component.sass'],
})
export class TablaNotasCreditoComponent implements OnInit {
  valores: any[];

  columnas = [
    { field: 'proveedor', header: 'Proveedor' },
    { field: 'tipo', header: 'Tipo' },
    { field: 'serie', header: 'Serie' },
    { field: 'factura', header: 'Factura' },
    { field: 'valor', header: 'Valor' },
    { field: 'fechaRegistro', header: 'Fecha reg.' },
    { field: 'fechaVencimiento', header: 'Fecha ven.' },
    { field: 'serie', header: 'Serie' },
    { field: 'fechaCaducidad', header: 'Fecha cad.' },
    { field: 'autorizacion', header: 'Autorización' },
  ];

  constructor() {}

  ngOnInit() {}
}
