import { PrincipalEntity } from '@manticore-labs/ng-api';
import { Column, Entity, ManyToOne } from 'typeorm';
import { EmpresaProveedores } from '../empresa-proveedores/empresa-proveedores';
import { ArticuloEntity } from '../articulo/articulo.entity';

@Entity('articulo_proveedor')
export class ArticuloProveedor extends PrincipalEntity {
  @ManyToOne(
    type => EmpresaProveedores,
    empresaProveedor => empresaProveedor.articulosProveedor,
    {
      nullable: true,
    },
  )
  empresaProveedor?: EmpresaProveedores | number | any;
}
