import { PrincipalEntity } from '@manticore-labs/ng-api';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ArticuloProveedor } from '../articulo-proveedor/articulo-proveedor';
import {EmpresaEntity} from '../empresa/empresa.entity';

@Entity('empresa_proveedores')
export class EmpresaProveedores extends PrincipalEntity {
  @Column({
    nullable: true,
  })
  habilitado?: boolean;

  @Column({
    nullable: true,
  })
  calificacionTotal?: string;

  articulosProveedor: ArticuloProveedor[];
}
