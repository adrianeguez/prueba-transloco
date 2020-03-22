import {OpcionMenuGestionInterface} from '../interfaces/opcion-menu-gestion.interface';

export const MENU_GESTION_BOTONES: OpcionMenuGestionInterface[] = [
  {
    opcion: 'Gestiones de Empresas',
    imagen: 'assets/imagenes/sistema/empresa-gestion.svg',
    botones: [
      {
        nombre: 'GESTIÓN DE EDIFICIOS',
        moduloHijo: 'edificio',
        gestionHijo: 'edificios',
        imagen: 'assets/imagenes/sistema/empresa-edificio.svg',
        cols: 1,
        rows: 1,
      },
      {
        nombre: 'GESTIÓN DE TRABAJADORES',
        moduloHijo: 'contacto-empresa',
        gestionHijo: 'contactos-empresa',
        imagen: 'assets/imagenes/sistema/empresa-contacto.svg',
        cols: 1,
        rows: 1,
      },
      {
        nombre: 'GESTIÓN DE DEPARTAMENTOS',
        moduloHijo: 'departamento-empresa',
        gestionHijo: 'departamentos-empresa',
        imagen: 'assets/imagenes/sistema/empresa-departamentos.svg',
        cols: 1,
        rows: 1,
      },
      {
        nombre: 'GESTIÓN DE CLIENTES',
        moduloHijo: 'empresa-clientes',
        gestionHijo: 'empresas-clientes',
        imagen: 'assets/imagenes/sistema/empresa-cliente.svg',
        cols: 1,
        rows: 1,
      },
      {
        nombre: 'GESTIÓN DE PROVEEDORES',
        moduloHijo: 'empresa-proveedores',
        gestionHijo: 'empresas-proveedor',
        imagen: 'assets/imagenes/sistema/empresa-proveedor.svg',
        cols: 1,
        rows: 1,
      },
      {
        nombre: 'PUESTO, CARGO, OCUPACIÓN TRABAJADOR',
        moduloHijo: 'tipo-cargo',
        gestionHijo: 'tipos-cargo',
        imagen: 'assets/imagenes/sistema/empresa-cargo.svg',
        cols: 1,
        rows: 1,
      },
      {
        nombre: 'GESTIÓN DE ARTÍCULOS',
        moduloHijo: 'articulo-empresa',
        gestionHijo: 'articulos-empresa',
        imagen: 'assets/imagenes/sistema/articulos-icono.svg',
        cols: 1,
        rows: 1,
      },
      {
        nombre: 'GESTIÓN DE TIPOS DE MOVIMIENTO',
        moduloHijo: 'tipo-movimiento',
        gestionHijo: 'tipos-movimiento',
        imagen: 'assets/imagenes/sistema/empresa-tipos-movimiento.svg',
        cols: 1,
        rows: 1,
      },
      {
        nombre: 'GESTIÓN DE CRONOGRAMAS',
        moduloHijo: 'cronogramas',
        gestionHijo: 'cronogramas',
        imagen: 'assets/imagenes/sistema/empresa-cronograma.svg',
        cols: 1,
        rows: 1,
      },
      {
        nombre: 'GESTIÓN DE CURSOS',
        moduloHijo: 'curso',
        gestionHijo: 'cursos',
        imagen: 'assets/imagenes/sistema/cursos.icono.svg',
        cols: 1,
        rows: 1,
      },
    ],
  },
  {
    opcion: 'Gestiones de Vendedores',
    imagen: 'assets/imagenes/sistema/vendedor.svg',
    botones: [
      {
        nombre: 'GESTIÓN DE VENDEDORES',
        moduloHijo: 'vendedor',
        gestionHijo: 'vendedor',
        imagen: 'assets/imagenes/sistema/vendedor-vendedores.svg',
        cols: 1,
        rows: 1,
      },
      {
        nombre: 'GESTIÓN DE TIPOS DE VENDEDOR',
        moduloHijo: 'tipo-vendedor',
        gestionHijo: 'tipo-vendedor',
        imagen: 'assets/imagenes/sistema/vendedor-tipos.svg',
        cols: 1,
        rows: 1,
      },
      {
        nombre: 'GESTIÓN DE PERIODO VENTA',
        moduloHijo: 'periodo-venta',
        gestionHijo: 'periodo-venta',
        imagen: 'assets/imagenes/sistema/vendedor-periodo.svg',
        cols: 1,
        rows: 1,
      },
      {
        nombre: 'GESTIÓN DE ESCALA VENDEDOR',
        moduloHijo: 'escala-vendedor',
        gestionHijo: 'escala-vendedor',
        imagen: 'assets/imagenes/sistema/vendedor-escala.svg',
        cols: 1,
        rows: 1,
      },
      {
        nombre: 'GESTIÓN DE TIPO LOGRO VISITA',
        moduloHijo: 'tipo-logro-visita',
        gestionHijo: 'tipo-logro-visita',
        imagen: 'assets/imagenes/sistema/vendedor-logro.svg',
        cols: 1,
        rows: 1,
      },
    ],
  },
  {
    opcion: 'Logística de Vendedores',
    imagen: 'assets/imagenes/sistema/vendedor-logistica.svg',
    botones: [
      // {
      //   nombre: 'MONITOREO VENDEDORES',
      //   moduloHijo: 'monitoreo-vendedores',
      //   gestionHijo: 'monitoreo-vendedores',
      //   cols: 1,
      //   rows: 1,
      // },
      {
        nombre: 'ASIGNACIÓN VENDEDORES',
        moduloHijo: 'asignar-vendedores',
        gestionHijo: 'asignar-vendedores',
        imagen: 'assets/imagenes/sistema/vendedor-seleccion.svg',
        cols: 1,
        rows: 1,
      },
      {
        nombre: 'GESTIÓN DE ZONAS',
        moduloHijo: 'ruta',
        gestionHijo: 'ruta',
        imagen: 'assets/imagenes/sistema/vendedor-zona.svg',
        cols: 1,
        rows: 1,
      },
    ],
  },
  {
    opcion: 'Pedidos',
    imagen: 'assets/imagenes/sistema/pedidos.svg',
    botones: [
      {
        nombre: 'CREAR PEDIDOS',
        moduloHijo: 'pedidos',
        gestionHijo: 'crear-pedido',
        imagen: 'assets/imagenes/sistema/pedido-crear.svg',
        cols: 1,
        rows: 1
      },
      {
        nombre: 'LISTAR PEDIDOS',
        moduloHijo: 'pedidos',
        gestionHijo: 'listar-pedidos',
        imagen: 'assets/imagenes/sistema/pedido-listar.svg',
        cols: 1,
        rows: 1
      }
    ]
  }
];
